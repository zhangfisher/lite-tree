# LiteTree

`LiteTree`是一款非常简单的`vue`树组件，它的设计初衷是为了在`vitepress`上使用时可以比较方便地显示树形结构。

我们知道，`Vue`树组件非常多，一般情况下，但是在`vitepress`上使用这些组件时，会有一些问题，比如样式冲突、体积过大、功能太多等问题，这与`VitePress`这种以展示为主的场景显示格格不入。
特别是传递树数据时，一般是通过`props`传入的，这样在`vitepress`上使用时，就会显得非常麻烦。

所以，我开发了这款非常简单的`vue`树组件，它的特点是：

- 体积小，不依赖任何第三方库
- 样式简单，功能小巧
- 通过默认`slot`传递树数据，非常方便
- 树数据具备良好的容错性
- 支持自定义节点样式、标签、备注等


## 安装

```bash
npm install lite-tree
// or
yarn add lite-tree
// or
pnpm add lite-tree
```

## 使用方法

在`vitepress`中

```md
<script setup>
import Tree from 'lite-tree'
</script>

<Tree>
    {
        title: "A公司",
        expend: true,
        children:[          
        {
            title: "行政中心",
            children:[
                {title: "{color:red;font-weight:bold;}总裁办"},
                {title: "人力资源部",tags:['{color:red;}重点','{success}紧急']},
                {title: "财务部",mark:"success"},
                {title: "行政部"},
                {title: "法务部",mark:"warning"},
                {title: "审计部",style:"font-size:16px;font-style:italic"},
                {title: "信息中心",memo:"备用"},
                {title: "安全保卫部",memo:"{color:red}+"}
            ]
        },
        { 
            title: "市场中心",
            children:[
                {title: "市场部",mark:"info",tags:['{error}出错','{warning}警告']},
                {title: "销售部"},
                {title: "客服部"},
                {title: "品牌部",mark:'error'},
                {title: "市场策划部"},
                {title: "市场营销部",memo:"好",tags:["{info}ddddd"]}
            ]
        },
        {
            title: "研发中心",
            children:[
                {title: "移动研发部",mark:"warning"},
                {title: "平台研发部",tags:["{success}Java","{error}Go"]},
                {title: "测试部"},
                {title: "运维部"},
                {title: "产品部",mark:"success"},
                {title: "设计部"},
                {title: "项目管理部",memo:"{color:red;}+"}
            ]
        }
        ]
    }
</Tree>

```

最终的渲染效果如下：







