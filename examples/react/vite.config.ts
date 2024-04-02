import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from "node:fs"
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    "LITE_TREE_ROOT_STYLE":`\`${fs.readFileSync("../../packages/common/styles/root.css")}\``,
    "LITE_TREE_NODES_STYLE":`\`${fs.readFileSync("../../packages/common/styles/nodes.css")}\``
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "@common": resolve(__dirname,'../../packages/common')
    }    
  }, 
})
