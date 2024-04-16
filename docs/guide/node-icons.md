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

::: tip
如果节点标题内容以`/`结尾，则显示为`folder`图标。
:::

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

`LiteTree`支持自定义图标,有两种方式：

- **嵌入图标数据**

在使用`lite`格式时，可以在`变量声明区`指定`图标数据`。

```ts
<LiteTree>
github=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTEuOTk5IDFDNS45MjYgMSAxIDUuOTI1IDEgMTJjMCA0Ljg2IDMuMTUyIDguOTgzIDcuNTIzIDEwLjQzN2MuNTUuMTAyLjc1LS4yMzguNzUtLjUzYzAtLjI2LS4wMDktLjk1Mi0uMDE0LTEuODdjLTMuMDYuNjY0LTMuNzA2LTEuNDc1LTMuNzA2LTEuNDc1Yy0uNS0xLjI3LTEuMjIxLTEuNjEtMS4yMjEtMS42MWMtLjk5OS0uNjgxLjA3NS0uNjY4LjA3NS0uNjY4YzEuMTA1LjA3OCAxLjY4NSAxLjEzNCAxLjY4NSAxLjEzNGMuOTgxIDEuNjggMi41NzUgMS4xOTUgMy4yMDIuOTE0Yy4xLS43MS4zODQtMS4xOTUuNjk4LTEuNDdjLTIuNDQyLS4yNzgtNS4wMS0xLjIyMi01LjAxLTUuNDM3YzAtMS4yLjQyOC0yLjE4MyAxLjEzMi0yLjk1MmMtLjExNC0uMjc4LS40OTEtMS4zOTcuMTA4LTIuOTFjMCAwIC45MjMtLjI5NyAzLjAyNSAxLjEyN0ExMC41MzYgMTAuNTM2IDAgMCAxIDEyIDYuMzJhMTAuNDkgMTAuNDkgMCAwIDEgMi43NTQuMzdjMi4xLTEuNDI0IDMuMDIyLTEuMTI4IDMuMDIyLTEuMTI4Yy42IDEuNTE0LjIyMyAyLjYzMy4xMSAyLjkxMWMuNzA1Ljc2OSAxLjEzIDEuNzUxIDEuMTMgMi45NTJjMCA0LjIyNi0yLjU3MiA1LjE1Ni01LjAyMiA1LjQyOGMuMzk1LjM0Ljc0NyAxLjAxLjc0NyAyLjAzN2MwIDEuNDctLjAxNCAyLjY1Ny0uMDE0IDMuMDE3YzAgLjI5NS4xOTkuNjM3Ljc1Ni41M0MxOS44NTEgMjAuOTc5IDIzIDE2Ljg1OSAyMyAxMmMwLTYuMDc1LTQuOTI2LTExLTExLjAwMS0xMSIvPjwvc3ZnPg==
---
我的开源项目
    [github]VoerkaI18n    // [github]    
    SpeedForm    //[github]{color:red}
```

以上在`---`配置了`github`图标变量数据，然后在节点`标题`/`注释`/`标识`中使用`[github]`指定了图标。

如果使用`JSON`格式，同样可以在`data`属性中`指定`图标数据`。

```tsx
<LiteTree data={`
github=data:image/svg+xml;base64,图标数据
---
{
    title:"我的开源项目",
    children:[
        {   title:"VoerkaI18n",
            commect: "[github]",
            icon: "github"
        },
        {   title:"SpeedForm",
            commect: "[github]{color:red}",
        }
`}/>
```


**渲染效果如下：**

<LiteTree>
github=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTEuOTk5IDFDNS45MjYgMSAxIDUuOTI1IDEgMTJjMCA0Ljg2IDMuMTUyIDguOTgzIDcuNTIzIDEwLjQzN2MuNTUuMTAyLjc1LS4yMzguNzUtLjUzYzAtLjI2LS4wMDktLjk1Mi0uMDE0LTEuODdjLTMuMDYuNjY0LTMuNzA2LTEuNDc1LTMuNzA2LTEuNDc1Yy0uNS0xLjI3LTEuMjIxLTEuNjEtMS4yMjEtMS42MWMtLjk5OS0uNjgxLjA3NS0uNjY4LjA3NS0uNjY4YzEuMTA1LjA3OCAxLjY4NSAxLjEzNCAxLjY4NSAxLjEzNGMuOTgxIDEuNjggMi41NzUgMS4xOTUgMy4yMDIuOTE0Yy4xLS43MS4zODQtMS4xOTUuNjk4LTEuNDdjLTIuNDQyLS4yNzgtNS4wMS0xLjIyMi01LjAxLTUuNDM3YzAtMS4yLjQyOC0yLjE4MyAxLjEzMi0yLjk1MmMtLjExNC0uMjc4LS40OTEtMS4zOTcuMTA4LTIuOTFjMCAwIC45MjMtLjI5NyAzLjAyNSAxLjEyN0ExMC41MzYgMTAuNTM2IDAgMCAxIDEyIDYuMzJhMTAuNDkgMTAuNDkgMCAwIDEgMi43NTQuMzdjMi4xLTEuNDI0IDMuMDIyLTEuMTI4IDMuMDIyLTEuMTI4Yy42IDEuNTE0LjIyMyAyLjYzMy4xMSAyLjkxMWMuNzA1Ljc2OSAxLjEzIDEuNzUxIDEuMTMgMi45NTJjMCA0LjIyNi0yLjU3MiA1LjE1Ni01LjAyMiA1LjQyOGMuMzk1LjM0Ljc0NyAxLjAxLjc0NyAyLjAzN2MwIDEuNDctLjAxNCAyLjY1Ny0uMDE0IDMuMDE3YzAgLjI5NS4xOTkuNjM3Ljc1Ni41M0MxOS44NTEgMjAuOTc5IDIzIDE2Ljg1OSAyMyAxMmMwLTYuMDc1LTQuOTI2LTExLTExLjAwMS0xMSIvPjwvc3ZnPg==
---
我的开源项目
    [github]VoerkaI18n    // [github]
    SpeedForm    //[github]{color:red}
</LiteTree>


- **使用`css`图标**

自定义图标时，可以使用`css`图标，只需在编写一个包含图标的`css`样式文件然后导入即可，如下：


```css
/* custom-icon.css */

.lite-icon .icon 图标名{
    bakcground-image: url('图标路径或数据');
}

```

接来在您的应用中导入该`css`文件即可。


## 扩展图标包

`@lite-tree/icons`提供了一个专门用来显示支持文件类型的图标集，可以作为`css`直接引入使用。

```ts
// .vitepress/theme/index.ts
import '@lite-tree/icons/filetypes.css'    // 引入图标样式
import { getFileTypeIcon } from "@lite-tree/icons"

// 在React组件中使用
<LiteTree getIcon={getFileTypeIcon}/>
// 在Vue组件中使用
<LiteTree :getIcon="getFileTypeIcon"/>

```

- `getFileTypeIcon`函数会根据文件扩展名返回对应的图标.

<script setup>
import { getFileTypeIcon } from "@lite-tree/icons"
</script>
<LiteTree :getIcon="getFileTypeIcon" >
支持的文件类型
    [ts]ts
    [tsx]tsx
    [js]js
    [jsx]jsx
    [json]json
    [vue]vue
    [md]md
    [gif]gif
    [jpg]jpg
    [jpeg]jpeg
    [png]png
    [bmp]bmp
    [webp]webp
    [ico]ico
    [tiff]tiff
    [img]img
    [txt]txt
    [svg]svg
    [java]java
    [go]go
    [less]less
    [sass]sass
    [scss]scss
    [css]css
    [htm]htm
    [yml]yml
    [com]com
    [yaml]yaml
    [zip]zip
    [py]py
    [pyc]pyc
    [dat]dat
    [db]db
    [astro]astro
    [html]html
    [yaml]yaml
    [pdf]pdf
    [doc]doc
    [docx]docx
    [mp4]mp4
    [avi]avi
    [mov]mov
    [wmv]wmv
    [mpeg]mpeg
    [mpg]mpg
    [rm]rm
    [ram]ram
    [swf]swf
    [flv]flv
    [video]video
    [xls]xls
    [xlsx]xlsx
    [ppt]ppt
    [pptx]pptx
    [exe]exe
    [xml]xml
    [svelte]svelte
    [tar]tar
    [gz]gz
    [bz2]bz2
    [rar]rar    
    [mp3]mp3
    [ogg]ogg
    [flac]flac
    [wav]wav
    [csv]csv
    [php]php
    [vb]vb
    [cs]cs
    [kt]kt
    [h]h
    [hpp]hpp
    [hxx]hxx
    [cpp]cpp
    [c]c 
</LiteTree>


::: warning 如何读取图标数据?
访问https://icones.js.org/ ,选取图标，点击`Data URL`复制图标数据即可。
:::
