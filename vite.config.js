import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    https:{
      key: './ssl/localhost.key',
      cert: './ssl/localhost.crt',
    },
    port: 5173,
  },
  plugins: [react()],
})
