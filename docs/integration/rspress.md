# Rspress

`LiteTree`在`Rspress`中不需要任意配置就可以直接使用。

```tsx
// xxxx.mdx
import { LiteTree } from '@lite-tree/react';

<LiteTree data={`
- A公司
    行政中心
        总裁办              //   {color:red}important
        人力资源部
        财务部              //+
        行政部              //+
        法务部
        审计部              //-
        信息中心            //-
    + 市场中心
        市场部
        销售部
        客服部
        品牌部
        市场策划部
        市场营销部
    研发中心
        移动研发部(java,python,go)    //!
        平台研发部
        测试部              //*
        运维部              //*
        产品部
        设计部
`}>
</LiteTree>

```

:::warning 注意
`LiteTree`组件在`Rspress`中使用时，只能在`mdx`文件中使用。
:::
