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
import { StyledString } from '../common/styledString';

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
    const result = content.split(regex).map((s)=>{
        if(s.startsWith("[") && s.endsWith("]")){
            const link = s.match(/\((.*?)\)/)![1]
            const text = s.match(/\[(.*?)\]/)![1]
            return {link,text}
        }else{
            return s
        }
    })
    return result  
}

</script>

<script lang="ts">
export default {

}
</script>
