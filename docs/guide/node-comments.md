# 注释

`//`后面内容代表节点的注释，显示在最右侧。

- 注释内容默认是灰色显示
- 注释内容可以包含`{...CSS样式...}`，用来指定注释的嵌入样式
- 注释内容也可以包含`[图标名]`
- 注意`// `后必须有空白字符

```ts
<LiteTree>
根节点
    节点1                     
        节点1.1 // 默认注释
        节点1.2 // {color:white;background-color:#ff9e9e;border:1px solid red}指定样式注释
    节点2                  
        节点2.1  // [tag]注释中[star]包含[yes]图标
        节点2.2  // 注释中包含超链接[点击:star](https://github.com/zhangfisher/voerka-i18n)
</LiteTree>
```

**渲染效果如下：**

<LiteTree>
根节点
    节点1                     
        节点1.1 // 默认注释
        节点1.2 // {color:white;background-color:#ff9e9e;border:1px solid red}指定样式注释
    节点2                  
        节点2.1  // [tag]注释中[star]包含[yes]图标
        节点2.2  // 注释中包含超链接[官网:star](https://github.com/zhangfisher/voerka-i18n)
</LiteTree>