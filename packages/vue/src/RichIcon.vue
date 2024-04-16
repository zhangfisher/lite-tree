<template>
    <span data-lite-tree class="icon" :class="icon.value" :style="icon.style"/>
</template>
<script setup lang="ts">
 
 import { inject, ref, watch ,computed} from 'vue';  
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
  
const icon = computed(()=>StyledString(props.value, treeCtx.styles));  
  

</script>

<script lang="ts">  
export default {}
</script>
 