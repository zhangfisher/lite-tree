import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import StyleBundler from "vite-plugin-vue-style-bundler"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    StyleBundler(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
