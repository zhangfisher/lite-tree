import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts';
import fs from "node:fs" 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({rollupTypes: true})
  ],
  define:{
    "LITE_TREE_ROOT_STYLE":`\`${fs.readFileSync("../../packages/common/styles/root.css")}\``,
    "LITE_TREE_NODES_STYLE":`\`${fs.readFileSync("../../packages/common/styles/nodes.css")}\``
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "@common": resolve(__dirname,'../common')
    }    
  },   
  build:{    
    outDir: 'dist',
    sourcemap: true,
    minify: false,
    lib: {
      formats: ['es','cjs'],
      entry: [
        resolve(__dirname, 'src/index.vue') 
      ],
    },    
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'react'
        }
      }
    } 
  } 
})
