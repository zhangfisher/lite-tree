<template>
    <span data-lite-tree class="icon" :class="icon.value" :style="icon.style"/>
</template>
<script setup lang="ts">
 
 import { inject, ref, watch, toRefs } from 'vue';  
import type { LiteTreeContext } from '@common/types';  
import { LiteTreeContextId } from '@common/consts';  
import { StyledString } from '@common/utils/styledString';  

const treeCtx = inject<LiteTreeContext>(LiteTreeContextId)!;  

const props = defineProps({  
  value: {  
    type: String,  
    default: ''  
  }   
})
  
const icon = ref(StyledString(props.value, treeCtx.styles));  
  
watch(props, (newVal) => {  
  icon.value = StyledString(newVal.value, treeCtx.styles);  
}, { immediate: true });  

</script>

<script lang="ts">  
export default {}
</script>
 