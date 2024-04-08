import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path' 
import dts from 'vite-plugin-dts';



export default defineConfig({
  plugins: [
    react(),
    dts({rollupTypes: true})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "@common": resolve(__dirname,'../common')
    }    
  },   
  optimizeDeps: {  
    exclude: ['tslib']  
  },
  build:{    
    outDir: 'dist',
    sourcemap: true,
    minify: true,
    lib: {
      formats: ['es','cjs'],
      entry: [
        resolve(__dirname, 'src/index.tsx') 
      ],
    },    
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react','react-dom',"react/jsx-runtime"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'React',  
          'react-dom': 'ReactDOM'  
        }
      }
    } 
  } 
})
