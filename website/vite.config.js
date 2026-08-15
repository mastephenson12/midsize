import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        roofers: resolve(__dirname, 'roofers.html'),
        calculator: resolve(__dirname, 'calculator.html'),
      },
    },
  },
})
