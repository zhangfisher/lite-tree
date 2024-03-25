<template>
  <ul :class="['lite-tree-nodes',{'root':root}]">
    <li v-for="(node,index) in nodes" :key="index" >
      <span class="lite-tree-node"
        :class="[getDiffClass(node.diff)]"
        @click="toggleNode(node)"
        :style="node.style"
        :data-diff="node.diff"
      >
        <!-- <span  v-if="diff" class="diff">{{ getDiffChar(node.diff) }}</span> -->
        <span class="indent" :style="{width:indent+'px'}"></span>
        <span :class="hasChildren(node) ? ['arrow',{open:node.open==undefined ? true : node.open}] : null"></span>       
        <span class="icon"></span>
        <StyledSpan class="title" :value="node.title"/>
        <StyledSpan class="comment" :value="node.comment"/>
        <StyledSpan class="tag" v-for=" tag in node.tags" :key="tag" :value="tag"/>        
      </span>      
      <SlideUpDown :active="isOpen(node)" :duration="200">
        <LiteTree v-if="hasChildren(node) && isOpen(node) && !hasError" 
          :root="false"
          :indent="indent+20"
          :format="format"
          :diff="diff"
          :class="isOpen(node) ? 'open' : 'close'"
          :vars="vars"
          :icons="icons"
          :children="node.children"
        >
        </LiteTree>
    </SlideUpDown>
    </li>    
  </ul>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref, useSlots,withDefaults } from 'vue';
import type { LiteTreeNode } from './types';
import StyledSpan from './StyledSpan.vue';
// @ts-ignore
import SlideUpDown from 'vue-slide-up-down'
import { parseTree } from './parser';

interface LiteTreeProps {
  root?: boolean;
  indent?: number;
  diff?: boolean;
  format?: 'json' | 'simple';
  vars?: Record<string, string>;
  icons?: Record<string, string>;
  children?: LiteTreeNode[];
}
const props = withDefaults(defineProps<LiteTreeProps>(),{  
  root: true,
  indent:0,
  diff:false, 
  format:'simple'
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
const getDiffChar = (c: string | undefined): string=>{
  if(!c) return '';
  return c in diffChars ? diffChars[c] :'';
};

const getDiffClass = (c: string | undefined): string=>{
  if(!c) return '';
  let r = '' 
  if(c=='+') {
    r='diff-add'
  }else if(c=='-'){
    r ="diff-delete"
  }else if(c=='*'){
    r ="diff-modify"
  }
  return r.length > 0 ? "diff " + r : ''
};

const hasError = ref<boolean>(false);  

const slots = useSlots();

// 返回默认插槽的内容字符串
const parseSlotTree = ()=>{
  const slotContent = slots.default?.()[0];
  if (slotContent && typeof slotContent.children === 'string') {
    return parseTree(slotContent.children,{format:props.format})
  }else{
    return {styles:{},icons:{},treeData:[]}
  }
}

let nodes:LiteTreeNode[] = []

if(props.root){
  let styles:Record<string,string> ={}
  let icons:Record<string,string> ={}
  if(slots.default){
        try {
          const result = parseSlotTree();
          nodes =  result.treeData
          styles = result.styles
          icons = result.icons
          hasError.value=false
          nodes =  reactive(Array.isArray(nodes) ? nodes : [nodes])
        } catch (error) {
          hasError.value=true;
          // @ts-ignore
          nodes =[{title:"Invalid JSON data provided to LiteTree",style:'color:red'}]       
        }
    } 
}else{
  nodes = props.children || []
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
  text-align: left;
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
    &>.title{
      flex-grow: 1;
    } 
    &>.tag{
        background-color: #eee;
        color: #333;
        padding: 2px 4px;
        border-radius: 4px;
        border: 1px solid #ddd;
        margin-left: 2px;
        margin-right: 2px;
        font-size: 12px;
    }
    &>.comment{
      color: #aaa;    
    }

    &.diff{     
      height: 100%;
    }
    &.diff:before{
      content: attr(data-diff);        
    }
    &.diff-add{
      background-color: #f3ffec;
      color:green;
    }
    &.diff-modify{
      background-color: #fff6e9;
      color:orange;
    }
    &.diff-delete{
      background-color: #ffeaea;
      color:red
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
    
 
    &:hover{
       background-color: #f8f8f8;       
       border-radius: 4px;
    } 
  }
}  
</style> 