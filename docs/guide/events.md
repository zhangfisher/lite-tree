# 事件

`LiteTree`目前支持以下事件：

## Click

节点被点击时触发。

**参数：**

事件参数`LiteTreeClickParams`，声明如下：

```ts
export type LiteTreeExpandEventHandler = (node:LiteTreeNode,e:MouseEvent)=>void
export type LiteTreeClickPosition = 'title' | 'tag'  | 'flag' | 'comment' | 'icon' | 'opener'
export type LiteTreeClickParams = {
    position:LiteTreeClickPosition              // 点击位置
    node:string                                 // 节点id
    element:HTMLElement                         // 点击的元素
}
```
 
## Expand

节点展开时触发。

```ts
export type LiteTreeExpandEventHandler = (node:LiteTreeNode,e:MouseEvent)=>void 
```

## Collapse

节点折叠时触发。

```ts
export type LiteTreeCollapseEventHandler = (node:LiteTreeNode,e:MouseEvent)=>void 
```


