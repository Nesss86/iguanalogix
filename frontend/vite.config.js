import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/appointments': 'http://localhost:3000',
      '/messages': 'http://localhost:3000',
    }
  }
})

