# 数据格式

`LiteTree`支持`lite`和`json`两种数据格式来描述树。 

## Lite格式

`lite`是一种使用缩进来代表层级的简化格式，专门设计来描述树结构，类似`YAML`格式，每`4个空格`代表一个树层级，适合在`Markdown`文档中使用。

**`lite`特性如下：**

- 节点数据由`变量声明区`和`树数据`两个区域，中间使用`---`分开。
- `变量声明区`用来声明嵌入样式、类样式、图标等信息，在节点中使用。
- `树数据`使用`4个空格`或`1个TAB`代表一个树层级，每一行代表一个节点。
- 节点前置`-`代表节点是展开的，`+`代表节点是折叠的。
- 节点后置`(tag,tag,...,tag)`用来为节点指定标签。
- 节点`//`尾随节点标识，支持`+`、`-`、`*`、`!`、`x`、`v`等标识。
- 节点`//`后面的内容代表注释。

```md
<LiteTree>
#red=color:red;
#bg=background-color:gray;border:1px solid #ccc;
github=data:image/svg+xml;base64,<...图标数据...>
---
根节点
    节点1
        节点1.1     //+
        节点1.2     //-
        节点1.3     //*
        节点1.4     //!
        节点1.5     //x
        节点1.6     //v
    -节点2
        节点2.1     // comment
        节点2.2(java,python,{#red}ts)     // comment
    +节点3
        节点3.1
        节点3.2
</LiteTree>
```

**渲染效果如下：**

<LiteTree>
#red=color:red;
#bg=background-color:gray;border:1px solid #ccc;
github=data:image/svg+xml;base64,<...图标数据...>
---
根节点
    节点1
        节点1.1     //+
        节点1.2     //-
        节点1.3     //*
        节点1.4     //!
        节点1.5     //x
        节点1.6     //v
    -节点2
        节点2.1     // comment
        节点2.2(java,python,{#red}ts)     // comment
    +节点3
        节点3.1
        节点3.2
</LiteTree>


## JSON格式

`JSON`格式是一种通用的数据格式，用来描述树结构，适合在`JavaScript`中使用。
但是在`Markdwon`中使用时比较繁琐，不推荐使用。

```ts
interface LiteTreeNode {
    id: string;                         // 节点ID
    title: string;                      // 节点标题
    icon: string;                       // 图标名称
    open: boolean;                      // 是否展开
    flag: '+' | '-' | '*' | '!' | 'x' | 'v'  | string;  // 标识
    diff: '+' | '-' | '*'               // 差异标识
    comment:string                      // 注释
    style:string                        // 样式
    classs:string[]                     // 类样式
    tags:string[]                       // 标签
    children?: LiteTreeNode[];          // 子节点
  }  
```
**注意**
为方便在`Markdown`场景下使用，`LiteTree`对支持的JSON数据格式作了一定的容错处理。

- `Key`允许不使用`"...."`包裹
- `Value`允许不使用`"...."`包裹
- 将`'....'`的字符串自动替换为`"...."`
- 对中文全角字符进行自动替换，如`，`自动替换为`,`。

如以下是不符合规范的`JSON`数据，因为其`Key`没有使用`"...."`包裹，但在`LiteTree`时可以正常解析的。这对在这与`Markdown`文档时特别方便，让文档更加简洁。

```js
{
  title: "根节点",
  children: [
    {
      title: "节点1"      
    },
    {
      title: "节点2"
    },
    {
      title: "节点3"
    }
  ]
}
```

<LiteTree json>
{
  title: "根节点",
  children: [
    {
      title: "节点1"      
    },
    {
      title: "节点2"
    },
    {
      title: "节点3"
    }
  ]
}
</LiteTree>










