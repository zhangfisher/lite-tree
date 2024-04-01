# vite-plugin-vue-style-bundler 

[中文](./readme_CN.md) | [英文](./readme.md)

When developing `Vue` components, the compiled products consist of `js` and `css`, and both `js` and `css` need to be imported when importing the component.

`vite-plugin-vue-style-bundler` can automatically extract the `css` styles in `Vue` components and bundle them into the `js` source code, and then automatically insert the style into the head at runtime.
After being processed by `vite-plugin-vue-style-bundler`, you only need to import js when importing components.

## Install

```shell
npm install vite-plugin-vue-style-bundler
// or
pnpm add vite-plugin-vue-style-bundler
// or 
yarn add vite-plugin-vue-style-bundler
```

## Usage

- **Step 1：Install Plugin**

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' 
import StyleBundler from "vite-plugin-vue-style-bundler"

export default defineConfig({
  plugins: [    
    vue(),
    StyleBundler({    
        // lessOptions:{},  if you need to use less, you can configure lessOptions
        // sassOptions:{}   if you need to use sass/scss, you can configure sassOptions
    }) 
  ],
})


```
- **第2步：Writing Components**

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

When the `bundle` attribute is added to the `style` tag of the component, the `vite-plugin-vue-style-bundler` plugin will process the source code of the component.

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


## Explain

- The plugin automatically injects code into the <script setup> of the current vue file.
- The styles will be injected into the `style` tag in the document `head`, and the `style.id` is generated based on the path of the current vue file by default. It can also be specified through `<style bundle='styleId'>`.
- If you need to use less or sass, you can add `lessOptions` or `sassOptions` in the plugin configuration.
- By default, the plugin enables the `scoped` mode for `css` in the `<style>` tag, so as to avoid style pollution. If `scoped` mode is not needed, you can set `<style scoped='false'>`.


## Recommendation

- [Internationalization Solution for React/Vue/Nodejs - VoerkaI18n](https://zhangfisher.github.io/voerka-i18n/)
- [React Form Development Library - speedform](https://zhangfisher.github.io/speed-form/)
- [Terminal Interface Development Enhancement Library - Logsets](https://zhangfisher.github.io/logsets/)
- [Log Output Library  - VoerkaLogger](https://zhangfisher.github.io/voerkalogger/)
- [Decorator Development - FlexDecorators](https://zhangfisher.github.io/flex-decorators/)
- [Finite State Machine Library  - FlexState](https://zhangfisher.github.io/flexstate/)
- [Universal Function Tool Library - FlexTools](https://zhangfisher.github.io/flex-tools/)
- [CSS-IN-JS Library  - Styledfc](https://zhangfisher.github.io/styledfc/)
- [VSCode Plugin for Adding Comments to JSON Files - json_comments_extension](https://github.com/zhangfisher/json_comments_extension)
- [Library for Developing Interactive Command Line Programs  - mixed-cli](https://github.com/zhangfisher/mixed-cli)
- [Powerful String Interpolation Variable Processing Tool Library - flexvars](https://github.com/zhangfisher/flexvars)
- [Frontend Link Debugging Assistant Tool - yald](https://github.com/zhangfisher/yald)
- [Asynchronous Signal - asyncsignal](https://github.com/zhangfisher/asyncsignal)
- [Vue Tree Component- LiteTree](https://github.com/zhangfisher/lite-tree)
 
## License

MIT


