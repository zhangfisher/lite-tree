<script setup lang="ts">
import LiteTree from '../../src/index.vue'

</script>

<template> 
  <main>
    <LiteTree>
      {
        title: "A公司",
        expend: true,
        children:[          
          {
            title: "行政中心",
            children:[
              {title: "{color:red;font-weight:bold;}总裁办"},
              {title: "人力资源部",tags:['{color:red;}重点','{success}紧急']},
              {title: "财务部",mark:"success"},
              {title: "行政部"},
              {title: "法务部",mark:"warning"},
              {title: "审计部",style:"font-size:16px;font-style:italic"},
              {title: "信息中心",memo:"备用"},
              {title: "安全保卫部",memo:"{color:red}+"}
            ]
          },
          { 
            title: "市场中心",
            children:[
              {title: "市场部",mark:"info",tags:['{error}出错','{warning}警告']},
              {title: "销售部"},
              {title: "客服部"},
              {title: "品牌部",mark:'error'},
              {title: "市场策划部"},
              {title: "市场营销部",memo:"好",tags:["{info}ddddd"]}
            ]
          },
          {
            title: "研发中心",
            children:[
              {title: "移动研发部",mark:"warning"},
              {title: "平台研发部",tags:["{success}Java","{error}Go"]},
              {title: "测试部"},
              {title: "运维部"},
              {title: "产品部",mark:"success"},
              {title: "设计部"},
              {title: "项目管理部",memo:"{color:red;}+"}
            ]

          }
        ]
      }      
    </LiteTree> 
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
