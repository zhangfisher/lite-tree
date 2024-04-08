 
<template> 
<div class="app" :class="isDark ? 'dark' : ''">
  <main > 
     <LiteTree format="json">
      {
        title: "A公司([官网](https://github.com/zhangfisher 点击访问))",   
        open: true,
        comment:"[主页](https://github.com/zhangfisher)",
        children:[          
          {
            title: "行政中心",
            children:[
              {title: "{color:red;font-weight:bold;}总裁办"},
              {title: "人力资源部",tags:['{color:red;}重点','{success}紧急']},
              {title: "财务部",comment:"单击[访问](https://github.com/zhangfisher/lite-tree)"},
              {title: "行政部",diff:'add'},
              {title: "法务部",diff:'add'},
              {title: "审计部",diff:'add'},
              {title: "信息中心",comment:"备用"},
              {title: "安全保卫部",comment:"{color:red}+",style:"font-size:16px;font-style:italic"} 
            ]
          },
          { 
            title: "市场中心",
            open:false,
            children:[
              {title: "市场部",tags:['{error}出错','{warning}警告']},
              {title: "销售部",diff:'delete'},
              {title: "客服部",diff:'delete'},
              {title: "品牌部",diff:"delete"},
              {title: "市场策划部"},
              {title: "市场营销部",comment:"好",tags:["{info}ddddd"]}
            ]
          },
          {
            title: "研发中心",
            children:[
              {title: "{.primary}移动研发部"},
              {title: "平台研发部",tags:["{success}Java","{error}Go"]},
              {title: "测试部"},
              {title: "运维部"},
              {title: "产品部"},
              {title: "设计部",diff:"modify"},
              {title: "项目管理部",comment:"{color:red;}+",diff:"modify"}
            ]

          }
        ]
      }      
    </LiteTree> 
    
    <button @click="toggleTree">显示/隐藏树</button>
    <button @click="toggleDark">切换暗色模式</button>
    <LiteTree v-if="isShowTree">
#error=color:red;border: 1px solid red;background:#ffd2d2;padding:2px;
#blue=color:red;border: 1px solid blue;background:#e6e6ff;padding:2px;
airplane=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjM1LjU4IDEyOC44NEwxNjAgOTEuMDZWNDhhMzIgMzIgMCAwIDAtNjQgMHY0My4wNmwtNzUuNTggMzcuNzhBOCA4IDAgMCAwIDE2IDEzNnYzMmE4IDggMCAwIDAgOS41NyA3Ljg0TDk2IDE2MS43NnYxOC45M2wtMTMuNjYgMTMuNjVBOCA4IDAgMCAwIDgwIDIwMHYzMmE4IDggMCAwIDAgMTEgNy40M2wzNy0xNC44MWwzNyAxNC44MWE4IDggMCAwIDAgMTEtNy40M3YtMzJhOCA4IDAgMCAwLTIuMzQtNS42NkwxNjAgMTgwLjY5di0xOC45M2w3MC40MyAxNC4wOEE4IDggMCAwIDAgMjQwIDE2OHYtMzJhOCA4IDAgMCAwLTQuNDItNy4xNk0yMjQgMTU4LjI0bC03MC40My0xNC4wOEE4IDggMCAwIDAgMTQ0IDE1MnYzMmE4IDggMCAwIDAgMi4zNCA1LjY2TDE2MCAyMDMuMzF2MTYuODdsLTI5LTExLjYxYTggOCAwIDAgMC01Ljk0IDBMOTYgMjIwLjE4di0xNi44N2wxMy42Ni0xMy42NUE4IDggMCAwIDAgMTEyIDE4NHYtMzJhOCA4IDAgMCAwLTkuNTctNy44NEwzMiAxNTguMjR2LTE3LjNsNzUuNTgtMzcuNzhBOCA4IDAgMCAwIDExMiA5NlY0OGExNiAxNiAwIDAgMSAzMiAwdjQ4YTggOCAwIDAgMCA0LjQyIDcuMTZMMjI0IDE0MC45NFoiLz48L3N2Zz4=
ts=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTUgMTUiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBkPSJNMTIuNSA4di0uMTY3YzAtLjczNi0uNTk3LTEuMzMzLTEuMzMzLTEuMzMzSDEwYTEuNSAxLjUgMCAxIDAgMCAzaDFhMS41IDEuNSAwIDAgMSAwIDNoLTFBMS41IDEuNSAwIDAgMSA4LjUgMTFNOCA2LjVIM20yLjUgMFYxM00uNS41aDE0djE0SC41eiIvPjwvc3ZnPg==
---
- [airplane]A公司({color:red;}重点,{#blue}紧急)          //   企业名称
    行政中心
        {color:red;font-weight:bold;background:#ffeaea}总裁办
        [checked]人力资源部
        [unchecked]{.blue}财务部
        行政部        //+  负责行政管理
        法务部        //+  打官司等
        [airplane]审计部        //+  审计财务[保存:tag](sss) [连接](sss)
        信息中心      // 重点[保存](www.baidu.com)[tag][连接:tag](www.baidu.com)
        [star]安全保卫部    //   保密工作
    + 市场中心    
        市场部({#error}出错,"{#warning}警告")
        销售部            //-
        客服部            //-
        {#blue}品牌部            //   this is cool
        市场策划部    //!  重点
        市场营销部        // {.blue}this is cool
    研发中心
        移动研发部      //!
        平台研发部({success}Java,{error}Go)
        {.success}测试部
        运维部
        产品部            //*
        设计部            //*
        项目管理部        //*
    </LiteTree>   

    <h4>使用data传入</h4>

<LiteTree :data="treeData"></LiteTree>
  </main>
</div>
</template>
<script setup lang="ts">  
import {LiteTree} from '@lite-tree/vue' 
import { ref } from "vue";

const isShowTree = ref<boolean>(true)
const isDark = ref<boolean>(false)
const toggleTree = ()=>isShowTree.value=!isShowTree.value
const toggleDark = ()=>isDark.value=!isDark.value

const treeData =`
#error=color:red;border: 1px solid red;background:#ffd2d2;padding:2px;
#blue=color:red;border: 1px solid blue;background:#e6e6ff;padding:2px;
airplane=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjM1LjU4IDEyOC44NEwxNjAgOTEuMDZWNDhhMzIgMzIgMCAwIDAtNjQgMHY0My4wNmwtNzUuNTggMzcuNzhBOCA4IDAgMCAwIDE2IDEzNnYzMmE4IDggMCAwIDAgOS41NyA3Ljg0TDk2IDE2MS43NnYxOC45M2wtMTMuNjYgMTMuNjVBOCA4IDAgMCAwIDgwIDIwMHYzMmE4IDggMCAwIDAgMTEgNy40M2wzNy0xNC44MWwzNyAxNC44MWE4IDggMCAwIDAgMTEtNy40M3YtMzJhOCA4IDAgMCAwLTIuMzQtNS42NkwxNjAgMTgwLjY5di0xOC45M2w3MC40MyAxNC4wOEE4IDggMCAwIDAgMjQwIDE2OHYtMzJhOCA4IDAgMCAwLTQuNDItNy4xNk0yMjQgMTU4LjI0bC03MC40My0xNC4wOEE4IDggMCAwIDAgMTQ0IDE1MnYzMmE4IDggMCAwIDAgMi4zNCA1LjY2TDE2MCAyMDMuMzF2MTYuODdsLTI5LTExLjYxYTggOCAwIDAgMC01Ljk0IDBMOTYgMjIwLjE4di0xNi44N2wxMy42Ni0xMy42NUE4IDggMCAwIDAgMTEyIDE4NHYtMzJhOCA4IDAgMCAwLTkuNTctNy44NEwzMiAxNTguMjR2LTE3LjNsNzUuNTgtMzcuNzhBOCA4IDAgMCAwIDExMiA5NlY0OGExNiAxNiAwIDAgMSAzMiAwdjQ4YTggOCAwIDAgMCA0LjQyIDcuMTZMMjI0IDE0MC45NFoiLz48L3N2Zz4=
ts=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTUgMTUiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBkPSJNMTIuNSA4di0uMTY3YzAtLjczNi0uNTk3LTEuMzMzLTEuMzMzLTEuMzMzSDEwYTEuNSAxLjUgMCAxIDAgMCAzaDFhMS41IDEuNSAwIDAgMSAwIDNoLTFBMS41IDEuNSAwIDAgMSA4LjUgMTFNOCA2LjVIM20yLjUgMFYxM00uNS41aDE0djE0SC41eiIvPjwvc3ZnPg==
---
{ 
    title:"A公司",
    icon:"airplane",
    comment:"企业名称",
    tags:["{color:red;}重点","{#blue}紧急)"]
    children:[
        {   title:"行政中心",
            children:[
                { title:"{color:red;font-weight:bold;background:#ffeaea}总裁办" },
                { title: "人力资源部", icon: "checked"},
                { title: "{.blue}财务部", icon: "unchecked"},
                { title: "行政部", diff: "+"},
                { title: "法务部", diff: "+"},
                { title: "审计部", diff: "+",icon: "airplane"},
                { title: "信息中心", comment: "重点[保存](www.baidu.com)[tag][连接:tag](www.baidu.com)"},
                { title: "安全保卫部",icon: "star", comment: "保密工作", style: "{color:red}" }
            ]
        },
        {
            title:"市场中心",
            open:false,
            chidlren:[
                { title: "市场部", tags: ["{#error}出错","{#warning}警告"]},
                { title: "销售部", diff: "-"},
                { title: "客服部", diff: "-"},
                { title: "{#blue}品牌部", diff: "-",comment:"this is cool"},
                { title: "市场策划部", flag:"!",comment:"重点"},
                { title: "市场营销部", comment: "{.blue}this is cool"}            
            ]
        },
        {
            title:"研发中心",
            children:[
                { title: "移动研发部", flag: "!"},
                { title: "平台研发部", tags: ["{success}Java","{error}Go"]},
                { title: "{.success}测试部"},
                { title: "运维部"},
                { title: "产品部", diff: "*"},
                { title: "设计部", diff: "*"},
                { title: "项目管理部", diff: "*"}
            ]
        }
    ]
}
`
</script>

<style scoped>
main{
  width:800px;
  text-align: center;
  margin: 0 auto;
}
.app{
  position: fixed;
  top:0px;
  left:0px;
  width: 100%;
  height: 100%;
  padding: 20px;
  
  overflow-y: auto;
}
.app.dark{
  background-color: #1a1a1a;
}
</style>
