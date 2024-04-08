# 快速使用

`LiteTree`包含`@lite-tree/react`和`@lite-tree/vue`两个版本，分别在`React`和`Vue`中使用,两者的使用方式基本相同。下面以`VitePress`为例进行说明。

## 第1步：安装

```ts
npm install @lite-tree/vue
// or
yarn add @lite-tree/vue
// or
pnpm add @lite-tree/vue
```

## 第2步：注册组件

`@lite-tree/vue`在`VitePress`中使用有两种方式：

- **按需引入**
- **全局引入**

一般建议将`LiteTree`注册为全局组件，以便在任何地方都可以使用。

```ts
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import { LiteTree } from '@lite-tree/vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('LiteTree'，LiteTree)
  }
}
``` 

接下需要在`.vitepress/config.mts`中配置`Vue`参数，如下：

```ts {5-9}
// .vitepress/config.mts
export default defineConfig({
 // ...
  vue:{
    template: {                      
      compilerOptions: {
        whitespace: 'preserve'      // [!code ++]
      }
    }
  }
})
```

:::warning 重点
设置`whitespace: 'preserve'`是为了保留`Markdown`中的空格，以便`LiteTree`可以正确解析`lite`格式的树数据。
:::


## 第3步：使用 

由于上面将`LiteTree`注册为全局组件，因此接下来在任何`markdown`文件都可以直接使用`<LiteTree>`组件。

`lite-tree`支持使用`json`和`lite`两种格式来声明树数据。

:::warning 注意
`lite`是一种使用缩进来代表层级的简化格式，每`4个空格`代表一个树层级，适合在`Markdown`文档中使用。
:::

下面是一个简单的例子(`使用4个空格代码树的一个层缩进`)：

```md
<LiteTree>
- A公司
    行政中心
        总裁办
        人力资源部
        财务部
        行政部
        法务部
        审计部
        信息中心
    + 市场中心
        市场部
        销售部
        客服部
        品牌部
        市场策划部
        市场营销部
    研发中心
        移动研发部
        平台研发部
        测试部
        运维部
        产品部
        设计部
</LiteTree>

```

可以看到`lite`格式比起`json`或`ul/li`格式更加简洁，适合在`Markdown`文档中使用。

**渲染效果如下：**
 
<LiteTree>
A公司
    行政中心
        总裁办
        人力资源部
        财务部
        行政部
        法务部
        审计部
        信息中心
    + 市场中心
        市场部
        销售部
        客服部
        品牌部
        市场策划部
        市场营销部
    研发中心
        移动研发部
        平台研发部
        测试部
        运维部
        产品部
        设计部
</LiteTree>

**说明：**

- 可以看到`lite`格式非常简洁，只需要通过`缩进`或`TAB`来代表缩进即可，默认情况下,每`4`个空格代表一个树层级,一个`TAB`等于`4`个空格。
- 默认情况下，前置`-`号来表示节点展开状态，`+`号表示节点关闭状态。

 