import { useEffect, useState } from 'react';

export interface OfflineStatus {
  isOnline: boolean;
  wasOffline: boolean;
  canSync: boolean;
}

/**
 * Hook para detectar estado online/offline
 */
export function useOfflineDetection(): OfflineStatus {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);
  const [canSync, setCanSync] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setWasOffline(true);
      setCanSync(true);

      // Disparar evento de sincronización
      window.dispatchEvent(new Event('app-came-online'));
    };

    const handleOffline = () => {
      setIsOnline(false);
      setCanSync(false);

      // Disparar evento offline
      window.dispatchEvent(new Event('app-went-offline'));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, wasOffline, canSync };
}

/**
 * Gestión de sincronización en background
 */
export class BackgroundSyncManager {
  private queue: Array<{
    id: string;
    request: Request;
    callback?: () => void;
    retries: number;
  }> = [];

  private maxRetries = 3;
  private retryDelay = 1000; // 1 segundo

  async enqueue(id: string, request: Request, callback?: () => void) {
    this.queue.push({
      id,
      request,
      callback,
      retries: 0,
    });

    // Intentar sincronizar inmediatamente si estamos online
    if (navigator.onLine) {
      await this.sync();
    }

    // Escuchar evento de conexión
    const handleOnline = () => this.sync();
    window.addEventListener('app-came-online', handleOnline);

    return () => {
      window.removeEventListener('app-came-online', handleOnline);
    };
  }

  async sync() {
    for (const item of this.queue) {
      try {
        const response = await fetch(item.request.clone());

        if (response.ok) {
          item.callback?.();
          this.queue = this.queue.filter(i => i.id !== item.id);
        } else if (item.retries < this.maxRetries) {
          item.retries++;
          await new Promise(resolve =>
            setTimeout(resolve, this.retryDelay * Math.pow(2, item.retries))
          );
          // Reintentar
          await this.sync();
        }
      } catch (error) {
        if (item.retries < this.maxRetries) {
          item.retries++;
          // Esperar y reintentar
        }
      }
    }
  }

  getQueueSize() {
    return this.queue.length;
  }

  clearQueue() {
    this.queue = [];
  }
}

export const syncManager = new BackgroundSyncManager();

/**
 * Hook para manejar sincronización automática
 */
export function useBackgroundSync() {
  useEffect(() => {
    const handleOnline = async () => {
      await syncManager.sync();
    };

    window.addEventListener('app-came-online', handleOnline);

    return () => {
      window.removeEventListener('app-came-online', handleOnline);
    };
  }, []);

  return syncManager;
}
