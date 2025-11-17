import { useEffect, useState } from 'react'
import { usePWA, useResponsiveBreakpoint, useSafeAreaInsets } from '@/lib/usePWA'
import { useOfflineDetection } from '@/lib/useOffline'
import { cn } from '@/lib/utils'
import { AlertCircle, Wifi, WifiOff, Smartphone, Monitor, Wand2 } from 'lucide-react'

/**
 * Componente de demostración de optimizaciones PWA
 * Muestra estado de instalación, conexión, responsive, etc.
 */
export function PWAOptimizationDemo() {
  const pwaStatus = usePWA()
  const { isOnline } = useOfflineDetection()
  const breakpoint = useResponsiveBreakpoint()
  const safeArea = useSafeAreaInsets()
  const [showDemo, setShowDemo] = useState(false)

  // Solo mostrar en desarrollo
  useEffect(() => {
    setShowDemo(true) // Mostrar siempre
  }, [])

  if (!showDemo) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowDemo(!showDemo)}
        className="bg-emerald-600 text-white rounded-full p-3 shadow-lg hover:bg-emerald-700 transition-colors"
        title="PWA Status"
      >
        {pwaStatus.isStandalone ? (
          <Smartphone className="w-5 h-5" />
        ) : pwaStatus.hasServiceWorker ? (
          <Wand2 className="w-5 h-5" />
        ) : (
          <Monitor className="w-5 h-5" />
        )}
      </button>

      {showDemo && (
        <div className="absolute bottom-16 right-0 bg-slate-900 text-white rounded-lg shadow-xl p-4 w-72 space-y-3 text-sm border border-emerald-600/30">
          {/* Título */}
          <div className="font-bold text-emerald-400 border-b border-emerald-600/30 pb-2">
            📱 PWA Status
          </div>

          {/* Estado de instalación */}
          <div className="space-y-1">
            <div className="font-semibold text-emerald-300">Instalación</div>
            <div className="flex items-center gap-2 ml-2">
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  pwaStatus.isStandalone ? 'bg-green-400' : 'bg-yellow-400'
                )}
              />
              <span>{pwaStatus.isStandalone ? 'Instalado ✓' : 'No instalado'}</span>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <div className={cn('w-2 h-2 rounded-full', pwaStatus.hasServiceWorker ? 'bg-green-400' : 'bg-red-400')} />
              <span>Service Worker: {pwaStatus.hasServiceWorker ? 'Activo' : 'Inactivo'}</span>
            </div>
          </div>

          {/* Conexión */}
          <div className="space-y-1">
            <div className="font-semibold text-emerald-300">Conexión</div>
            <div className="flex items-center gap-2 ml-2">
              {isOnline ? (
                <>
                  <Wifi className="w-4 h-4 text-green-400" />
                  <span>Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-red-400" />
                  <span>Offline</span>
                </>
              )}
            </div>
          </div>

          {/* Dispositivo */}
          <div className="space-y-1">
            <div className="font-semibold text-emerald-300">Dispositivo</div>
            <div className="ml-2 space-y-1 text-xs">
              <div>Breakpoint: <span className="font-mono bg-slate-800 px-1 rounded">{breakpoint}</span></div>
              <div>Touch: {pwaStatus.isTouchDevice ? '✓' : '✗'}</div>
              <div>iOS: {pwaStatus.isIOS ? '✓' : '✗'}</div>
              <div>Android: {pwaStatus.isAndroid ? '✓' : '✗'}</div>
              <div>Netbook: {pwaStatus.isNetbook ? '✓' : '✗'}</div>
              {(safeArea.top || safeArea.right || safeArea.bottom || safeArea.left) && (
                <div className="pt-1 border-t border-slate-700 text-yellow-300">
                  <div>Safe Area Insets:</div>
                  <div className="ml-2 text-xs">
                    <div>Top: {safeArea.top}px</div>
                    <div>Right: {safeArea.right}px</div>
                    <div>Bottom: {safeArea.bottom}px</div>
                    <div>Left: {safeArea.left}px</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resolución */}
          <div className="space-y-1 border-t border-slate-700 pt-2">
            <div className="font-semibold text-emerald-300 text-xs">Resolución</div>
            <div className="ml-2 text-xs">
              {window.innerWidth}x{window.innerHeight}px
              <br />
              DPI: {window.devicePixelRatio?.toFixed(2)}
            </div>
          </div>

          {/* Info */}
          {!isOnline && (
            <div className="bg-yellow-600/20 border border-yellow-600/50 rounded p-2 flex gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-semibold">Modo Offline Activo</div>
                <div className="text-yellow-300">Los datos se sincronizarán cuando vuelvas online</div>
              </div>
            </div>
          )}

          {pwaStatus.isStandalone && (
            <div className="bg-green-600/20 border border-green-600/50 rounded p-2 text-xs">
              <div className="font-semibold text-green-300">✓ App Instalada</div>
              <div className="text-green-200">Ejecutándose en modo standalone</div>
            </div>
          )}

          {pwaStatus.isInstallable && !pwaStatus.isStandalone && (
            <div className="bg-blue-600/20 border border-blue-600/50 rounded p-2 text-xs">
              <div className="font-semibold text-blue-300">✓ Instalable</div>
              <div className="text-blue-200">Puedes instalar esta app desde el menú</div>
            </div>
          )}

          {/* Botones de debugging */}
          <div className="border-t border-slate-700 pt-2 space-y-1">
            <button
              onClick={() => {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.ready.then(registration => {
                    console.log('Service Worker Status:', registration)
                  })
                }
              }}
              className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded w-full text-center transition-colors"
            >
              Log SW Status
            </button>
            <button
              onClick={() => {
                if ('caches' in window) {
                  caches.keys().then(names => {
                    console.log('Available Caches:', names)
                    names.forEach(name => {
                      caches.open(name).then(cache => {
                        cache.keys().then(requests => {
                          console.log(`Cache "${name}":`, requests.map(r => r.url))
                        })
                      })
                    })
                  })
                }
              }}
              className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded w-full text-center transition-colors"
            >
              Log Caches
            </button>
            <button
              onClick={() => {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(registrations => {
                    registrations.forEach(r => r.unregister())
                    console.log('All SW unregistered. Reload to clear.')
                  })
                }
              }}
              className="text-xs bg-red-700/50 hover:bg-red-700 px-2 py-1 rounded w-full text-center transition-colors"
            >
              Unregister SW
            </button>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-700 pt-2 text-xs text-slate-400">
            PWA Debug Panel • {new Date().toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Componente para mostrar banner offline
 */
export function OfflineBanner() {
  const { isOnline } = useOfflineDetection()

  if (isOnline) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-600 text-white px-4 py-2 flex items-center gap-3">
      <WifiOff className="w-5 h-5" />
      <span className="font-semibold">Sin conexión - Usando datos en cache</span>
    </div>
  )
}

/**
 * Componente para botón de instalación
 */
export function InstallButton() {
  const { isInstallable, deferredPrompt } = usePWA()
  const [showPrompt, setShowPrompt] = useState(false)

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.log(`User response to the install prompt: ${outcome}`)
      setShowPrompt(false)
    }
  }

  if (!isInstallable || !showPrompt) return null

  return (
    <button
      onClick={handleInstall}
      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
    >
      <Smartphone className="w-5 h-5" />
      Instalar App
    </button>
  )
}
