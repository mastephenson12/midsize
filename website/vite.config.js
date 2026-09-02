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
        honestRoofer: resolve(__dirname, 'honest-roofer/index.html'),
        estimateDecoder: resolve(__dirname, 'estimate-decoder/index.html'),
        roofRepairOrReplace: resolve(__dirname, 'roofing/repair-or-replace/index.html'),
      },
    },
  },
})
