<template>
  <span v-if="styledStrs.length>0">
    <span v-for="[value,css] of styledStrs" :style="[css]">{{value}}</span>
  </span> 
</template>
<script setup lang="ts">
/**
 
用来显示一个支持指定样式的字符串
"{css}I am a string with {css}style."
<Styled value="{css}I am a string with {css}style."/>

 */
import { defineProps,inject } from 'vue';
import { parseStyledString } from '../utils';
import type { LiteTreeContext } from './types';
import { LiteTreeContextId } from './consts';

const props = defineProps({
  value: {
    type: String,
    default: ''
  } 
});
const treeCtx = inject<LiteTreeContext>(LiteTreeContextId)!
const styledStrs = parseStyledString(props.value,treeCtx.styles);

</script>

<script lang="ts">
export default {

}
</script>
