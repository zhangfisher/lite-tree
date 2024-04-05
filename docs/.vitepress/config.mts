import { defineConfig } from 'vitepress'
import { resolve } from "path"
import vue from '@vitejs/plugin-vue';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LiteTree",
  description: "A simple vue tree component for vitepress",
  base: '/lite-tree/',
  themeConfig: {
    outline:[2,5],
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' }, 
      { text: '指南', link: '/guide' }, 
    ],

    sidebar: [ 
      { text: '关于', link: '/about' },
      { text: '安装', link: '/install' },
      { 
        text: '指南', link: '/guide',
        items:[
          { text: 'Vue', link: '/vue' },
          { text: 'React', link: '/react' },
        ]    
      },
      
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhangfisher' }
    ]
  },
  vite:{
    resolve:{
      alias:{
        "@common": resolve(__dirname,'../../packages/common')
      }
    }
  },
  vue:{
    template: {
      compilerOptions: {
        whitespace: 'preserve'
      }
    }
  }
})
