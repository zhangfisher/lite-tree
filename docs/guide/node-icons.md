# 图标

`LiteTree`支持在节点标题、标签、标识、注释中指定图标。

## 内置图标

`LiteTree`内置仅支持以下图标

<LiteTree>
内置图标
    [file] file
    [folder] folder
    [folder-open] folder-open
    [tag] tag
    [star] star
    [yes] yes
    [no] no
    [checked] checked
    [unchecked] unchecked
    [arrow] arrow
</LiteTree>

## 使用图标

在节点标题、标签、标识、注释中使用`[图标名]`即可指定图标。

```ts
<LiteTree>
根节点
    节点1
        节点1.1([tag]标签1,[star]标签2)   // 标签中包含[tag]和[star]图标
        [tag]节点[yes]1.2[no]  // 节点标题中包含[tag]图标
    节点2
        节点2.1([checked]标签5,[unchecked]标签6)
        节点2.2([arrow]标签7)   //[star]{color:red}  // 标识包含[star]图标
</LiteTree>
```
<LiteTree>
根节点
    节点1
        节点1.1([tag]标签1,[star]标签2)   // 标签中包含[tag]和[star]图标
        [tag]节点[yes]1.2[no]  // 节点标题中包含[tag]图标
    节点2
        节点2.1([checked]标签5,[unchecked]标签6)
        节点2.2([arrow]标签7)   //[star]{color:red}  // 标识包含[star]图标
</LiteTree>  


## 自定义图标


