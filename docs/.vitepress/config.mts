import { defineConfig } from 'vitepress'
import { resolve } from "path"
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LiteTree",
  description: "A simple vue tree component for vitepress",
  base: '/lite-tree/',
  themeConfig: {
    outline:{
      label:"目录",  
      level:[2,5]
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' }, 
      { text: '指南', link: '/guide' }, 
    ],

    sidebar: [ 
      { text: '关于', link: '/about' },
      { text: '安装', link: '/install' },
      { text: '快速入门', link: '/get-starts' },
      { text: '示例', link: '/examples' },
      { 
        text: '指南',
        items:[
          { text: '节点', link: '/guide/node' },
          { text: '数据格式', link: '/guide/data-format' },
          { text: '展开折叠', link: '/guide/node-open-close' },
          { text: '标识', link: '/guide/node-flags' },
          { text: '注释', link: '/guide/node-comments' },
          { text: '标签', link: '/guide/node-tags' },
          { text: '图标', link: '/guide/node-icons' },
          { text: '链接', link: '/guide/node-links' },
          { text: '事件', link: '/guide/events' },
          { text: '定制变量', link: '/guide/vars' },          
          { text: '输出目录树', link: '/guide/dirtree' },
        ]    
      },
      { 
        text: '集成',
        items:[
          { text: 'React', link: '/integration/react' },
          { text: 'Vue', link: '/integration/vue' },
          { text: 'VitePress', link: '/integration/vitepress' },
          { text: 'Dumi', link: '/integration/dumi' },
          { text: 'Rspress', link: '/integration/rspress' },
          { text: 'WebComponent', link: '/integration/webcomponent' },
          { text: 'Docsify', link: '/integration/docsify' },
          { text: 'Docusaurus', link: '/integration/docusaurus' }
        ]}
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhangfisher/lite-tree' }
    ]
  },
  vite:{
    resolve:{
      alias:{
        //"@common": resolve(__dirname,'../../packages/common'),
        // "@lite-tree/vue": resolve(__dirname,'../../packages/vue')
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
