import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/graphql': {
        target: 'https://sandbox-api-test.samyroad.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
