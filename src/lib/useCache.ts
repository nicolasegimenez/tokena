import { useEffect, useState } from 'react';

/**
 * Hook para gestionar cache de datos con expiración
 */
export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    ttl?: number; // Time to live en milliseconds
    storage?: 'memory' | 'localStorage' | 'sessionStorage';
    onError?: (error: Error) => void;
  } = {}
) {
  const { ttl = 5 * 60 * 1000, storage = 'localStorage', onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const storageKey = `cache_${key}`;
  const expiryKey = `cache_expiry_${key}`;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Intentar obtener del cache
        if (storage !== 'memory') {
          const storageAPI = storage === 'localStorage' ? localStorage : sessionStorage;
          const cachedData = storageAPI.getItem(storageKey);
          const expiry = storageAPI.getItem(expiryKey);

          if (cachedData && expiry) {
            const expiryTime = parseInt(expiry, 10);
            if (Date.now() < expiryTime) {
              setData(JSON.parse(cachedData));
              setLoading(false);
              return;
            } else {
              // Cache expirado, limpiar
              storageAPI.removeItem(storageKey);
              storageAPI.removeItem(expiryKey);
            }
          }
        }

        // Fetch nuevos datos
        const freshData = await fetcher();
        setData(freshData);

        // Guardar en cache
        if (storage !== 'memory') {
          const storageAPI = storage === 'localStorage' ? localStorage : sessionStorage;
          storageAPI.setItem(storageKey, JSON.stringify(freshData));
          storageAPI.setItem(expiryKey, (Date.now() + ttl).toString());
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        onError?.(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [key, fetcher, ttl, storage, storageKey, expiryKey, onError]);

  return { data, loading, error };
}

/**
 * Gestión de IndexedDB para datos más grandes
 */
export class CacheDB {
  private dbName = 'InvestokenCache';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache', { keyPath: 'key' });
        }
      };
    });
  }

  async set(key: string, value: any, ttl?: number) {
    if (!this.db) await this.init();

    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(['cache'], 'readwrite');
      const store = transaction.objectStore('cache');
      const data = {
        key,
        value,
        expiry: ttl ? Date.now() + ttl : null,
      };

      const request = store.put(data);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async get(key: string) {
    if (!this.db) await this.init();

    return new Promise<any>((resolve, reject) => {
      const transaction = this.db!.transaction(['cache'], 'readonly');
      const store = transaction.objectStore('cache');
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          if (result.expiry && Date.now() > result.expiry) {
            // Cache expirado
            this.delete(key);
            resolve(null);
          } else {
            resolve(result.value);
          }
        } else {
          resolve(null);
        }
      };
    });
  }

  async delete(key: string) {
    if (!this.db) await this.init();

    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(['cache'], 'readwrite');
      const store = transaction.objectStore('cache');
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clear() {
    if (!this.db) await this.init();

    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(['cache'], 'readwrite');
      const store = transaction.objectStore('cache');
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

export const cacheDB = new CacheDB();
