import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';
import { qrcode } from 'vite-plugin-qrcode'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    qrcode()
    ,
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'FIZANAKARA',
        short_name: 'FIZANAKARA',
        description: "Fikambanan'ny Zanak'Anakara — Association des Descendants d'Ali Tawarath",
        theme_color: '#ee5253',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: '/screenshots/home-mobile.png',
            sizes: '720x1280',
            type: 'image/png',
            form_factor: 'narrow',
          },
          {
            src: '/screenshots/home-desktop.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
          }
        ]
      },
    }),
  ],
  server: {
    host: true,
  }
})