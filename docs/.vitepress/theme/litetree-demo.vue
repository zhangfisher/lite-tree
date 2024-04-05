<template>
    <div class="lite-tree-demo">
        <div class="header"><h5>渲染效果</h5></div>
        <LiteTree style="border:none">
{{ data }} 
        </LiteTree>
        <div class="toolbar" style="text-align:center">
            <span class="title">{{title}}</span>
            <button class="" @click="showCode = !showCode">显示源码</button>
        </div>
        <div class="lite-tree-demo code" v-if="showCode">
                <code>                    
                     {{ data }}
                </code>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import LiteTree from "../../../packages/vue"
import {} from "vitepress"

const props = defineProps({
  data: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: 'LiteTree Demo'
  },
});

const showCode = ref<boolean>(true)

</script>

<style scoped>
.lite-tree-demo {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
}
.lite-tree-demo >.header{
    padding: 10px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;

}
.lite-tree-demo .toolbar {
    display: flex;
    background-color: #f5f5f5;
    justify-content: space-between;
    padding: 10px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}
.lite-tree-demo .code{ 
    padding: 10px; 
    border:none;
}
.lite-tree-demo .code code{
    line-height: 120%;
    word-break: break-all;
}

</style>
 