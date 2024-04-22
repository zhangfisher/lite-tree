import { resolve } from "path";
import { defineConfig } from "vite"; 
// https://vitejs.dev/config/
export default defineConfig({ 
  resolve: {
    alias: {
        "@common": resolve(__dirname,'../common')
    },    
  },
  define: {
    process: {env:{}}
  },
  build: {
    minify: false,
    lib: {
      entry: resolve("./src/index.tsx"),
      formats: ["es", "umd"], // 打包输出格式，默认输出 esm/umd
      fileName: (format, entryName) => {
        if (format === "es") {
          return `${entryName}.esm.js`;
        }else{
          return `${entryName}.js`;
        }         
      },      
      name: "LiteTree",    
    },
    rollupOptions: {
      //external: ["quarkc"], // 可选项，是否将 quarkc 打包进组件
      output: [       
        {
          dir: "../../examples/docsify",
          name:"LiteTree",
          format: "umd",
          globals: {
            quarkc: "Quarkc",
          },
        }, {
          dir: "dist",
          globals: {
            quarkc: "Quarkc",
          },
        },
      ]
    },
  },
});
