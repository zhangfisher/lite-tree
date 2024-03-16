
<template>
    <span v-if="value && String(value).trim().length>0" class="lite-tree-node-memo" :style="getMemoStyle(value)">{{getMemoValue(value) }}</span>    
</template>
  
<script setup lang="ts">
/**
    
节点备注

<Memo value="这是一个备注" />
// 可以是一个html片段
<Memo value="<span>ddd<span>" />
*/   
import { ref, computed, defineProps } from 'vue';

  
const props = defineProps({  
    value:{
        type: String, 
        default: ''
    }
});
  
const getMemoStyle = (memo:string)  => { 
     if(memo.startsWith('{') && memo.includes('}')){
        return memo.substring(1,memo.indexOf('}')).trim().toLowerCase()
     }else{
        return undefined
    }
}
const getMemoValue = (memo:string)  => { 
        if(memo.startsWith('{') && memo.includes('}')){
            return memo.substring(memo.indexOf('}')+1)
        }else{
            return memo
        }
    }
    
</script>
  
<script lang="ts">
  
  export default {}
  
  </script>
<style lang="less" scoped>
.lite-tree-node-memo {
    color: #aaa;
    margin-right: 4px;
}  
  
  </style>