import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // 👈 escucha en todas las interfaces de red
    port: 5173,
    https: {
      key: './ssl/localhost.key',
      cert: './ssl/localhost.crt',
    },
    proxy: {
      '/socket.io': {
        target: 'https://localhost:3000',
        ws: true,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
