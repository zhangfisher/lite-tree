<template>
  <ul :class="['lite-tree-nodes',{'root':root}]">
    <li v-for="node in nodes" :key="node.id || node.title" >
      <span class="lite-tree-node"
        :class="[getDiffClass(node.diff),node.mark]"
        @click="toggleNode(node)"
        :style="node.style"
      >
        <span class="prefix" v-if="prefix" >{{ withStyleString(node.prefix!).value }}</span>
        <span  v-if="diff" class="diff">{{ getDiffChar(node.diff) }}</span>
        <span class="indent" :style="{width:indent+'px'}"></span>
        <span :class="hasChildren(node) ? ['arrow',{open:node.open==undefined ? true : node.open}] : null"></span>       
        <span class="icon"></span>
        <span class="title" :style="withStyleString(node.title).style">{{ withStyleString(node.title).value }}</span>
        <Comment :value="node.comment"/>
        <Tag v-for=" tag in node.tags" :key="tag" :value="tag"/>        
      </span>      
      <SlideUpDown :active="isOpen(node)" :duration="200">
        <LiteTree v-if="hasChildren(node) && isOpen(node) && !hasError" 
          :root="false"
          :indent="indent+20"
          :prefix="prefix"
          :diff="diff"
          :class="isOpen(node) ? 'open' : 'close'"
        >
          {{ node.children }}
        </LiteTree>
    </SlideUpDown>
    </li>    
  </ul>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref, useSlots,withDefaults } from 'vue';
import { safeParseJson } from "./utils";
import type { LiteTreeNode } from './types';
import Comment from './Comment.vue';
import Tag from './Tag.vue';
import { withStyleString } from './utils';
// @ts-ignore
import SlideUpDown from 'vue-slide-up-down'

interface LiteTreeProps {
  root: boolean;
  indent: number;
  prefix: boolean;
  diff: boolean;
  format: 'json' | 'ltf';
}
const props = withDefaults(defineProps<LiteTreeProps>(),{  
  root: true,
  indent:0,
  prefix:false,  
  diff:false,
  format:'json'
});

const toggleNode = (node: LiteTreeNode): void => {
  node.open =node.open==undefined ? false : !node.open;
};
const hasChildren = (node: LiteTreeNode): boolean=>{
  return Array.isArray(node.children) && node.children.length > 0;
};

const isOpen = (node: LiteTreeNode): boolean=>{
  return node.open==undefined ? true : node.open;
};

const diffChars:Record<string,string> = {add:"+",delete:"-",modify:'*'}
const getDiffChar = (c: string | undefined): string=>{
  if(!c) return '';
  return c in diffChars ? diffChars[c] :'';
};

const getDiffClass = (c: string | undefined): string=>{
  if(!c) return '';
  if(c=='+') return 'diff-add';
  if(c=='-') return 'diff-delete';
  if(c=='*') return 'diff-modify';
  return c in diffChars ? 'diff-'+c :'';
};

const hasError = ref<boolean>(false);  

const slots = useSlots();




// 返回默认插槽的内容字符串
const getDefaultSlot = ()=>{
  const slotContent = slots.default?.()[0];
  if (slotContent && typeof slotContent.children === 'string') {
    const content = slotContent.children.trim();
    // 分解出样式和内容,之间采用---分割
    if(content.includes('---')){
      const [styleMacros,treeContent] = content.split('---');
      return [styleMacros,treeContent]
    }
    return content;
  }else{
    return ['','']
  }
}

let nodes:LiteTreeNode[] = []
if(slots.default){
  const [vars,treeData] = getDefaultSlot();
  if(treeData){
        try {
          nodes =  safeParseJson(treeData,(key,value)=>{
            if(typeof(value)=='object' && !Array.isArray(value)){
              value.open = value.open==undefined ? true : value.open;
            }
            return value;          
          });
          hasError.value=false
          nodes =  reactive(Array.isArray(nodes) ? nodes : [nodes])
        } catch (error) {
          hasError.value=true;
          nodes =[{title:"Invalid JSON data provided to LiteTree",mark:'error'}]       
        }
    }
  } 
 

</script>

<script lang="ts">

export default {
  name: 'LiteTree'
}

</script>
<style bundle lang="less" >

.lite-tree-nodes {
  color: #555;
  display: flex;
  flex-direction: column;
  list-style: none!important;;  
  padding: 0;
  &.root{
    padding: 8px;
    border: 1px solid #eee;
    
  }
  > li{
    width: 100%;
  }
  .open{
    transition: height 0.3s;  
    height: auto;      
  }
  .close{
    transition: height 0.3s;  
    height: 0;  
    overflow: hidden; 
  }

  .diff{    
    width: 24px;
    text-align: center;
    height: 100%;
  }
  
  .diff-add{
    background-color: #f3ffec;
    color:green;
  }
  .diff-modify{
    background-color: #fff6e9;
    color:orange;
  }
  .diff-delete{
    background-color: #ffeaea;
    color:red
  }

  span.lite-tree-node{
    cursor: pointer;
    display: flex;
    width: 100%;
    padding:4px;
    margin:0px;     
    align-items: center;

    &.success{
      background-color: #f3ffec;
      color:green;
    }
    &.warning{
      background-color: #fff6e9;
      color:orange;
    }
    &.error{
      background-color: #ffeaea;
      color:red
    }
    &.info{
      background-color: #f5f5f5;

    }
    .prefix{
      width: 24px; 
      text-align: center;
      overflow: hidden; 
      height:100%;
    }
    .title{
      flex-grow: 1;
    } 
    .arrow{
      width: 20px;
      height:10px;  
      border-left: 10px solid #999;   
      border-right: 10px solid transparent;  
      border-bottom: 5px solid transparent;   
      border-top: 5px solid transparent;  
      transform-origin: 5px center;
      transform: rotate(0deg);
      transition: all 0.2s;
      &.open{
        transform-origin: 5px center;
        transform: rotate(90deg);
        transition: all 0.2s;
      }     
    } 
    .comment{
      color: #aaa;    
    }
 
    &:hover{
       background-color: #f8f8f8;       
       border-radius: 4px;
    } 
  }
}  
</style> 