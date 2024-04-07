# React

`@lite-tree/react`是一个`React`组件，用于渲染树形结构。

## 安装

```bash
npm install @lite-tree/react
// or
yarn add @lite-tree/react
// or
pnpm add @lite-tree/react
```

## 使用

在`React/Jsx`中为`LiteTree`提供数据，由于`JSX`的限制,只能通过`data`属性传入。

```tsx
import { LiteTree } from "@lite-tree/react";

export ()=>{
  return <LiteTree data={`
根节点
    子节点
    子节点
`}/>
}
```

