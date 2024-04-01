# vite-plugin-vue-style-bundler

[中文](./readme_CN.md) | [英文](./readme.md)

开发`Vue`组件时，编译产物由`js`和`css`组成，导入该组件时需要同时导入`js`和`css`。

`vite-plugin-vue-style-bundler`可以实现, 自动提取`Vue`组件中的`css`样式一起打包到`js`源代码中，然后在运行时将`style`自动插入到`head`的`vite`插件。
这样，经过`vite-plugin-vue-style-bundler`处理后，导入组件时就只需要导入`js`就可以了。


## 安装

```shell
npm install vite-plugin-vue-style-bundler
// or
pnpm add vite-plugin-vue-style-bundler
// or 
yarn add vite-plugin-vue-style-bundler
```

## 使用方法

- **第1步：启用插件**

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' 
import StyleBundler from "vite-plugin-vue-style-bundler"

export default defineConfig({
  plugins: [    
    vue(),
    StyleBundler({    
        // lessOptions:{},  如果需要使用less，可以配置lessOptions
        // sassOptions:{}   如果需要使用sass，可以配置sassOptions
    }) 
  ],
})


```
- **第2步：编写组件**

```vue
<template>
  <div class="hello">Hello, {{ msg }}</div>
</template>
<style bundle>
.hello {
  color: red;
}
</style>
```

当在组件的`style`标签上添加`bundle`属性后，`vite-plugin-vue-style-bundler`插件会对该组件源码进行处理。

```diff

<template>
  <div class="hello">Hello, {{ msg }}</div>
</template>
<script setup>
+   const $insertStylesheet = (id,css)=>{
+        let style = document.getElementById('ho79thw')
+        if(!style){
+            style = document.createElement("style")
+            style.id = 'ho79thw'
+            document.head.appendChild(style)            
+            style.innerHTML = css
+        }
+    }
+    $insertStylesheet(`
+      .hello {
+        color: red;
+      }
+    `)
</script>
- <style bundle>
- .hello {
-   color: red;
- }
- </style>
```


## 说明

- 插件会在当前`vue`文件的`<script setup>`中自动注入代码。
- 样式会被注入到`head`的`style`标签中,`style.id`默认是根据当前`vue`文件的路径生成的。也可以通过`<style bundle='styleId'>`来指定`style.id`。
- 如果需要使用`less`或者`sass`，可以在插件配置中添加`lessOptions`或者`sassOptions`。
- 默认情况下插件对`<style>`标签中的`css`启用`scoped`模式，这样可以避免产生样式污染。如果不需要`scoped`模式，可以设置`<style scoped='false'>`


## 推荐

- [全流程一健化React/Vue/Nodejs国际化方案 - VoerkaI18n](https://zhangfisher.github.io/voerka-i18n/)
- [无以伦比的React表单开发库 - speedform](https://zhangfisher.github.io/speed-form/)
- [终端界面开发增强库 - Logsets](https://zhangfisher.github.io/logsets/)
- [简单的日志输出库 - VoerkaLogger](https://zhangfisher.github.io/voerkalogger/)
- [装饰器开发 - FlexDecorators](https://zhangfisher.github.io/flex-decorators/)
- [有限状态机库 - FlexState](https://zhangfisher.github.io/flexstate/)
- [通用函数工具库 - FlexTools](https://zhangfisher.github.io/flex-tools/)
- [小巧优雅的CSS-IN-JS库 - Styledfc](https://zhangfisher.github.io/styledfc/)
- [为JSON文件添加注释的VSCODE插件 - json_comments_extension](https://github.com/zhangfisher/json_comments_extension)
- [开发交互式命令行程序库 - mixed-cli](https://github.com/zhangfisher/mixed-cli)
- [强大的字符串插值变量处理工具库 - flexvars](https://github.com/zhangfisher/flexvars)
- [前端link调试辅助工具 - yald](https://github.com/zhangfisher/yald)
- [异步信号 - asyncsignal](https://github.com/zhangfisher/asyncsignal)
- [Vue树组件 - LiteTree](https://github.com/zhangfisher/lite-tree)
