import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LiteTree",
  description: "A simple vue tree component for vitepress",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' }, 
      { text: '文档', link: '/docs' }, 
    ],

    sidebar: [ 
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhangfisher' }
    ]
  }
})
