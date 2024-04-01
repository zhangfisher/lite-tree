<template>
    <span :style="styled.style" :class="styled.classs" v-html="parseLinks(styled.value)"> </span>
</template>
<script setup lang="ts">
/**
 
用来显示一个支持指定样式的字符串
"{css}I am a string with {css}style."
<Styled value="{css}I am a string with {css}style."/>

 */
import { inject } from 'vue';
import type { LiteTreeContext } from '@common/types';
import { LiteTreeContextId } from '@common/consts';
import { StyledString } from '@common/utils/styledString';

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
    const regex = /\[([^\[\]]*?)(\:(\w+))?\]\((([^\(\\\s)]+)(\s+[\w\u4e00-\u9fa5\w]+)?)\)/g
    const result = content.replace(regex,(matched,label,_1,icon,_2,link,tips)=>{
        return `<a style='display:inline-flex;align-items:center;' ${tips ? 'title='+tips : ''} class='action' target='_blank' href='${link}'>${icon ? `<span class='icon ${icon}'></span>`:''}${label}</a>`
    })       
    return result  
}

</script>

<script lang="ts">
export default {

}
</script>../../common/consts