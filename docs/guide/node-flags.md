# 节点标识

`LiteTree`支持为节点指定标识，用来表示节点的特殊状态。

- 节点的标识符显示在节点头部区域，默认为`1.2em`宽度。所以一般只是用来显示一些简单字符或图标。
- 节点的标识符可以指定样式
- 包含一些内置节点标识，如`+`、`-`、`*`等
- 支持自定义节点标识

## **基本用法**

节点标识的格式如下：

:::warning 格式说明
在节点后面添加`//`并尾随`+` `-` `*` `!`等标识字符
:::


下面是一个例子：

```md {5-7,9-10,13-15,17,20-22}
<LiteTree>
A公司
    行政中心
        总裁办
        人力资源部      //+         增加标识     
        财务部          //+         增加标识
        行政部          //+         增加标识
        法务部
        审计部          //x         错误标识
        信息中心        //v         成功标识
    市场中心
        市场部
        销售部          //-         删除标识
        客服部          //-         删除标识
        品牌部          //-         删除标识
        市场策划部
        市场营销部      //!        代表强调
    研发中心
        移动研发部
        平台研发部      //*        修改标识
        测试部          //*        修改标识
        运维部          //*        修改标识
        产品部
        设计部
</LiteTree>
```

**渲染效果如下：**
<LiteTree>
A公司
    行政中心
        总裁办
        人力资源部      //+         增加标识     
        财务部          //+         增加标识
        行政部          //+         增加标识
        法务部
        审计部          //x         错误标识
        信息中心        //v         成功标识
    市场中心
        市场部
        销售部          //-         删除标识
        客服部          //-         删除标识
        品牌部          //-         删除标识
        市场策划部      //i         忽略标识
        市场营销部      //!        代表强调
    研发中心
        移动研发部
        平台研发部      //*        修改标识
        测试部          //*        修改标识
        运维部          //*        修改标识
        产品部
        设计部
</LiteTree>

## **内置标识**

`LiteTree`内置支持以下内置标识：

```ts
<LiteTree>
新增       //+     代表新增
删除       //-     代表删除
修改       //*      代表修改
强调       //!      代表强调
错误       //x      代表错误
成功       //v      代表成功
忽略       //i      代表忽略
</LiteTree>
```

**渲染效果如下：**

<LiteTree>
新增       //+     代表新增
删除       //-     代表删除
修改       //*      代表修改
强调       //!      代表强调
错误       //x      代表错误
成功       //v      代表成功
忽略       //i      代表忽略
</LiteTree>


## 自定义标识

除了内置标识外，`LiteTree`也支持自定义标识,格式如下：

:::warning 格式说明
节点标题   **//**<`节点标识符`><`.节点样式类`><`{节点样式}`>
:::

- 标识标识字符必须尾随在`//`后，并且不能包含空格字符
- 可以为节点标识指定样式`CSS`类,如`//w.warning`代表节点应用`warning`样式类。
- 可以为节点标识指定`样式`，如`//e{color:red}`代表节点应用`color:red`样式。

**下面是一个例子：**

```md
.warning=color:#ff742e;background-color:#ffd0b3;
github=data:image/svg+xml;base64,<...此处省略自定义图标数据...>
---
成功                //s     代表成功
警告                //w.warning      代表警告
错误                //e{color:red}      代表错误
VoerkaI18n          //[github]{color:green}      使用图标标识
```

**渲染效果如下：**

<LiteTree>
.warning=color:#ff742e;background-color:#ffd0b3;
github=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTEuOTk5IDFDNS45MjYgMSAxIDUuOTI1IDEgMTJjMCA0Ljg2IDMuMTUyIDguOTgzIDcuNTIzIDEwLjQzN2MuNTUuMTAyLjc1LS4yMzguNzUtLjUzYzAtLjI2LS4wMDktLjk1Mi0uMDE0LTEuODdjLTMuMDYuNjY0LTMuNzA2LTEuNDc1LTMuNzA2LTEuNDc1Yy0uNS0xLjI3LTEuMjIxLTEuNjEtMS4yMjEtMS42MWMtLjk5OS0uNjgxLjA3NS0uNjY4LjA3NS0uNjY4YzEuMTA1LjA3OCAxLjY4NSAxLjEzNCAxLjY4NSAxLjEzNGMuOTgxIDEuNjggMi41NzUgMS4xOTUgMy4yMDIuOTE0Yy4xLS43MS4zODQtMS4xOTUuNjk4LTEuNDdjLTIuNDQyLS4yNzgtNS4wMS0xLjIyMi01LjAxLTUuNDM3YzAtMS4yLjQyOC0yLjE4MyAxLjEzMi0yLjk1MmMtLjExNC0uMjc4LS40OTEtMS4zOTcuMTA4LTIuOTFjMCAwIC45MjMtLjI5NyAzLjAyNSAxLjEyN0ExMC41MzYgMTAuNTM2IDAgMCAxIDEyIDYuMzJhMTAuNDkgMTAuNDkgMCAwIDEgMi43NTQuMzdjMi4xLTEuNDI0IDMuMDIyLTEuMTI4IDMuMDIyLTEuMTI4Yy42IDEuNTE0LjIyMyAyLjYzMy4xMSAyLjkxMWMuNzA1Ljc2OSAxLjEzIDEuNzUxIDEuMTMgMi45NTJjMCA0LjIyNi0yLjU3MiA1LjE1Ni01LjAyMiA1LjQyOGMuMzk1LjM0Ljc0NyAxLjAxLjc0NyAyLjAzN2MwIDEuNDctLjAxNCAyLjY1Ny0uMDE0IDMuMDE3YzAgLjI5NS4xOTkuNjM3Ljc1Ni41M0MxOS44NTEgMjAuOTc5IDIzIDE2Ljg1OSAyMyAxMmMwLTYuMDc1LTQuOTI2LTExLTExLjAwMS0xMSIvPjwvc3ZnPg==
---
成功       //s{color:green}     代表成功
警告       //w.warning          代表警告
错误       //e{color:red}       代表错误
VoerkaI18n       //[github]{color:green}      使用图标标识
</LiteTree>



:::warning 注意
标识区域宽度默认为`1.2em`，如果标识内容过长，可能会导致显示混乱。因此，一般建议标识内容尽量简短或使用图标。
:::