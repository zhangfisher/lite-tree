<template>
    <span v-if="value && String(value).trim().length>0" class="lite-tree-node-memo" :style="memo.style">{{memo.value}}</span>    
</template>
  
<script setup lang="ts">
import { reactive,defineProps } from 'vue';
import { withStyleString } from './utils';
  
const props = defineProps({  
    value:{
        type: String, 
        default: ''
    }
});
  
const memo= reactive(withStyleString(props.value)) 

</script>

<script lang="ts">

export default {}
</script>
   
<style lang="less" bundle>
.lite-tree-node-memo {
    color: #aaa;
    margin-right: 4px;
}  
</style>
