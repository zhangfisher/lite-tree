# LiteTree

[中文](./readme_CN.md) |  [English](./readme.md)

[Document](https://zhangfisher.github.io/lite-tree/)

`LiteTree` is a lightweight and compact tree component, including `@lite-tree/react` and `@lite-tree/vue` two packages. It is designed to display trees more conveniently in static websites such as `vitepress/dumi`.

We know that there are many tree components. In general, they use `JSON` to describe trees. Because the `JSON` format is not very friendly in Markdown, `LiteTree` uses an indentation format similar to `YAML`, which is very suitable for use in `Markdown`.

**Features:**
- Small size, does not depend on any third-party libraries
- Includes React/Vue two versions
- Supports `lite` format, very suitable for use in Markdown
- Pass tree data through `slot/children` by default, very convenient
- Supports custom node styles, labels, notes, icons, etc.
- Supports non-standard `JSON` data, with good fault tolerance

## Installation

- **React**

```bash
npm install @lite-tree/react
// or
yarn add @lite-tree/react
// or
pnpm add @lite-tree/react
```

- **Vue**

```bash
npm install @lite-tree/vue
// or
yarn add @lite-tree/vue
// or
pnpm add @lite-tree/vue
```


## Usage

Take the use in `vitepress` as an example.

- **Step 1: Configuration**

Configure `Vue` parameters in `.vitepress/config.mts` as follows:

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
- **Step 2: Register the component**

Register `LiteTree` as a global component so that it can be used anywhere.

```ts
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import { LiteTree } from '@lite-tree/vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register custom global components
    app.component('LiteTree'，LiteTree)  
  }
}
``` 

- **Step 3: Usage** 

In `.md` file.

```md
<LiteTree>
#error=color:red;border: 1px solid red;background:#ffd2d2;padding:2px;
#blue=color:red;border: 1px solid blue;background:#e6e6ff;padding:2px;
airplane=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjM1LjU4IDEyOC44NEwxNjAgOTEuMDZWNDhhMzIgMzIgMCAwIDAtNjQgMHY0My4wNmwtNzUuNTggMzcuNzhBOCA4IDAgMCAwIDE2IDEzNnYzMmE4IDggMCAwIDAgOS41NyA3Ljg0TDk2IDE2MS43NnYxOC45M2wtMTMuNjYgMTMuNjVBOCA4IDAgMCAwIDgwIDIwMHYzMmE4IDggMCAwIDAgMTEgNy40M2wzNy0xNC44MWwzNyAxNC44MWE4IDggMCAwIDAgMTEtNy40M3YtMzJhOCA4IDAgMCAwLTIuMzQtNS42NkwxNjAgMTgwLjY5di0xOC45M2w3MC40MyAxNC4wOEE4IDggMCAwIDAgMjQwIDE2OHYtMzJhOCA4IDAgMCAwLTQuNDItNy4xNk0yMjQgMTU4LjI0bC03MC40My0xNC4wOEE4IDggMCAwIDAgMTQ0IDE1MnYzMmE4IDggMCAwIDAgMi4zNCA1LjY2TDE2MCAyMDMuMzF2MTYuODdsLTI5LTExLjYxYTggOCAwIDAgMC01Ljk0IDBMOTYgMjIwLjE4di0xNi44N2wxMy42Ni0xMy42NUE4IDggMCAwIDAgMTEyIDE4NHYtMzJhOCA4IDAgMCAwLTkuNTctNy44NEwzMiAxNTguMjR2LTE3LjNsNzUuNTgtMzcuNzhBOCA4IDAgMCAwIDExMiA5NlY0OGExNiAxNiAwIDAgMSAzMiAwdjQ4YTggOCAwIDAgMCA0LjQyIDcuMTZMMjI0IDE0MC45NFoiLz48L3N2Zz4=
ts=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTUgMTUiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBkPSJNMTIuNSA4di0uMTY3YzAtLjczNi0uNTk3LTEuMzMzLTEuMzMzLTEuMzMzSDEwYTEuNSAxLjUgMCAxIDAgMCAzaDFhMS41IDEuNSAwIDAgMSAwIDNoLTFBMS41IDEuNSAwIDAgMSA4LjUgMTFNOCA2LjVIM20yLjUgMFYxM00uNS41aDE0djE0SC41eiIvPjwvc3ZnPg==
---
- [airplane]Company A({color:red;}Key,{#blue}Urgent)          //   Company Name
    Administrative Center
        {color:red;font-weight:bold;background:#ffeaea}President's Office
        [checked]Human Resources Department
        [unchecked]{.blue}Finance Department
        Administrative Department        //+  Responsible for administrative management
        Legal Department                //+  Litigation, etc.
        [airplane]Audit Department      //+  Audit finance[Save:tag](sss) [Link](sss)
        Information Center              // Key[Save](www.baidu.com)[tag][Link:tag](www.baidu.com)
        [star]Sec[star]ur[star]ity[star] and [star]Pro[star]tection[star] Department[star]                //{color:red}   Confidentiality work
    + Market Center    
        Marketing Department({#error}Error,"{#warning}Warning")
        Sales Department                //-
        Customer Service Department     //-
        {#blue}Brand Department         //   this is cool
        Market Planning Department      //!  Key
        Market Marketing Department     // {.blue}this is cool
    R&D Center
        Mobile R&D Department           //! 
        Platform R&D Department({success}Java,{error}Go)
        {.success}Testing Department
        Operations Department
        Product Department                //*
        Design Department                 //*
        Project Management Department     //*
</LiteTree>     


```

**Rendered effect:**

![](./docs/tree.png)


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
- [Tree Component- LiteTree](https://github.com/zhangfisher/lite-tree)