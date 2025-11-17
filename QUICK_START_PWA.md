# 🚀 Quick Start - PWA Investoken

## Comandos Esenciales

```bash
# Desarrollo
bun run dev

# Build PWA
bun run build

# Preview (simula producción)
bun run preview
```

## Verificar PWA en DevTools

### Chrome/Edge DevTools (F12):
```
Application → Service Workers
└─ Debería mostrar "sw.js (activated and running)"

Application → Manifest
└─ Debería tener todos los íconos y metadata

Application → Cache Storage
└─ google-fonts-cache
└─ cloudinary-images-cache
└─ api-cache
```

## Instalar en tu dispositivo

### iPhone:
1. Safari → Share → Add to Home Screen
2. Nombre: "Investoken"
3. ¡Listo! Se ejecuta como app nativa

### Android Chrome:
1. Menu (⋮) → Install app
2. O espera a que salga el prompt
3. ¡Listo!

### Desktop (Chrome/Edge):
1. Dirección → Instalar
2. O menu → More tools → Create shortcut
3. ¡Listo!

## Códigos de Ejemplo

### Detectar si está instalada:
```tsx
import { usePWA } from '@/lib/usePWA'

const { isStandalone } = usePWA()
if (isStandalone) console.log('App instalada!')
```

### Detectar offline:
```tsx
import { useOfflineDetection } from '@/lib/useOffline'

const { isOnline } = useOfflineDetection()
if (!isOnline) console.log('Sin conexión')
```

### Lazy load images:
```tsx
import { LazyImage } from '@/components/LazyImage'

<LazyImage
  src="https://res.cloudinary.com/..."
  alt="Project"
  quality="high"
/>
```

### Cache data:
```tsx
import { useCache } from '@/lib/useCache'

const { data } = useCache(
  'my-data',
  () => fetch('/api/data').then(r => r.json()),
  { ttl: 5 * 60 * 1000 } // 5 min
)
```

## Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `public/manifest.json` | Metadata PWA |
| `vite.config.ts` | Configuración Workbox |
| `index.html` | Meta tags PWA |
| `src/lib/usePWA.ts` | Detección PWA |
| `src/lib/useCache.ts` | Caching inteligente |
| `src/lib/useOffline.ts` | Sincronización offline |
| `src/styles/responsive.css` | Responsive design |

## Breakpoints Rápidos

```
xs: 320px   - Teléfono pequeño
sm: 480px   - Teléfono normal
md: 768px   - Tablet/Netbook
lg: 1024px  - Desktop
xl: 1280px  - Desktop grande
```

## Testing Offline

1. DevTools → Network → Online dropdown → "Offline"
2. La app debe seguir funcionando (desde cache)
3. Online → caches se actualizan automáticamente

## Troubleshooting

### Service Worker no se registra:
```
✓ ¿HTTPS en producción? (Requerido)
✓ ¿manifest.json accesible? (public/)
✓ ¿vite-plugin-pwa instalado? (bun add -D vite-plugin-pwa)
```

### Cambios no aparecen:
```
1. Ctrl+Shift+R (hard refresh)
2. DevTools → Cache Storage → Delete all
3. Recargar página
```

### App no se instala:
```
1. ¿manifest.json válido? (dev tools → Manifest)
2. ¿Meta tags correctos? (index.html)
3. ¿HTTPS? (Requerido en producción)
```

## Performance Tips

- ✅ Usa `useCache` para data que cambia lentamente
- ✅ Usa `LazyImage` para imágenes pesadas
- ✅ Code splitting automático (manualChunks)
- ✅ Comprime imágenes en Cloudinary con params `w_` y `q_`
- ✅ Monitorea tamaño de chunks en build

## Archivos Generados Automáticamente

Después de `bun run build`:

```
dist/
├─ sw.js                    ← Service Worker
├─ workbox-239d0d27.js     ← Workbox runtime
├─ manifest.json           ← PWA manifest
└─ assets/
   ├─ vendor-*.js
   ├─ ui-components-*.js
   ├─ charts-*.js
   └─ ... (otros chunks)
```

## Ejemplos Reales en tu Código

### MarketPlaceApp.tsx - ya usa lazy loading:
```tsx
<MarketplaceHeader
  isCollapsed={isHeaderCollapsed}  // Responsive ✓
/>
```

### Agregar soporte offline:
```tsx
import { useOfflineDetection } from '@/lib/useOffline'

export function MyPage() {
  const { isOnline } = useOfflineDetection()

  if (!isOnline) {
    return <OfflineMessage />
  }

  return <YourContent />
}
```

## Métricas del Build

```
Build Time: 19.82s
Total Assets: 1631.37 KiB
Main JS: 280.27 KB (gzip: 87.09 KB)
Charts: 406.67 KB (gzip: 106.05 KB)
UI Components: 97.72 KB (gzip: 30.97 KB)
```

## Links Útiles

- [Lighthouse](chrome://settings/search/lighthouse)
- [Service Worker Inspector](chrome://inspect/#service-workers)
- [Cache Storage](chrome://inspect/#applications)

---

**TL;DR**: Tu app ahora es un PWA completo. Instálala en cualquier dispositivo y funciona offline. ✨
