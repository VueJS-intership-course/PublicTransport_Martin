import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    open: true,
    proxy: {
      '/public-transport/': {
        target: 'http://v0.ovapi.nl/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/public-transport/, '')
      }
    }
  }
})
//http://localhost:8080/public-transport/journey/ARR_20230912_2201_1015_0/
