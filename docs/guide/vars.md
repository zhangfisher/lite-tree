# 变量

`LiteTree`支持自定义扩展变量，以便在树数据中引用。

## lite格式

在使用`lite`格式声明树时，`LiteTree`允许在树数据中定义变量，支持定义：

- `样式变量`: 形如`#样式名称=css样式`
- `样式类变量`: 形如`.样式名称=css样式`
- `图标变量`: 形如`图标名称=<data:image/svg+xml;base64,<...图标数据...>>`


```md {3-8}
<LiteTree>
// 在此定义上下文变量
#<样式名称>=<样式值>
#<样式名称>=<样式值>
.样式类名=<样式值>
.样式类名=<样式值>
<图标名称>=<图标数据>
<图标名称>=<图标数据>
---                 // [!code ++]
在此定义树数据
</LiteTree>
```

**一个简单示例：**
 
```md {2,5,7}
<LiteTree>
// 声明样式
#cool=color:red;border: 1px solid red;background:#ffd2d2;padding:2px;// [!code ++]
#blue=color:red;border: 1px solid blue;background:#e6e6ff;padding:2px;// [!code ++]
// 声明样式类
.tip=border:1px solid;red;          // [!code ++]
// 声明嵌入式图标
airplane=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjM1LjU4IDEyOC44NEwxNjAgOTEuMDZWNDhhMzIgMzIgMCAwIDAtNjQgMHY0My4wNmwtNzUuNTggMzcuNzhBOCA4IDAgMCAwIDE2IDEzNnYzMmE4IDggMCAwIDAgOS41NyA3Ljg0TDk2IDE2MS43NnYxOC45M2wtMTMuNjYgMTMuNjVBOCA4IDAgMCAwIDgwIDIwMHYzMmE4IDggMCAwIDAgMTEgNy40M2wzNy0xNC44MWwzNyAxNC44MWE4IDggMCAwIDAgMTEtNy40M3YtMzJhOCA4IDAgMCAwLTIuMzQtNS42NkwxNjAgMTgwLjY5di0xOC45M2w3MC40MyAxNC4wOEE4IDggMCAwIDAgMjQwIDE2OHYtMzJhOCA4IDAgMCAwLTQuNDItNy4xNk0yMjQgMTU4LjI0bC03MC40My0xNC4wOEE4IDggMCAwIDAgMTQ0IDE1MnYzMmE4IDggMCAwIDAgMi4zNCA1LjY2TDE2MCAyMDMuMzF2MTYuODdsLTI5LTExLjYxYTggOCAwIDAgMC01Ljk0IDBMOTYgMjIwLjE4di0xNi44N2wxMy42Ni0xMy42NUE4IDggMCAwIDAgMTEyIDE4NHYtMzJhOCA4IDAgMCAwLTkuNTctNy44NEwzMiAxNTguMjR2LTE3LjNsNzUuNTgtMzcuNzhBOCA4IDAgMCAwIDExMiA5NlY0OGExNiAxNiAwIDAgMSAzMiAwdjQ4YTggOCAwIDAgMCA0LjQyIDcuMTZMMjI0IDE0MC45NFoiLz48L3N2Zz4=  // [!code ++]
ts=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTUgMTUiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBkPSJNMTIuNSA4di0uMTY3YzAtLjczNi0uNTk3LTEuMzMzLTEuMzMzLTEuMzMzSDEwYTEuNSAxLjUgMCAxIDAgMCAzaDFhMS41IDEuNSAwIDAgMSAwIDNoLTFBMS41IDEuNSAwIDAgMSA4LjUgMTFNOCA2LjVIM20yLjUgMFYxM00uNS41aDE0djE0SC41eiIvPjwvc3ZnPg==  // [!code ++]
---// [!code ++]
[airplane] 我的项目
    VoerkaI18n({#cool}Cool)  
    speedform
    {#blue}Logsets
    VoerkaLogger(#error) 
    FlexDecorators    // {.tip}装饰器
    airplane
    [{color:blue}ts]{color:blue}ts
</LiteTree>
```

以上声明了5个上下文变量，分别是:

- 2个样式： `error`、`blue`
- 1个类：`tip`
- 2个图标: `airplane`、`ts`。

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

## JSON格式

在`React`场景下也可以使用`JSON`格式声明树，此时需要将变量声明在`data`属性中。

```tsx
<LiteTree :data={`
#cool=color:red;border: 1px solid red;background:#ffd2d2;padding:2px;
#blue=color:blue;border: 1px solid blue;background:#e6e6ff;padding:2px;
.tip=border:1px solid;color:red;
airplane=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjM1LjU4IDEyOC44NEwxNjAgOTEuMDZWNDhhMzIgMzIgMCAwIDAtNjQgMHY0My4wNmwtNzUuNTggMzcuNzhBOCA4IDAgMCAwIDE2IDEzNnYzMmE4IDggMCAwIDAgOS41NyA3Ljg0TDk2IDE2MS43NnYxOC45M2wtMTMuNjYgMTMuNjVBOCA4IDAgMCAwIDgwIDIwMHYzMmE4IDggMCAwIDAgMTEgNy40M2wzNy0xNC44MWwzNyAxNC44MWE4IDggMCAwIDAgMTEtNy40M3YtMzJhOCA4IDAgMCAwLTIuMzQtNS42NkwxNjAgMTgwLjY5di0xOC45M2w3MC40MyAxNC4wOEE4IDggMCAwIDAgMjQwIDE2OHYtMzJhOCA4IDAgMCAwLTQuNDItNy4xNk0yMjQgMTU4LjI0bC03MC40My0xNC4wOEE4IDggMCAwIDAgMTQ0IDE1MnYzMmE4IDggMCAwIDAgMi4zNCA1LjY2TDE2MCAyMDMuMzF2MTYuODdsLTI5LTExLjYxYTggOCAwIDAgMC01Ljk0IDBMOTYgMjIwLjE4di0xNi44N2wxMy42Ni0xMy42NUE4IDggMCAwIDAgMTEyIDE4NHYtMzJhOCA4IDAgMCAwLTkuNTctNy44NEwzMiAxNTguMjR2LTE3LjNsNzUuNTgtMzcuNzhBOCA4IDAgMCAwIDExMiA5NlY0OGExNiAxNiAwIDAgMSAzMiAwdjQ4YTggOCAwIDAgMCA0LjQyIDcuMTZMMjI0IDE0MC45NFoiLz48L3N2Zz4=
ts=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTUgMTUiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBkPSJNMTIuNSA4di0uMTY3YzAtLjczNi0uNTk3LTEuMzMzLTEuMzMzLTEuMzMzSDEwYTEuNSAxLjUgMCAxIDAgMCAzaDFhMS41IDEuNSAwIDAgMSAwIDNoLTFBMS41IDEuNSAwIDAgMSA4LjUgMTFNOCA2LjVIM20yLjUgMFYxM00uNS41aDE0djE0SC41eiIvPjwvc3ZnPg==
---
{
    title:"我的项目",
    icon:"airplane",
    children:[
        { title:"VoerkaI18n", tags:["{#cool}Cool"]  },
        { title:"speedform"},
        { title: "{#blue}Logsets"}
        { title:"VoerkaLogger", tags:["#error"]  },
        { title:"FlexDecorators", comment:"{.tip}装饰器" },
        { title:"airplane"}
        { title:"{color:blue}ts", flag: "{color:blue}ts" }
    ]
`}/>

```
 