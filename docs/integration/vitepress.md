# VitePress

`@lite-tree/vue`是一个`Vue`组件，用于渲染树形结构。

## 安装

```bash
npm install @lite-tree/vue
// or
yarn add @lite-tree/vue
// or
pnpm add @lite-tree/vue
```

## 配置

如果通过默认`slot`传入数据，需要在`vite.config.ts`中配置：

```ts {5-9}
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  vue:{
    template: {                      
      compilerOptions: {
        whitespace: 'preserve'      // [!code ++]
      }
    }
  }
})
```

## 导入

在`vitpress`中使用`LiteTree`组件。有两种方式：

- **局部引入**

```ts
// xxxxxx.md

<script setup>
import { LiteTree } from '@lite-tree/vue'
</script>

```

- **全局引入**




## 使用

为`LiteTree`提供数据，可以通过`slot`或者`data`属性传入。

- **`slot`**

```vue
import { LiteTree } from "@lite-tree/vue";

<LiteTree>
// 这里是树形数据   // [!code ++]
</LiteTree>
```
:::warning 注意
需要设置`whitespace: 'preserve'`,这是为了保留`Markdown`中的空格，以便`LiteTree`可以正确解析`lite`格式的树数据。
:::

- `data`属性。

```vue
import { LiteTree } from "@lite-tree/vue";

<LiteTree :data="`
// 这里是树形数据   // [!code ++]
`"</LiteTree>
```

