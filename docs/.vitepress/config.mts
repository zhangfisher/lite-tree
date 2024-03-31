import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LiteTree",
  description: "A simple vue tree component for vitepress",
  base: '/lite-tree/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' }, 
      { text: '指南', link: '/guide' }, 
    ],

    sidebar: [ 
      { text: '关于', link: '/about' },
      { text: '安装', link: '/install' },
      { text: '指南', link: '/guide' },
      
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhangfisher' }
    ]
  }
})
