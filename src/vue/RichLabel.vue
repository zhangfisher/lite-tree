<template>
    <span :style="styled.style" :class="styled.classs" v-html="parseLinks(styled.value)"> </span>
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

/**
 * 解析字符串里面的链接,如"I am a string with [link](www.baidu.com),is cool"
 * 返回
 * ["I am a string with ",{link:"www.baidu.com",text:"link"},"is cool"]
 * @param content 
 */
const parseLinks =(content:string)=>{
    const regex = /\[(.*?)\]\((.*?)\)/g;
    const result = content.replace(regex,(matched,label,link)=>{
        return `<a class='action' target='_blank' href='${link}'>${label}</a>`
    })
    return result  
}

</script>

<script lang="ts">
export default {

}
</script>
