<template>
    <span :style="styled.style">{{ styled.value}}</span>
</template>
<script setup lang="ts">
/**
 
  用来显示一个支持指定样式的字符串

  "{css}I am a string with style."

<StyledString value="{css}I am a string with style."/>

 */
import { defineProps } from 'vue';
import { withStyleString } from './utils';

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
});

const styled = withStyleString(props.value);


</script>
