<template>
    <span v-if="value && String(value).trim().length>0" class="lite-tree-node-comment" :style="comment.style">{{comment.value}}</span>    
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
  
const comment= reactive(withStyleString(props.value)) 

</script>

<script lang="ts">

export default {}
</script>
   
<style lang="less" bundle>
.lite-tree-node-comment {
    color: #aaa;
    margin-right: 4px;
}  
</style>
