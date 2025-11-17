import { useEffect, useState } from 'react';

export interface PWAStatus {
  isInstallable: boolean;
  isStandalone: boolean;
  isOnline: boolean;
  isTouchDevice: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isNetbook: boolean;
  hasServiceWorker: boolean;
  deferredPrompt: any;
}

export function usePWA(): PWAStatus {
  const [status, setStatus] = useState<PWAStatus>({
    isInstallable: false,
    isStandalone: false,
    isOnline: true,
    isTouchDevice: false,
    isIOS: false,
    isAndroid: false,
    isNetbook: false,
    hasServiceWorker: false,
    deferredPrompt: null,
  });

  useEffect(() => {
    // Detectar si es standalone (PWA instalada)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        (window.navigator as any).standalone === true;

    // Detectar dispositivo de toque
    const isTouchDevice = () => {
      return (
        (typeof window !== 'undefined' &&
          typeof navigator !== 'undefined' &&
          ((navigator.maxTouchPoints > 0) ||
            ((navigator as any).msMaxTouchPoints > 0) ||
            (window.ontouchstart !== undefined))) ||
        false
      );
    };

    // Detectar SO
    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);

    // Detectar netbook/dispositivos con pantalla pequeña
    const isNetbook = window.innerWidth <= 1024 && window.innerHeight <= 768;

    // Detectar Service Worker
    const hasServiceWorker = 'serviceWorker' in navigator;

    // Escuchar cambios de conexión
    const handleOnline = () => {
      setStatus(prev => ({ ...prev, isOnline: true }));
    };

    const handleOffline = () => {
      setStatus(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Escuchar evento de instalación
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setStatus(prev => ({
        ...prev,
        isInstallable: true,
        deferredPrompt: e,
      }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    // Actualizar estado
    setStatus(prev => ({
      ...prev,
      isStandalone,
      isTouchDevice: isTouchDevice(),
      isIOS,
      isAndroid,
      isNetbook,
      hasServiceWorker,
      isOnline: navigator.onLine,
    }));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  return status;
}

// Hook para detectar tamaño de pantalla y breakpoints
export function useResponsiveBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) setBreakpoint('xs');
      else if (width < 640) setBreakpoint('sm');
      else if (width < 768) setBreakpoint('md');
      else if (width < 1024) setBreakpoint('lg');
      else if (width < 1280) setBreakpoint('xl');
      else setBreakpoint('2xl');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

// Hook para safe area insets (notches en iPhone 16)
export function useSafeAreaInsets() {
  const [insets, setInsets] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    const updateInsets = () => {
      const top = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top') || '0');
      const right = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-right') || '0');
      const bottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom') || '0');
      const left = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-left') || '0');

      setInsets({ top, right, bottom, left });
    };

    updateInsets();
    window.addEventListener('resize', updateInsets);
    return () => window.removeEventListener('resize', updateInsets);
  }, []);

  return insets;
}

// Hook para vibración haptica en dispositivos que lo soportan
export function useHapticFeedback() {
  const performHaptic = (pattern: 'light' | 'medium' | 'heavy' = 'medium') => {
    if ('vibrate' in navigator) {
      const patterns: Record<string, number | number[]> = {
        light: 10,
        medium: 20,
        heavy: 50,
      };
      navigator.vibrate(patterns[pattern]);
    }
  };

  return { performHaptic };
}
