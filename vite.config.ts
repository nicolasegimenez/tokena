import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Investoken - Plataforma de Inversión Tokenizada',
        short_name: 'Investoken',
        description: 'Plataforma de inversión en activos tokenizados con soporte para múltiples categorías',
        theme_color: '#059669',
        background_color: '#0a0e27',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23059669" width="192" height="192"/><text x="50%" y="50%" font-size="100" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">I</text></svg>',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="%23059669" width="512" height="512"/><text x="50%" y="50%" font-size="300" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">I</text></svg>',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23ffffff" width="192" height="192"/><rect fill="%23059669" x="20" y="20" width="152" height="152" rx="30"/><text x="50%" y="50%" font-size="100" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">I</text></svg>',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
        categories: ['finance', 'investment'],
        screenshots: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 720"><rect fill="%230a0e27" width="540" height="720"/><text x="270" y="360" font-size="60" font-weight="bold" fill="%23059669" text-anchor="middle">Investoken</text></svg>',
            sizes: '540x720',
            type: 'image/svg+xml',
            form_factor: 'narrow',
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720"><rect fill="%230a0e27" width="1280" height="720"/><text x="640" y="360" font-size="60" font-weight="bold" fill="%23059669" text-anchor="middle">Investoken</text></svg>',
            sizes: '1280x720',
            type: 'image/svg+xml',
            form_factor: 'wide',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}'],
        globIgnores: ['**/node_modules/**/*', '.next/**/*'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cloudinary-images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\..*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5, // 5 minutos
              },
            },
          },
        ],
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': ['@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-dropdown-menu'],
          'charts': ['recharts'],
          'animations': ['motion'],
          'dnd': ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
          'web3': ['wagmi', 'viem'],
          'forms': ['zod'],
        },
      },
    },
    // Optimizar para dispositivos con bajo ancho de banda
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        passes: 2,
      },
      mangle: true,
    },
    // Optimizar imágenes
    assetsInlineLimit: 4096,
    // Generar mapas de fuente solo en producción necesaria
    sourcemap: false,
  },
  server: {
    // Optimizaciones para desarrollo
    middlewareMode: false,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
})
