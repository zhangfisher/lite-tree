<template>
    <span :style="styled.style" :class="styled.classs">{{styled.value}}</span>
</template>
<script setup lang="ts">
/**
 
用来显示一个支持指定样式的字符串
"{css}I am a string with {css}style."
<Styled value="{css}I am a string with {css}style."/>

 */
import { defineProps,inject } from 'vue';
import type { LiteTreeContext } from './types';
import { LiteTreeContextId } from './consts';
import { StyledString } from '../utils';

const props = defineProps({
  value: {
    type: String,
    default: ''
  } 
});
const treeCtx = inject<LiteTreeContext>(LiteTreeContextId)!
const styled = StyledString(props.value,treeCtx.styles);
</script>

<script lang="ts">
export default {

}
</script>
