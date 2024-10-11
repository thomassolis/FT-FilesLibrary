import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: './ssl/localhost.key',
      cert: './ssl/localhost.crt',
    },
    proxy: {
      '/socket.io': {
        target: 'https://localhost:3000',
        ws: true,
        changeOrigin: true,
        secure: false, // Agrega esta opción para ignorar el certificado autofirmado
      }
    },
    port: 5173,
  },
  plugins: [react()],
})
