 
<template> 
  <main> 
    <!-- <LiteTree format="json">
      {
        title: "A公司",   
        expend: true,
        children:[          
          {
            title: "行政中心",
            children:[
              {title: "{color:red;font-weight:bold;}总裁办",mark:"success"},
              {title: "人力资源部",tags:['{color:red;}重点','{success}紧急']},
              {title: "财务部"},
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
              {title: "{.primary}移动研发部",mark:"warning"},
              {title: "平台研发部",tags:["{success}Java","{error}Go"]},
              {title: "测试部"},
              {title: "运维部",prefix:"{color:red;}+"},
              {title: "产品部",mark:"success"},
              {title: "设计部",diff:"modify"},
              {title: "项目管理部",comment:"{color:red;}+",diff:"modify"}
            ]

          }
        ]
      }      
    </LiteTree>  -->
    
    <button @click="toggleTree">显示/隐藏树</button>
    <LiteTree v-if="isShowTree">
#error=color:red;border: 1px solid red;background:#ffd2d2;padding:2px;
#blue=color:red;border: 1px solid blue;background:#e6e6ff;padding:2px;
---
- A公司({color:red;}重点,{#blue}紧急)          //   企业名称
    行政中心
        {color:red;font-weight:bold;background:#ffeaea}总裁办
        人力资源部
        {.blue}财务部
        行政部        //+  负责行政管理
        [x]法务部        //+  打官司等
        []审计部        //+  审计财务[保存](sss) [连接](sss)
        信息中心      // {#blue}重点[保存](www.baidu.com) [连接](www.baidu.com)
        安全保卫部    //   保密工作
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
  </main>
</template>
<script setup lang="ts">  
import LiteTree from '../../../src/vue/index.vue' 
import { ref } from "vue";

const isShowTree = ref<boolean>(true)
const toggleTree = ()=>isShowTree.value=!isShowTree.value


</script>

<style scoped>
main{
  width:800px;
  text-align: center;
  margin: 0 auto;
}
</style>
