# 标签

在节点标题后紧随`(tag,tag,tag)`用来表示节点的标签，支持多个标签。

- 多个标签之间使用`,`分隔
- 标签前可以指定`{...CSS样式...}`，用来指定标签的嵌入样式
- 标签内容也可以包含`[图标名]`

```ts
<LiteTree>
根节点
    节点1                     
        节点1.1(JavaScript,Go,C++)
        节点1.2
    节点2({color:white;background-color:#ff9e9e;border:1px solid red}A,{color:white;background-color:#9e9eff;border:1px solid blue}B,{color:white;background-color:#bfffbf;border:1px solid green}C)                     
        节点2.1
        节点2.2([tag]Github,Gitgee)
</LiteTree>
```

**渲染效果如下：**

<LiteTree>
根节点
    节点1                     
        节点1.1(JavaScript,Go,C++)
        节点1.2
    节点2({color:white;background-color:#ff9e9e;border:1px solid red}A,{color:white;background-color:#9e9eff;border:1px solid blue}B,{color:white;background-color:#bfffbf;border:1px solid green}C)                     
        节点2.1
        节点2.2([tag]Github,Gitgee)
</LiteTree>
