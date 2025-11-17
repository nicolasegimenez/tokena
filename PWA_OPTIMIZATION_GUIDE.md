# 📱 Guía de Optimización PWA - Investoken

## 🎯 Resumen Ejecutivo

Tu aplicación **Investoken** ha sido optimizada como PWA (Progressive Web App) con soporte completo para:
- ✅ **iPhone 16** (Safe Area Insets, Notches)
- ✅ **Android** (Material Design, Haptic Feedback)
- ✅ **Netbook Acer 701** (1024x600px - ultra compacto)
- ✅ **Todos los dispositivos** (responsive design)

---

## 📦 Cambios Realizados

### 1. **Dependencias Instaladas**
```bash
bun add -D vite-plugin-pwa workbox-core workbox-precaching workbox-routing workbox-strategies
```

### 2. **Archivos Creados**

#### **Configuración PWA**
- `public/manifest.json` - Manifest oficial con íconos, screenshots y shortcuts
- `vite.config.ts` - Actualizado con VitePWA plugin y optimizaciones
- `index.html` - Meta tags para PWA, safe areas, Open Graph

#### **Utilidades**
- `src/lib/usePWA.ts` - Hooks para detectar instalación, online/offline, dispositivos
- `src/lib/useCache.ts` - Cache inteligente con localStorage, sessionStorage, IndexedDB
- `src/lib/useOffline.ts` - Gestión de sincronización offline
- `src/components/LazyImage.tsx` - Componente de imagen optimizado

#### **Estilos**
- `src/styles/responsive.css` - Media queries para todos los breakpoints

---

## 🔧 Características Implementadas

### **1. Service Worker & Offline Support**
- ✅ Service Worker automático con Workbox
- ✅ Cache primero para fuentes, imágenes Cloudinary
- ✅ Network primero para APIs
- ✅ Sincronización en background cuando vuelve la conexión

### **2. Responsive Design**

#### Breakpoints Optimizados:
```
xs: 320px      - Phones muy pequeños
sm: 480px      - Phones
md: 768px      - Tablets / Netbook Acer 701
lg: 1024px     - Desktops
xl: 1280px     - Desktops grandes
2xl: 1536px    - Ultra-wide screens
```

#### Netbook Acer 701 (1024x600px):
- Altura máxima 650px detectada automáticamente
- Headers más compactos
- Botones optimizados para touch (44x44px mínimo)
- Single column grid en paisaje

### **3. Optimizaciones Mobile**

#### iPhone 16 Support:
```css
/* Safe Area Insets para notches */
@supports (padding: max(0px)) {
  padding-top: max(0, env(safe-area-inset-top));
  padding-right: max(0, env(safe-area-inset-right));
  padding-bottom: max(0, env(safe-area-inset-bottom));
  padding-left: max(0, env(safe-area-inset-left));
}
```

#### Android Support:
- Haptic Feedback (`navigator.vibrate`)
- Material Design principles
- Swipe gestures ready

### **4. Lazy Loading & Code Splitting**

#### Automatic Code Splitting:
```javascript
// Chunk separation for faster loading
{
  'vendor': ['react', 'react-dom', 'react-router-dom'],
  'ui-components': ['@radix-ui/*'],
  'charts': ['recharts'],
  'animations': ['motion'],
  'dnd': ['@dnd-kit/*'],
  'web3': ['wagmi', 'viem'],
  'forms': ['zod'],
}
```

#### Lazy Image Loading:
```tsx
<LazyImage
  src="cloudinary-image.jpg"
  alt="Investment"
  quality="high"
  loading="lazy"
/>
```

### **5. Caching Strategy**

#### Google Fonts (1 año):
```javascript
handler: 'CacheFirst'
maxEntries: 20
maxAgeSeconds: 31536000
```

#### Cloudinary Images (30 días):
```javascript
handler: 'CacheFirst'
maxEntries: 60
maxAgeSeconds: 2592000
```

#### APIs (5 minutos):
```javascript
handler: 'NetworkFirst'
maxEntries: 50
maxAgeSeconds: 300
```

---

## 🚀 Cómo Usar

### **Instalar PWA**

#### En Chrome/Chromium:
1. Visita `https://investoken.com`
2. Click en ⋮ → "Instalar aplicación"
3. O espera a que aparezca el prompt de instalación

#### En iPhone/Safari:
1. Toca Compartir
2. "Añadir a pantalla de inicio"
3. La app funcionará en modo standalone

#### En Android:
1. Chrome automáticamente sugiere instalación
2. O menu → "Instalar app"

### **Detectar Instalación en tu Código**

```tsx
import { usePWA } from '@/lib/usePWA'

export function MyComponent() {
  const { isStandalone, isOnline, isTouchDevice } = usePWA()

  return (
    <div>
      {isStandalone && <p>¡App instalada!</p>}
      {!isOnline && <p>Modo offline activo</p>}
      {isTouchDevice && <p>Dispositivo táctil</p>}
    </div>
  )
}
```

### **Usar Lazy Images**

```tsx
import { LazyImage } from '@/components/LazyImage'

<LazyImage
  src="https://res.cloudinary.com/..."
  alt="Project"
  loading="lazy"
  quality="high"
/>
```

### **Cache Inteligente**

```tsx
import { useCache } from '@/lib/useCache'

export function ProjectList() {
  const { data, loading } = useCache(
    'projects',
    () => fetch('/api/projects').then(r => r.json()),
    { ttl: 5 * 60 * 1000 } // 5 minutos
  )

  return <div>{data?.map(p => <div key={p.id}>{p.name}</div>)}</div>
}
```

### **Sincronización Offline**

```tsx
import { useOfflineDetection } from '@/lib/useOffline'

export function SyncStatus() {
  const { isOnline, wasOffline } = useOfflineDetection()

  useEffect(() => {
    if (isOnline && wasOffline) {
      console.log('Volvimos online, sincronizando datos...')
      // Sincronizar datos pendientes
    }
  }, [isOnline, wasOffline])
}
```

---

## 📊 Métricas de Build

```
✓ built in 19.82s

PWA v1.1.0
mode      generateSW
precache  61 entries (1631.37 KiB)
files generated:
  - dist/sw.js
  - dist/workbox-239d0d27.js
```

### Tamaños de Chunks:
- **vendor**: 32.35 KB (gzip: 11.34 KB)
- **ui-components**: 97.72 KB (gzip: 30.97 KB)
- **charts**: 406.67 KB (gzip: 106.05 KB)
- **animations**: 55.13 KB (gzip: 19.38 KB)
- **index**: 280.27 KB (gzip: 87.09 KB)

---

## 🎨 Responsive Breakpoints

### Mobile First (xs: 320px)
- Cambios: Fuente 14px, padding mínimo, single column
- Buttons: 44x44px mínimo (touch)
- Grid: 1 columna

### Phones (sm: 480px)
- Fuente: 15px
- Buttons: 48x48px
- Grid: 1 columna

### Tablets/Netbook (md: 768px)
- Fuente: 16px normal
- Grid: 2 columnas
- Sidebar visible

### Desktops (lg: 1024px+)
- Grid: 3-4 columnas
- Full layout

### Especial: Landscape + Altura < 500px
- Headers ultra-compactos
- Sidebar colapsable

---

## 🌐 Soporte de Dispositivos

### iPhone 16
- ✅ Safe Area Insets para notches y Dynamic Island
- ✅ Status bar color personalizado (black-translucent)
- ✅ Apple Touch Icon
- ✅ Standalone mode

### Android
- ✅ Material Design compliant
- ✅ Haptic Feedback (vibrate API)
- ✅ Theme color
- ✅ Display mode: standalone

### Netbook Acer 701 (1024x600px)
- ✅ Detección automática (width <= 1024 && height <= 768)
- ✅ UI compacta en landscape
- ✅ Botones touch-friendly
- ✅ Sin scroll horizontal

---

## 🔐 Seguridad & Performance

### Minificación
- Terser con 2 passes
- Drop console logs en producción
- Mangle enabled

### Assets
- Inline limit: 4096 bytes
- Format: Gzip compression
- Source maps: Disabled (producción)

### Preload/Prefetch
- Google Fonts preconnect
- Cloudinary preconnect
- DNS prefetch para APIs

---

## 🧪 Testing

### Verificar PWA:
```bash
# Build
bun run build

# Servir dist
cd dist && npx http-server

# Chrome DevTools:
1. F12 → Application → Service Workers
2. Debería mostrar "sw.js (activated and running)"
3. Comprobar Cache Storage
```

### Lighthouse Audit:
```bash
# Chrome DevTools → Lighthouse
# Verificar:
- Progressive Web App
- Performance
- Accessibility
- Best Practices
- SEO
```

---

## 📝 Notas Importantes

### Para Desarrollo:
```bash
# Service Worker está habilitado en dev
bun run dev
# Usar DevTools para testear offline
```

### Para Producción:
```bash
# Build final con PWA
bun run build

# Servir dist/ con HTTPS
# Service Worker requiere HTTPS en producción
```

### Cache Invalidation:
- El plugin PWA automaticamente invalida caches cuando hay cambios
- Los usuarios reciben updates automáticamente
- Manifest versión controlada

---

## 🔄 Flujo de Actualización

1. **Usuario descarga app**
   - Service Worker se instala
   - Workbox precachea 61 archivos

2. **Usuario vuelve después de actualización**
   - SW detecta cambios
   - Auto-update descarga nueva versión
   - Próxima vez que refresque, tendrá versión nueva

3. **Con conexión offline**
   - SW sirve desde cache
   - BackgroundSync sincroniza cuando vuelve online

---

## 📚 Recursos Útiles

- [Web.dev - PWA Guide](https://web.dev/progressive-web-apps/)
- [MDN - Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)

---

## ✨ Próximos Pasos (Opcionales)

1. **Agregar notificaciones push** (`Push API`)
2. **Compartir en redes** (`Web Share API`)
3. **Acceso a cámara/galería** (`File System Access API`)
4. **Sincronización periódica** (`Background Sync API`)
5. **Credenciales** (`Credential Management API`)

---

**Fecha de Optimización:** 2025-11-17
**Versión PWA:** 1.1.0
**Bun Version:** ^1.0.0
**Vite:** ^7.1.7
