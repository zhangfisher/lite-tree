<template>
    <span class="richlabel" data-lite-tree :style="styled.style" :class="styled.classs" v-html="parseLinks(styled.value)"> </span>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import type { LiteTreeContext } from '@common/types';
import { LiteTreeContextId } from '@common/consts';
import { StyledString } from '@common/utils/styledString';
import { parseLinks } from '@common/utils/parseLinks';

const props = defineProps({
  value: {
    type: String,
    default: ''
  } 
});
const treeCtx = inject<LiteTreeContext>(LiteTreeContextId)!
const styled = StyledString(props.value,treeCtx.styles);
</script>
 