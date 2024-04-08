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

`LiteTree`支持自定义图标,在使用`lite`格式时，可以在`变量声明区`指定`图标数据`。

```ts
<LiteTree>
github=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTEuOTk5IDFDNS45MjYgMSAxIDUuOTI1IDEgMTJjMCA0Ljg2IDMuMTUyIDguOTgzIDcuNTIzIDEwLjQzN2MuNTUuMTAyLjc1LS4yMzguNzUtLjUzYzAtLjI2LS4wMDktLjk1Mi0uMDE0LTEuODdjLTMuMDYuNjY0LTMuNzA2LTEuNDc1LTMuNzA2LTEuNDc1Yy0uNS0xLjI3LTEuMjIxLTEuNjEtMS4yMjEtMS42MWMtLjk5OS0uNjgxLjA3NS0uNjY4LjA3NS0uNjY4YzEuMTA1LjA3OCAxLjY4NSAxLjEzNCAxLjY4NSAxLjEzNGMuOTgxIDEuNjggMi41NzUgMS4xOTUgMy4yMDIuOTE0Yy4xLS43MS4zODQtMS4xOTUuNjk4LTEuNDdjLTIuNDQyLS4yNzgtNS4wMS0xLjIyMi01LjAxLTUuNDM3YzAtMS4yLjQyOC0yLjE4MyAxLjEzMi0yLjk1MmMtLjExNC0uMjc4LS40OTEtMS4zOTcuMTA4LTIuOTFjMCAwIC45MjMtLjI5NyAzLjAyNSAxLjEyN0ExMC41MzYgMTAuNTM2IDAgMCAxIDEyIDYuMzJhMTAuNDkgMTAuNDkgMCAwIDEgMi43NTQuMzdjMi4xLTEuNDI0IDMuMDIyLTEuMTI4IDMuMDIyLTEuMTI4Yy42IDEuNTE0LjIyMyAyLjYzMy4xMSAyLjkxMWMuNzA1Ljc2OSAxLjEzIDEuNzUxIDEuMTMgMi45NTJjMCA0LjIyNi0yLjU3MiA1LjE1Ni01LjAyMiA1LjQyOGMuMzk1LjM0Ljc0NyAxLjAxLjc0NyAyLjAzN2MwIDEuNDctLjAxNCAyLjY1Ny0uMDE0IDMuMDE3YzAgLjI5NS4xOTkuNjM3Ljc1Ni41M0MxOS44NTEgMjAuOTc5IDIzIDE2Ljg1OSAyMyAxMmMwLTYuMDc1LTQuOTI2LTExLTExLjAwMS0xMSIvPjwvc3ZnPg==
---
我的开源项目
    [github]VoerkaI18n    // [github]    
    SpeedForm    //[github]{color:red}
```

以上在`---`配置了`github`图标变量数据，然后在节点`标题`/`注释`/`标识`中使用`[github]`指定了图标。

**渲染效果如下：**

<LiteTree>
github=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTEuOTk5IDFDNS45MjYgMSAxIDUuOTI1IDEgMTJjMCA0Ljg2IDMuMTUyIDguOTgzIDcuNTIzIDEwLjQzN2MuNTUuMTAyLjc1LS4yMzguNzUtLjUzYzAtLjI2LS4wMDktLjk1Mi0uMDE0LTEuODdjLTMuMDYuNjY0LTMuNzA2LTEuNDc1LTMuNzA2LTEuNDc1Yy0uNS0xLjI3LTEuMjIxLTEuNjEtMS4yMjEtMS42MWMtLjk5OS0uNjgxLjA3NS0uNjY4LjA3NS0uNjY4YzEuMTA1LjA3OCAxLjY4NSAxLjEzNCAxLjY4NSAxLjEzNGMuOTgxIDEuNjggMi41NzUgMS4xOTUgMy4yMDIuOTE0Yy4xLS43MS4zODQtMS4xOTUuNjk4LTEuNDdjLTIuNDQyLS4yNzgtNS4wMS0xLjIyMi01LjAxLTUuNDM3YzAtMS4yLjQyOC0yLjE4MyAxLjEzMi0yLjk1MmMtLjExNC0uMjc4LS40OTEtMS4zOTcuMTA4LTIuOTFjMCAwIC45MjMtLjI5NyAzLjAyNSAxLjEyN0ExMC41MzYgMTAuNTM2IDAgMCAxIDEyIDYuMzJhMTAuNDkgMTAuNDkgMCAwIDEgMi43NTQuMzdjMi4xLTEuNDI0IDMuMDIyLTEuMTI4IDMuMDIyLTEuMTI4Yy42IDEuNTE0LjIyMyAyLjYzMy4xMSAyLjkxMWMuNzA1Ljc2OSAxLjEzIDEuNzUxIDEuMTMgMi45NTJjMCA0LjIyNi0yLjU3MiA1LjE1Ni01LjAyMiA1LjQyOGMuMzk1LjM0Ljc0NyAxLjAxLjc0NyAyLjAzN2MwIDEuNDctLjAxNCAyLjY1Ny0uMDE0IDMuMDE3YzAgLjI5NS4xOTkuNjM3Ljc1Ni41M0MxOS44NTEgMjAuOTc5IDIzIDE2Ljg1OSAyMyAxMmMwLTYuMDc1LTQuOTI2LTExLTExLjAwMS0xMSIvPjwvc3ZnPg==
---
我的开源项目
    [github]VoerkaI18n    // [github]
    SpeedForm    //[github]{color:red}
</LiteTree>

::: warning 如何读取图标数据?
访问https://icones.js.org/ ,选取图标，点击`Data URL`复制图标数据即可。
:::
