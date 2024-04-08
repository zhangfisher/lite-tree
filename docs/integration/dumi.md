# Dumi

`@lite-tree/react`是一个`Rect`组件，可以用在`Dumi`文档中。

## 第1步：安装

```bash
npm install @lite-tree/react
// or
yarn add @lite-tree/react
// or
pnpm add @lite-tree/react
```

## 第2步：注册组件

一般情况下，建议将`LiteTree`注册为全局组件，以便在任何地方都可以使用。

方法是在`.dumi/theme/builtins/`创建`LiteTree.tsx`，内容如下：

```ts
// .dumi/theme/builtins/LiteTree.tsx
import React from 'react';
import { LiteTree } from "@lite-tree/react"
export default LiteTree
```


## 第3步：使用 

`dumi`会自动将`.dumi/theme/builtins/`下的所有`.tsx`注册为全局组件，因此接下来在任何`markdown`文件都可以直接使用`<LiteTree>`组件。



