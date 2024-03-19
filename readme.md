# LiteTree

[中文](./readme_CN.md)
[English)(./readme.md)

`LiteTree` is a very simple `vue` tree component, which is designed to make it easier to display tree structures in `vitepress`.

We know that there are many `Vue` tree components, but in general, when using these components on `vitepress`, there are some problems, such as style conflicts, excessive volume, and too many functions, which are not suitable for the display of `VitePress` which is mainly for display.

So, I developed this very simple `vue` tree component, which has the following features:

- Small size, no dependency on any third-party library
- Simple style, small function
- Tree data is passed through the default `slot`, which is very convenient
- The tree data has good fault tolerance
- Support custom node styles, tags, notes, etc.


## Installation

```bash
npm install lite-tree
// or
yarn add lite-tree
// or
pnpm add lite-tree
```

## Usage

Use in `vitepress`.

```md
<script setup>
import Tree from 'lite-tree'
</script>

<Tree>
    {
        title: "A Company",
        expend: true,
        children:[          
        {
            title: "Administrative Center",
            children:[
                {title: "{color:red;font-weight:bold;}CEO Office"},
                {title: "Human Resources Department",tags:['{color:red;}Key','{success}Urgent']},
                {title: "Finance Department",mark:"success"},                
                {title: "Administrative Department"},
                {title: "Legal Department",mark:"warning"},
                {title: "Audit Department",style:"font-size:16px;font-style:italic"},
                {title: "Information Center",memo:"备用"},
                {title: "Security Department",memo:"{color:red}+"}
            ]
        },
        { 
            title: "Market Center",
            children:[
                {title: "Marketing Department",mark:"info",tags:['{error}Error','{warning}Warning']},
                {title: "Sales Department"},
                {title: "Customer Service Department"},
                {title: "Brand Department",mark:'error'},
                {title: "Market Planning Department"},
                {title: "Market Marketing Department",memo:"Good",tags:["{info}ddddd"]}
            ]
        },
        {
            title: "R&D Center",
            children:[
                {title: "Mobile R&D Department",mark:"warning"},
                {title: "Test Department"},
                {title: "Operation and Maintenance Department",mark:"success"},
                {title: "Product",mark:"success"},
                {title: "Design Department"},                
            ]
        }
        ]
    }
</Tree>

```


The final rendering effect is as follows:

![](./docs/tree.png)


## Explain

- The tree data is passed through the default `slot`, which is very convenient.
- The tree data format can be `JSON` and has a certain fault tolerance:
    - The node `Key` can be wrapped in `"..."` or `'...'`, or omitted.
    - The string `Value` can be wrapped in `"..."` or `'...'`.
    - If you accidentally miss the `,`, it can also be completed.
    
- The node data declaration is as follows:

```json
{
    "title": "A Company",       // Node title, for display

    "open": true,           // Whether to expand

    "style": "color:red",   // node css style
    "mark": "success",      //  `success`、`info`、`warning`、`error`
    "tags": ["",""],        // 
    "children":[
        // ...
    ]
}
```

- The node `title`, `mark` or `tags` string is prefixed with `{...}` to declare `css` style, such as `tags:["{color:red;font-weight:bold;}OK","{color:blue}+"]` means `OK` is red and bold, `+` is blue.
- Each node can be pre-marked with `mark`, with values of `success`, `info`, `warning`, `error`, which are rendered in different colors.
- Each node can be pre-tagged with `tags`, and the tags are rendered in different colors.
- Each node can be pre-marked with `memo`, which is rendered in different colors.
- The node can declare `css` style through `style`.
- suppoer event? Not support yet, because this component is mainly used in the `vitepress` static page for static display, so it does not support events for the time being.


## Recommendation

- [Internationalization Solution for React/Vue/Nodejs/Solidjs - VoerkaI18n](https://zhangfisher.github.io/voerka-i18n/)
- [React Form Development Library - speedform](https://zhangfisher.github.io/speed-form/)
- [Terminal Interface Development Enhancement Library - Logsets](https://zhangfisher.github.io/logsets/)
- [Log Output Library  - VoerkaLogger](https://zhangfisher.github.io/voerkalogger/)
- [Decorator Development - FlexDecorators](https://zhangfisher.github.io/flex-decorators/)
- [Finite State Machine Library  - FlexState](https://zhangfisher.github.io/flexstate/)
- [Universal Function Tool Library - FlexTools](https://zhangfisher.github.io/flex-tools/)
- [CSS-IN-JS Library  - Styledfc](https://zhangfisher.github.io/styledfc/)
- [VSCode Plugin for Adding Comments to JSON Files - json_comments_extension](https://github.com/zhangfisher/json_comments_extension)
- [Library for Developing Interactive Command Line Programs  - mixed-cli](https://github.com/zhangfisher/mixed-cli)
- [Powerful String Interpolation Variable Processing Tool Library - flexvars](https://github.com/zhangfisher/flexvars)
- [Frontend Link Debugging Assistant Tool - yald](https://github.com/zhangfisher/yald)
- [Asynchronous Signal - asyncsignal](https://github.com/zhangfisher/asyncsignal)
- [bundle Vue styles into JavaScript - vite-plugin-vue-style-bundler ](https://github.com/zhangfisher/vite-plugin-vue-style-bundler)
- [Vue Tree Component- LiteTree](https://github.com/zhangfisher/lite-tree)