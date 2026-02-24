import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // Met à jour le service worker automatiquement
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'], // Fichiers statiques à mettre en cache
      manifest: {
        name: 'FIZANAKARA', // Nom complet de votre application
        short_name: 'FIZANAKARA', // Nom court affiché sous l'icône
        description: "Fikambanan'ny Zanak'Anakara — Association des Descendants d'Ali Tawarath",
        theme_color: '#ee5253', // La couleur principale de votre thème
        background_color: '#ffffff', // Couleur de fond pendant le chargement
        display: 'standalone', // L'application s'ouvre comme une app native, sans barre de navigateur
        start_url: '/',
        icons: [
          {
            src: '/icon-192x192.png', // Assurez-vous d'avoir ces icônes dans votre dossier 'public'
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
            src: '/maskable-icon-512x512.png', // Icône adaptable pour Android
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        // Optionnel : Ajoutez des captures d'écran pour un meilleur aperçu dans Chrome
        screenshots: [
          {
            src: '/screenshots/home-mobile.png',
            sizes: '720x1280',
            type: 'image/png',
            form_factor: 'narrow', // Pour mobile
          },
          {
            src: '/screenshots/home-desktop.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide', // Pour tablette/desktop
          }
        ]
      },
    }),
  ],
})