import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'node:path'
import StyleBundler from "vite-plugin-vue-style-bundler"
import dts from 'vite-plugin-dts';
 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    StyleBundler(),
    VueDevTools(),
    dts({rollupTypes: true})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "@common": resolve(__dirname,'../common')
    }    
  }, 
  define: {  
    'import.meta.env.SSR': process.env.VITE_SSR || false  
  },    
  build:{    
    outDir: 'dist',
    sourcemap: true,
    minify: true,
    lib: {
      formats: ['es','cjs'],
      entry: [
        resolve(__dirname, 'src/index.ts') 
      ],
    },    
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    } 
  } 
})
