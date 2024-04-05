# 指南

## 关于

`@lite-tree/vue`是`LiteTree`的`Vue`版本，用于在`Vue`中显示树形结构。

`@lite-tree/vue`可以用在任意`Vue`项目中，包括`VitePress`、`Vite`、`VuePress`等。

## 快速使用

下面以`VitePress`为例进行说明。

### 第1步：安装

```ts
npm install @lite-tree/vue
// or
yarn add @lite-tree/vue
// or
pnpm add @lite-tree/vue
```

### 第2步：注册组件

`@lite-tree/vue`在`VitePress`中使用有两种方式：

- **按需引入**
- **全局引入**

一般建议将`LiteTree`注册为全局组件，以便在任何地方都可以使用。

```ts
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import { LiteTree } from '@lite-tree/vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('LiteTree'，LiteTree)
  }
}
``` 

接下需要在`.vitepress/config.mts`中配置`Vue`参数，如下：

```ts {5-9}
// .vitepress/config.mts
export default defineConfig({
 // ...
  vue:{
    template: {                      
      compilerOptions: {
        whitespace: 'preserve'      // [!code ++]
      }
    }
  }
})
```

::: tip
`whitespace: 'preserve'`是为了保留`Markdown`中的空格，以便`LiteTree`可以正确解析`lite`格式的树数据。
:::


### 第3步：使用 

由于上面将`LiteTree`注册为全局组件，因此接下来在任何`markdown`文件都可以直接使用`<LiteTree>`组件。

`lite-tree`支持使用`json`和`lite`两种格式来声明树数据。

:::warning 注意
`lite`是一种使用缩进来代表层级的简化格式，每`4个空格`代表一个树层级，适合在`Markdown`文档中使用。
:::

下面是一个简单的例子(`使用4个空格代码树的一个层缩进`)：

```md
<LiteTree>
- A公司
    行政中心
        总裁办
        人力资源部
        财务部
        行政部
        法务部
        审计部
        信息中心
    + 市场中心
        市场部
        销售部
        客服部
        品牌部
        市场策划部
        市场营销部
    研发中心
        移动研发部
        平台研发部
        测试部
        运维部
        产品部
        设计部
</LiteTree>

```

可以看到`lite`格式比起`json`或`ul/li`格式更加简洁，适合在`Markdown`文档中使用。

**渲染效果如下：**
 
<LiteTree>
A公司
    行政中心
        总裁办
        人力资源部
        财务部
        行政部
        法务部
        审计部
        信息中心
    + 市场中心
        市场部
        销售部
        客服部
        品牌部
        市场策划部
        市场营销部
    研发中心
        移动研发部
        平台研发部
        测试部
        运维部
        产品部
        设计部
</LiteTree>

**说明：**

- 可以看到`lite`格式非常简洁，只需要通过`缩进`或`TAB`来代表缩进即可，默认情况下,每`4`个空格代表一个树层级,一个`TAB`等于`4`个空格。
- 默认情况下，前置`-`号来表示节点展开状态，`+`号表示节点关闭状态。


## 指南

### 节点标识

`LiteTree`可以使用`//`为节点添加标识，显示在节点的最前面，宽度为`1.2em`用于标识节点的各种状态。

节点标识的格式如下：

:::warning 格式说明
在节点后面添加`//`并尾随`+` `-` `*` `!`等标识字符
:::


下面是一个例子：

```md {5-7,9-10,13-15,17,20-22}
<LiteTree>
- A公司
    行政中心
        总裁办
        人力资源部      //+        
        财务部          //+         
        行政部          //+         
        法务部
        审计部          //x        
        信息中心        //v
    市场中心
        市场部
        销售部          //-         
        客服部          //-         
        品牌部          //-         
        市场策划部
        市场营销部      //!        
    研发中心
        移动研发部
        平台研发部      //*        
        测试部          //*        
        运维部          //*        
        产品部
        设计部
</LiteTree>
```

**渲染效果如下：**
<LiteTree>
- A公司
    行政中心
        总裁办
        人力资源部   //+
        财务部      //+
        行政部      //+
        法务部            
        审计部      //x        
        信息中心    //v
    市场中心
        市场部
        销售部      //-
        客服部      //-
        品牌部      //-
        市场策划部        
        市场营销部  //!
    研发中心
        移动研发部
        平台研发部  //*
        测试部      //*
        运维部      //*
        产品部
</LiteTree>


#### 内置标识

`LiteTree`内置支持以下标识：

- `+`: 代表新增
- `-`: 代表删除
- `*`: 代表修改
- `!`: 代表强调
- `x`: 代表错误
- `v`: 代表成功

**效果如下：**

<LiteTree>
新增       //+     代表新增
删除       //-     代表删除
修改       //*      代表修改
强调       //!      代表强调
错误       //x      代表错误
成功       //v      代表成功
</LiteTree>


#### 自定义标识

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
---
成功       //s     代表成功
警告       //w.warning      代表警告
错误       //e{color:red}      代表错误
```

**渲染效果如下：**

<LiteTree>
.warning=color:#ff742e;background-color:#ffd0b3;
---
成功       //s{color:green}     代表成功
警告       //w.warning          代表警告
错误       //e{color:red}       代表错误
</LiteTree>


### 节点注释

`LiteTree`支持为节点添加注释，注释显示在节点的右侧`//`后果。

**下面是一个例子：**

```md
.warning=color:#ff742e;background-color:#ffd0b3;
---
成功       //      代表成功
警告       //     代表警告
错误       //     代表错误
```

**渲染效果如下：**

<LiteTree>
成功       //     成功注释
警告       //    警告注释
错误       //       错误注释
</LiteTree>

:::warning 注意
`//`后面必须有空格。
:::

### 节点标签

节点标题后可以显示`1-N`个小标签，标签显示在节点的右侧。

**下面是一个例子：**

```md
<LiteTree>
我的开源项目
    VoerkaI18n (React,{color:white;border:green;background-color:#37b705}Vue,nodejs)
    speedform
    Logsets
    VoerkaLogger (MIT,{color:red}日志)
    FlexDecorators
</LiteTree>

```

**渲染效果如下：**

<LiteTree>
我的开源项目
    VoerkaI18n(React,{color:white;border:green;background-color:#37b705}Vue,nodejs)
    speedform
    Logsets
    VoerkaLogger(MIT,{color:red}日志)
    FlexDecorators
</LiteTree>

### 节点图标

`LiteTree`支持为节点添加图标，图标显示在节点的左侧。默认内置了以下图标：

<LiteTree>
内置图标
    [file] file
    [folder] folder
    [folder-open] folder-open
    [arrow] arrow
    [tag] tag
    [checked] checked
    [unchecked] unchecked
    [star] star
    [yes] yes
    [no] no
</LiteTree>

#### **默认图标行为**

默认情况下，节点根据是否有`children`和节点展开/折叠状态，自动判断显示`file`、`folder`或`folder-open`图标。

#### **自定义图标**

也可以使用`[图标名称]`来指定节点图标，如`[arrow]`、`[tag]`等。

**下面是一个例子：**

- **第1步**：打开图标网站[icones](https://icones.js.org/)，选取合适的图标，将图标复制为`Data URL` 
- **第2步**：在树组件中声明自定义图标
 
```vue
<LiteTree>
github=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTEuOTk5IDFDNS45MjYgMSAxIDUuOTI1IDEgMTJjMCA0Ljg2IDMuMTUyIDguOTgzIDcuNTIzIDEwLjQzN2MuNTUuMTAyLjc1LS4yMzguNzUtLjUzYzAtLjI2LS4wMDktLjk1Mi0uMDE0LTEuODdjLTMuMDYuNjY0LTMuNzA2LTEuNDc1LTMuNzA2LTEuNDc1Yy0uNS0xLjI3LTEuMjIxLTEuNjEtMS4yMjEtMS42MWMtLjk5OS0uNjgxLjA3NS0uNjY4LjA3NS0uNjY4YzEuMTA1LjA3OCAxLjY4NSAxLjEzNCAxLjY4NSAxLjEzNGMuOTgxIDEuNjggMi41NzUgMS4xOTUgMy4yMDIuOTE0Yy4xLS43MS4zODQtMS4xOTUuNjk4LTEuNDdjLTIuNDQyLS4yNzgtNS4wMS0xLjIyMi01LjAxLTUuNDM3YzAtMS4yLjQyOC0yLjE4MyAxLjEzMi0yLjk1MmMtLjExNC0uMjc4LS40OTEtMS4zOTcuMTA4LTIuOTFjMCAwIC45MjMtLjI5NyAzLjAyNSAxLjEyN0ExMC41MzYgMTAuNTM2IDAgMCAxIDEyIDYuMzJhMTAuNDkgMTAuNDkgMCAwIDEgMi43NTQuMzdjMi4xLTEuNDI0IDMuMDIyLTEuMTI4IDMuMDIyLTEuMTI4Yy42IDEuNTE0LjIyMyAyLjYzMy4xMSAyLjkxMWMuNzA1Ljc2OSAxLjEzIDEuNzUxIDEuMTMgMi45NTJjMCA0LjIyNi0yLjU3MiA1LjE1Ni01LjAyMiA1LjQyOGMuMzk1LjM0Ljc0NyAxLjAxLjc0NyAyLjAzN2MwIDEuNDctLjAxNCAyLjY1Ny0uMDE0IDMuMDE3YzAgLjI5NS4xOTkuNjM3Ljc1Ni41M0MxOS44NTEgMjAuOTc5IDIzIDE2Ljg1OSAyMyAxMmMwLTYuMDc1LTQuOTI2LTExLTExLjAwMS0xMSIvPjwvc3ZnPg==
wechat=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE1Ljg1IDguMTRjLjM5IDAgLjc3LjAzIDEuMTQuMDhDMTYuMzEgNS4yNSAxMy4xOSAzIDkuNDQgM2MtNC4yNSAwLTcuNyAyLjg4LTcuNyA2LjQzYzAgMi4wNSAxLjE1IDMuODYgMi45NCA1LjA0TDMuNjcgMTYuNWwyLjc2LTEuMTljLjU5LjIxIDEuMjEuMzggMS44Ny40N2MtLjA5LS4zOS0uMTQtLjc5LS4xNC0xLjIxYy0uMDEtMy41NCAzLjQ0LTYuNDMgNy42OS02LjQzTTEyIDUuODlhLjk2Ljk2IDAgMSAxIDAgMS45MmEuOTYuOTYgMCAwIDEgMC0xLjkyTTYuODcgNy44MmEuOTYuOTYgMCAxIDEgMC0xLjkyYS45Ni45NiAwIDAgMSAwIDEuOTIiLz48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMi4yNiAxNC41N2MwLTIuODQtMi44Ny01LjE0LTYuNDEtNS4xNHMtNi40MSAyLjMtNi40MSA1LjE0czIuODcgNS4xNCA2LjQxIDUuMTRjLjU4IDAgMS4xNC0uMDggMS42Ny0uMkwyMC45OCAyMWwtMS4yLTIuNGMxLjUtLjk0IDIuNDgtMi4zOCAyLjQ4LTQuMDNtLTguMzQtLjMyYS45Ni45NiAwIDEgMSAuOTYtLjk2Yy4wMS41My0uNDMuOTYtLjk2Ljk2bTMuODUgMGEuOTYuOTYgMCAxIDEgMC0xLjkyYS45Ni45NiAwIDAgMSAwIDEuOTIiLz48L3N2Zz4=
---
自定义图标
    [github] Github     
    [wechat] 微信"/>
</LiteTree>
```

**渲染效果如下：**

<LiteTree>
github=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTEuOTk5IDFDNS45MjYgMSAxIDUuOTI1IDEgMTJjMCA0Ljg2IDMuMTUyIDguOTgzIDcuNTIzIDEwLjQzN2MuNTUuMTAyLjc1LS4yMzguNzUtLjUzYzAtLjI2LS4wMDktLjk1Mi0uMDE0LTEuODdjLTMuMDYuNjY0LTMuNzA2LTEuNDc1LTMuNzA2LTEuNDc1Yy0uNS0xLjI3LTEuMjIxLTEuNjEtMS4yMjEtMS42MWMtLjk5OS0uNjgxLjA3NS0uNjY4LjA3NS0uNjY4YzEuMTA1LjA3OCAxLjY4NSAxLjEzNCAxLjY4NSAxLjEzNGMuOTgxIDEuNjggMi41NzUgMS4xOTUgMy4yMDIuOTE0Yy4xLS43MS4zODQtMS4xOTUuNjk4LTEuNDdjLTIuNDQyLS4yNzgtNS4wMS0xLjIyMi01LjAxLTUuNDM3YzAtMS4yLjQyOC0yLjE4MyAxLjEzMi0yLjk1MmMtLjExNC0uMjc4LS40OTEtMS4zOTcuMTA4LTIuOTFjMCAwIC45MjMtLjI5NyAzLjAyNSAxLjEyN0ExMC41MzYgMTAuNTM2IDAgMCAxIDEyIDYuMzJhMTAuNDkgMTAuNDkgMCAwIDEgMi43NTQuMzdjMi4xLTEuNDI0IDMuMDIyLTEuMTI4IDMuMDIyLTEuMTI4Yy42IDEuNTE0LjIyMyAyLjYzMy4xMSAyLjkxMWMuNzA1Ljc2OSAxLjEzIDEuNzUxIDEuMTMgMi45NTJjMCA0LjIyNi0yLjU3MiA1LjE1Ni01LjAyMiA1LjQyOGMuMzk1LjM0Ljc0NyAxLjAxLjc0NyAyLjAzN2MwIDEuNDctLjAxNCAyLjY1Ny0uMDE0IDMuMDE3YzAgLjI5NS4xOTkuNjM3Ljc1Ni41M0MxOS44NTEgMjAuOTc5IDIzIDE2Ljg1OSAyMyAxMmMwLTYuMDc1LTQuOTI2LTExLTExLjAwMS0xMSIvPjwvc3ZnPg==
wechat=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE1Ljg1IDguMTRjLjM5IDAgLjc3LjAzIDEuMTQuMDhDMTYuMzEgNS4yNSAxMy4xOSAzIDkuNDQgM2MtNC4yNSAwLTcuNyAyLjg4LTcuNyA2LjQzYzAgMi4wNSAxLjE1IDMuODYgMi45NCA1LjA0TDMuNjcgMTYuNWwyLjc2LTEuMTljLjU5LjIxIDEuMjEuMzggMS44Ny40N2MtLjA5LS4zOS0uMTQtLjc5LS4xNC0xLjIxYy0uMDEtMy41NCAzLjQ0LTYuNDMgNy42OS02LjQzTTEyIDUuODlhLjk2Ljk2IDAgMSAxIDAgMS45MmEuOTYuOTYgMCAwIDEgMC0xLjkyTTYuODcgNy44MmEuOTYuOTYgMCAxIDEgMC0xLjkyYS45Ni45NiAwIDAgMSAwIDEuOTIiLz48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMi4yNiAxNC41N2MwLTIuODQtMi44Ny01LjE0LTYuNDEtNS4xNHMtNi40MSAyLjMtNi40MSA1LjE0czIuODcgNS4xNCA2LjQxIDUuMTRjLjU4IDAgMS4xNC0uMDggMS42Ny0uMkwyMC45OCAyMWwtMS4yLTIuNGMxLjUtLjk0IDIuNDgtMi4zOCAyLjQ4LTQuMDNtLTguMzQtLjMyYS45Ni45NiAwIDEgMSAuOTYtLjk2Yy4wMS41My0uNDMuOTYtLjk2Ljk2bTMuODUgMGEuOTYuOTYgMCAxIDEgMC0xLjkyYS45Ni45NiAwIDAgMSAwIDEuOTIiLz48L3N2Zz4=
---
自定义图标
    [github] Github
    [wechat] 微信
</LiteTree>
 
**还可以为图标指定样式，如下：**

```md
<LiteTree>
github=data:image/svg+xml;base64,......
wechat=data:image/svg+xml;base64,......
自定义图标
    [{color:red}github] Github
    [{color:green}wechat] 微信
</LiteTree>
 
```


**渲染效果如下：**
<LiteTree>
github=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTEuOTk5IDFDNS45MjYgMSAxIDUuOTI1IDEgMTJjMCA0Ljg2IDMuMTUyIDguOTgzIDcuNTIzIDEwLjQzN2MuNTUuMTAyLjc1LS4yMzguNzUtLjUzYzAtLjI2LS4wMDktLjk1Mi0uMDE0LTEuODdjLTMuMDYuNjY0LTMuNzA2LTEuNDc1LTMuNzA2LTEuNDc1Yy0uNS0xLjI3LTEuMjIxLTEuNjEtMS4yMjEtMS42MWMtLjk5OS0uNjgxLjA3NS0uNjY4LjA3NS0uNjY4YzEuMTA1LjA3OCAxLjY4NSAxLjEzNCAxLjY4NSAxLjEzNGMuOTgxIDEuNjggMi41NzUgMS4xOTUgMy4yMDIuOTE0Yy4xLS43MS4zODQtMS4xOTUuNjk4LTEuNDdjLTIuNDQyLS4yNzgtNS4wMS0xLjIyMi01LjAxLTUuNDM3YzAtMS4yLjQyOC0yLjE4MyAxLjEzMi0yLjk1MmMtLjExNC0uMjc4LS40OTEtMS4zOTcuMTA4LTIuOTFjMCAwIC45MjMtLjI5NyAzLjAyNSAxLjEyN0ExMC41MzYgMTAuNTM2IDAgMCAxIDEyIDYuMzJhMTAuNDkgMTAuNDkgMCAwIDEgMi43NTQuMzdjMi4xLTEuNDI0IDMuMDIyLTEuMTI4IDMuMDIyLTEuMTI4Yy42IDEuNTE0LjIyMyAyLjYzMy4xMSAyLjkxMWMuNzA1Ljc2OSAxLjEzIDEuNzUxIDEuMTMgMi45NTJjMCA0LjIyNi0yLjU3MiA1LjE1Ni01LjAyMiA1LjQyOGMuMzk1LjM0Ljc0NyAxLjAxLjc0NyAyLjAzN2MwIDEuNDctLjAxNCAyLjY1Ny0uMDE0IDMuMDE3YzAgLjI5NS4xOTkuNjM3Ljc1Ni41M0MxOS44NTEgMjAuOTc5IDIzIDE2Ljg1OSAyMyAxMmMwLTYuMDc1LTQuOTI2LTExLTExLjAwMS0xMSIvPjwvc3ZnPg==
wechat=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE1Ljg1IDguMTRjLjM5IDAgLjc3LjAzIDEuMTQuMDhDMTYuMzEgNS4yNSAxMy4xOSAzIDkuNDQgM2MtNC4yNSAwLTcuNyAyLjg4LTcuNyA2LjQzYzAgMi4wNSAxLjE1IDMuODYgMi45NCA1LjA0TDMuNjcgMTYuNWwyLjc2LTEuMTljLjU5LjIxIDEuMjEuMzggMS44Ny40N2MtLjA5LS4zOS0uMTQtLjc5LS4xNC0xLjIxYy0uMDEtMy41NCAzLjQ0LTYuNDMgNy42OS02LjQzTTEyIDUuODlhLjk2Ljk2IDAgMSAxIDAgMS45MmEuOTYuOTYgMCAwIDEgMC0xLjkyTTYuODcgNy44MmEuOTYuOTYgMCAxIDEgMC0xLjkyYS45Ni45NiAwIDAgMSAwIDEuOTIiLz48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMi4yNiAxNC41N2MwLTIuODQtMi44Ny01LjE0LTYuNDEtNS4xNHMtNi40MSAyLjMtNi40MSA1LjE0czIuODcgNS4xNCA2LjQxIDUuMTRjLjU4IDAgMS4xNC0uMDggMS42Ny0uMkwyMC45OCAyMWwtMS4yLTIuNGMxLjUtLjk0IDIuNDgtMi4zOCAyLjQ4LTQuMDNtLTguMzQtLjMyYS45Ni45NiAwIDEgMSAuOTYtLjk2Yy4wMS41My0uNDMuOTYtLjk2Ljk2bTMuODUgMGEuOTYuOTYgMCAxIDEgMC0xLjkyYS45Ni45NiAwIDAgMSAwIDEuOTIiLz48L3N2Zz4=
---
自定义图标(指定样式)
    [{color:red}github] Github   //  [github]最大的开源网站
    [{color:green}wechat] 微信   //[cool]{color:red}   显示在标识并指定颜色
    VoerkaI18n is [cool]  //  [cool]显示在标题
    VoerkaI18n   //  [cool]显示在注释
    VoerkaI18n[cool][github][wechat] is cool    // 同时显示多个图标
</LiteTree>
 
自定义图标还可以显示在`标题`，`标识`，`标签`，`注释`等，如下：

```md
github=data:image/svg+xml;base64,<....图标数据...>
wechat=data:image/svg+xml;base64,<....图标数据...>
cool=data:image/svg+xml;base64,<....图标数据...>
---
自定义图标(指定样式)
    [{color:red}github] Github   //  [github]最大的开源网站
    [{color:green}wechat] 微信   //[cool]{color:red}   显示在标识并指定颜色
    VoerkaI18n is [cool]  //  [cool]显示在标题
    VoerkaI18n   //  [cool]显示在注释
    VoerkaI18n[cool][github][wechat] is cool    // 同时显示多个图标
    VoerkaI18n([github]github)    // 显示在标签
```


**渲染效果如下：**
<LiteTree>
github=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTEuOTk5IDFDNS45MjYgMSAxIDUuOTI1IDEgMTJjMCA0Ljg2IDMuMTUyIDguOTgzIDcuNTIzIDEwLjQzN2MuNTUuMTAyLjc1LS4yMzguNzUtLjUzYzAtLjI2LS4wMDktLjk1Mi0uMDE0LTEuODdjLTMuMDYuNjY0LTMuNzA2LTEuNDc1LTMuNzA2LTEuNDc1Yy0uNS0xLjI3LTEuMjIxLTEuNjEtMS4yMjEtMS42MWMtLjk5OS0uNjgxLjA3NS0uNjY4LjA3NS0uNjY4YzEuMTA1LjA3OCAxLjY4NSAxLjEzNCAxLjY4NSAxLjEzNGMuOTgxIDEuNjggMi41NzUgMS4xOTUgMy4yMDIuOTE0Yy4xLS43MS4zODQtMS4xOTUuNjk4LTEuNDdjLTIuNDQyLS4yNzgtNS4wMS0xLjIyMi01LjAxLTUuNDM3YzAtMS4yLjQyOC0yLjE4MyAxLjEzMi0yLjk1MmMtLjExNC0uMjc4LS40OTEtMS4zOTcuMTA4LTIuOTFjMCAwIC45MjMtLjI5NyAzLjAyNSAxLjEyN0ExMC41MzYgMTAuNTM2IDAgMCAxIDEyIDYuMzJhMTAuNDkgMTAuNDkgMCAwIDEgMi43NTQuMzdjMi4xLTEuNDI0IDMuMDIyLTEuMTI4IDMuMDIyLTEuMTI4Yy42IDEuNTE0LjIyMyAyLjYzMy4xMSAyLjkxMWMuNzA1Ljc2OSAxLjEzIDEuNzUxIDEuMTMgMi45NTJjMCA0LjIyNi0yLjU3MiA1LjE1Ni01LjAyMiA1LjQyOGMuMzk1LjM0Ljc0NyAxLjAxLjc0NyAyLjAzN2MwIDEuNDctLjAxNCAyLjY1Ny0uMDE0IDMuMDE3YzAgLjI5NS4xOTkuNjM3Ljc1Ni41M0MxOS44NTEgMjAuOTc5IDIzIDE2Ljg1OSAyMyAxMmMwLTYuMDc1LTQuOTI2LTExLTExLjAwMS0xMSIvPjwvc3ZnPg==
wechat=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE1Ljg1IDguMTRjLjM5IDAgLjc3LjAzIDEuMTQuMDhDMTYuMzEgNS4yNSAxMy4xOSAzIDkuNDQgM2MtNC4yNSAwLTcuNyAyLjg4LTcuNyA2LjQzYzAgMi4wNSAxLjE1IDMuODYgMi45NCA1LjA0TDMuNjcgMTYuNWwyLjc2LTEuMTljLjU5LjIxIDEuMjEuMzggMS44Ny40N2MtLjA5LS4zOS0uMTQtLjc5LS4xNC0xLjIxYy0uMDEtMy41NCAzLjQ0LTYuNDMgNy42OS02LjQzTTEyIDUuODlhLjk2Ljk2IDAgMSAxIDAgMS45MmEuOTYuOTYgMCAwIDEgMC0xLjkyTTYuODcgNy44MmEuOTYuOTYgMCAxIDEgMC0xLjkyYS45Ni45NiAwIDAgMSAwIDEuOTIiLz48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yMi4yNiAxNC41N2MwLTIuODQtMi44Ny01LjE0LTYuNDEtNS4xNHMtNi40MSAyLjMtNi40MSA1LjE0czIuODcgNS4xNCA2LjQxIDUuMTRjLjU4IDAgMS4xNC0uMDggMS42Ny0uMkwyMC45OCAyMWwtMS4yLTIuNGMxLjUtLjk0IDIuNDgtMi4zOCAyLjQ4LTQuMDNtLTguMzQtLjMyYS45Ni45NiAwIDEgMSAuOTYtLjk2Yy4wMS41My0uNDMuOTYtLjk2Ljk2bTMuODUgMGEuOTYuOTYgMCAxIDEgMC0xLjkyYS45Ni45NiAwIDAgMSAwIDEuOTIiLz48L3N2Zz4=
cool=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxnIGZpbGw9ImN1cnJlbnRDb2xvciI+PHBhdGggZD0iTTQuNDc4IDE0Ljg0M2EyLjYwNCAyLjYwNCAwIDAgMSA0Ljg3NS0xLjI3NGwuMDM1LjA2M2EuNzUuNzUgMCAwIDEtMS4zMDguNzMzbC0uMDM1LS4wNjJhMS4xMDQgMS4xMDQgMCAwIDAtMi4wNjcuNTR2Mi4zNjNhMS4wMzIgMS4wMzIgMCAwIDAgMS45NzYuNDJsLjA5NS0uMjEzYS43NS43NSAwIDEgMSAxLjM3LjYxbC0uMDk1LjIxNGEyLjUzMiAyLjUzMiAwIDAgMS00Ljg0Ni0xLjAzem02LjAyMi4wMzJhMi42MjUgMi42MjUgMCAwIDEgNS4yNSAwdjIuMjVhMi42MjUgMi42MjUgMCAwIDEtNS4yNSAwem0yLjYyNS0xLjEyNWMtLjYyMSAwLTEuMTI1LjUwNC0xLjEyNSAxLjEyNXYyLjI1YTEuMTI1IDEuMTI1IDAgMCAwIDIuMjUgMHYtMi4yNWMwLS42MjEtLjUwNC0xLjEyNS0xLjEyNS0xLjEyNW0zLjYzNSAxLjEyNWEyLjYyNSAyLjYyNSAwIDAgMSA1LjI1IDB2Mi4yNWEyLjYyNSAyLjYyNSAwIDAgMS01LjI1IDB6bTIuNjI0LTEuMTI1Yy0uNjIgMC0xLjEyNS41MDQtMS4xMjUgMS4xMjV2Mi4yNWExLjEyNSAxLjEyNSAwIDAgMCAyLjI1IDB2LTIuMjVjMC0uNjIxLS41MDMtMS4xMjUtMS4xMjUtMS4xMjVtNC4zNi0xLjQyOGEuNzUuNzUgMCAwIDEgLjc1Ljc1djUuMDUyYzAgLjA3LjA1Ni4xMjUuMTI1LjEyNWgyLjEzYS43NS43NSAwIDAgMSAwIDEuNWgtMy4wMDVhLjc1Ljc1IDAgMCAxLS43NS0uNzV2LTUuOTI3YS43NS43NSAwIDAgMSAuNzUtLjc1Ii8+PHBhdGggZD0iTTYgMWE1IDUgMCAwIDAtNSA1djIwYTUgNSAwIDAgMCA1IDVoMjBhNSA1IDAgMCAwIDUtNVY2YTUgNSAwIDAgMC01LTV6TTMgNmEzIDMgMCAwIDEgMy0zaDIwYTMgMyAwIDAgMSAzIDN2MjBhMyAzIDAgMCAxLTMgM0g2YTMgMyAwIDAgMS0zLTN6Ii8+PC9nPjwvc3ZnPg==
---
自定义图标(指定样式)
    [{color:red}github] Github   //  [github]最大的开源网站
    [{color:green}wechat] 微信   //[cool]{color:red}   显示在标识并指定颜色
    VoerkaI18n is [cool]  //  [cool]显示在标题
    VoerkaI18n   //  [cool]显示在注释
    VoerkaI18n[cool][github][wechat] is cool
    VoerkaI18n([github]github)    // 显示在标签
</LiteTree>


### 上下文变量

`LiteTree`允许在节点数据中定义上下文变量，声明树数据时，使用`---`分割上下文变量和树数据，以便在树中引用。

支持定义以下上下文变量：

- `样式`: 形如`#样式名称=css样式`
- `样式类`: 形如`.样式名称=css样式`
- `图标`: 形如`图标名称=<data:image/svg+xml;base64,<...图标数据...>>`


```mdx {2-5,7}
<LiteTree>
在此定义上下文变量
#<样式名称>=<样式值>
.样式类名=<样式值>
<图标名称>=<图标数据>
---   
在此定义树数据
</LiteTree>
```

**一个简单示例：**

```mdx
<LiteTree>
我的项目
    VoerkaI18n(#blue)  //{color:red;border:1px solid red;}
    speedform
    Logsets
    VoerkaLogger(#error) 
    FlexDecorators
    airplane
    ts
</LiteTree>
```

以上声明了5个上下文变量，分别是:

- 2个样式： `error`、`blue`
- 1个类：`tip`
- 2个图标: `airplane`、`ts`。

接下来我们在树数据中引用这些上下文变量。

```md {2,5,7}
<LiteTree>
// 声明样式
#cool=color:red;border: 1px solid red;background:#ffd2d2;padding:2px;
#blue=color:red;border: 1px solid blue;background:#e6e6ff;padding:2px;
// 声明样式类
.tip=border:1px solid;red;
// 声明嵌入式图标
airplane=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjM1LjU4IDEyOC44NEwxNjAgOTEuMDZWNDhhMzIgMzIgMCAwIDAtNjQgMHY0My4wNmwtNzUuNTggMzcuNzhBOCA4IDAgMCAwIDE2IDEzNnYzMmE4IDggMCAwIDAgOS41NyA3Ljg0TDk2IDE2MS43NnYxOC45M2wtMTMuNjYgMTMuNjVBOCA4IDAgMCAwIDgwIDIwMHYzMmE4IDggMCAwIDAgMTEgNy40M2wzNy0xNC44MWwzNyAxNC44MWE4IDggMCAwIDAgMTEtNy40M3YtMzJhOCA4IDAgMCAwLTIuMzQtNS42NkwxNjAgMTgwLjY5di0xOC45M2w3MC40MyAxNC4wOEE4IDggMCAwIDAgMjQwIDE2OHYtMzJhOCA4IDAgMCAwLTQuNDItNy4xNk0yMjQgMTU4LjI0bC03MC40My0xNC4wOEE4IDggMCAwIDAgMTQ0IDE1MnYzMmE4IDggMCAwIDAgMi4zNCA1LjY2TDE2MCAyMDMuMzF2MTYuODdsLTI5LTExLjYxYTggOCAwIDAgMC01Ljk0IDBMOTYgMjIwLjE4di0xNi44N2wxMy42Ni0xMy42NUE4IDggMCAwIDAgMTEyIDE4NHYtMzJhOCA4IDAgMCAwLTkuNTctNy44NEwzMiAxNTguMjR2LTE3LjNsNzUuNTgtMzcuNzhBOCA4IDAgMCAwIDExMiA5NlY0OGExNiAxNiAwIDAgMSAzMiAwdjQ4YTggOCAwIDAgMCA0LjQyIDcuMTZMMjI0IDE0MC45NFoiLz48L3N2Zz4=
ts=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTUgMTUiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBkPSJNMTIuNSA4di0uMTY3YzAtLjczNi0uNTk3LTEuMzMzLTEuMzMzLTEuMzMzSDEwYTEuNSAxLjUgMCAxIDAgMCAzaDFhMS41IDEuNSAwIDAgMSAwIDNoLTFBMS41IDEuNSAwIDAgMSA4LjUgMTFNOCA2LjVIM20yLjUgMFYxM00uNS41aDE0djE0SC41eiIvPjwvc3ZnPg==
---
我的项目
    VoerkaI18n({#blue}Cool)   
    Logsets
    VoerkaLogger(#error) 
    FlexDecorators
    airplane
    ts
</LiteTree>
```
**渲染效果如下：**

<LiteTree>
#cool=color:red;border: 1px solid red;background:#ffd2d2;padding:2px;
#blue=color:blue;border: 1px solid blue;background:#e6e6ff;padding:2px;
.tip=border:1px solid;color:red;
airplane=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjM1LjU4IDEyOC44NEwxNjAgOTEuMDZWNDhhMzIgMzIgMCAwIDAtNjQgMHY0My4wNmwtNzUuNTggMzcuNzhBOCA4IDAgMCAwIDE2IDEzNnYzMmE4IDggMCAwIDAgOS41NyA3Ljg0TDk2IDE2MS43NnYxOC45M2wtMTMuNjYgMTMuNjVBOCA4IDAgMCAwIDgwIDIwMHYzMmE4IDggMCAwIDAgMTEgNy40M2wzNy0xNC44MWwzNyAxNC44MWE4IDggMCAwIDAgMTEtNy40M3YtMzJhOCA4IDAgMCAwLTIuMzQtNS42NkwxNjAgMTgwLjY5di0xOC45M2w3MC40MyAxNC4wOEE4IDggMCAwIDAgMjQwIDE2OHYtMzJhOCA4IDAgMCAwLTQuNDItNy4xNk0yMjQgMTU4LjI0bC03MC40My0xNC4wOEE4IDggMCAwIDAgMTQ0IDE1MnYzMmE4IDggMCAwIDAgMi4zNCA1LjY2TDE2MCAyMDMuMzF2MTYuODdsLTI5LTExLjYxYTggOCAwIDAgMC01Ljk0IDBMOTYgMjIwLjE4di0xNi44N2wxMy42Ni0xMy42NUE4IDggMCAwIDAgMTEyIDE4NHYtMzJhOCA4IDAgMCAwLTkuNTctNy44NEwzMiAxNTguMjR2LTE3LjNsNzUuNTgtMzcuNzhBOCA4IDAgMCAwIDExMiA5NlY0OGExNiAxNiAwIDAgMSAzMiAwdjQ4YTggOCAwIDAgMCA0LjQyIDcuMTZMMjI0IDE0MC45NFoiLz48L3N2Zz4=
ts=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTUgMTUiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBkPSJNMTIuNSA4di0uMTY3YzAtLjczNi0uNTk3LTEuMzMzLTEuMzMzLTEuMzMzSDEwYTEuNSAxLjUgMCAxIDAgMCAzaDFhMS41IDEuNSAwIDAgMSAwIDNoLTFBMS41IDEuNSAwIDAgMSA4LjUgMTFNOCA2LjVIM20yLjUgMFYxM00uNS41aDE0djE0SC41eiIvPjwvc3ZnPg==
---
[airplane] 我的项目
    VoerkaI18n({#cool}Cool)  
    speedform
    {#blue}Logsets
    VoerkaLogger(#error) 
    FlexDecorators    // {.tip}装饰器
    airplane
    [{color:blue}ts]{color:blue}ts
</LiteTree>


### 节点样式







### JSON数据

- 树数据的格式可以是`JSON`，并且具备一定的容错性:
    - 节点`Key`可以使用`"..."`或`'...'`包裹，也可以省略。
    - 字符串`Value`可以使用`"..."`或`'...'`包裹
    - 如果不小心漏掉了,号，也是可以补全的。

- 节点数据声明如下：

```json
{
    "title": "A公司",       // 节点标题，显示用
    "open": true,           // 是否展开
    "style": "color:red",   // 节点CSS
    "mark": "success",      // 节点标记，取值为`success`、`info`、`warning`、`error`
    "tags": ["",""],        // 节点标签
    "comment":"",           // 节点注释
    "children":[
        // 子节点
    ]
}
```

- 节点`title`,`mark`或`tags`字符串前置`{...}`包裹来声明`css`样式，如`tags:["{color:red;font-weight:bold;}OK","{color:blue}+"]`代表`OK`为红色加粗，`+`为蓝色。
- 每个节点可以通过`mark`来预置标记，取值为`success`、`info`、`warning`、`error`，分别代表`成功`、`信息`、`警告`、`错误`。分别用不同的颜色渲染。
- 节点可以通过`style`来声明`css`样式。
- 支持事件？ 暂不支持，因为本组件主要是用在`vitepress`静态页面中进行静态显示，所以目前不支持事件。

### 暗黑模式