<template>
  <ul :class="['lite-tree-nodes',{'root':root}]">
    <li v-for="(node,index) in nodes" :key="index" >
      <span class="lite-tree-node"
        :class="[getDiffClass(node.diff)]"
        @click="toggleNode(node)"
        :style="node.style" 
      >
        <span class="diff" v-if="hasDiff">{{ node.diff }}</span>
        <span class="indent" :style="{width:indent+'px'}"></span>
        <span :class="hasChildren(node) ? ['indicate',{open:node.open==undefined ? true : node.open}] : null"></span>       
        <span class="icon"></span>
        <StyledSpan class="title" :value="node.title" :vars="vars"/>
        <StyledSpan class="comment" :value="node.comment" :vars="vars"/>
        <StyledSpan class="tag" v-for=" tag in node.tags" :key="tag" :value="tag" :vars="vars"/>        
      </span>      
      <SlideUpDown :active="isOpen(node)" :duration="200">
        <LiteTree v-if="hasChildren(node) && isOpen(node) && !hasError" 
          :root="false"
          :indent="indent+20"
          :format="format"
          :diff="hasDiff"
          :class="isOpen(node) ? 'open' : 'close'"
          :vars="vars"
          :classs="classs"
          :icons="icons"
          :children="node.children"
        >
        </LiteTree>
    </SlideUpDown> 
    </li>    
  </ul>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref, useSlots,withDefaults,provide,inject  } from 'vue';
import type { LiteTreeNode } from '../types';
import StyledSpan from './StyledSpan.vue';
// @ts-ignore
import SlideUpDown from 'vue-slide-up-down'
import { parseTree } from '../parse';

interface LiteTreeProps {
  root?: boolean;
  indent?: number;
  diff?: boolean;
  format?: 'json' | 'lite';
  vars?: Record<string, string>;
  classs?: Record<string, string>;
  icons?: Record<string, string>;
  children?: LiteTreeNode[];
}
const props = withDefaults(defineProps<LiteTreeProps>(),{  
  root: true,
  indent:0,
  diff:false, 
  format:'lite'
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

const getDiffClass = (c: string | undefined): string=>{
    return c=="+" ? 'diff diff-add' : c=="-" ? 'diff diff-delete' : c=="*" ? 'diff diff-modify' : ''
};

const hasError = ref<boolean>(false);  
const hasDiff = ref<boolean>(props.diff);  

const slots = useSlots();

// 返回默认插槽的内容字符串
const parseSlotTree = ()=>{
  const slotContent = slots.default?.()[0];
  if (slotContent && typeof slotContent.children === 'string') {
    return parseTree(slotContent.children,{
      format:props.format,
      forEach:(node:LiteTreeNode)=>{ 
        if(node.diff) hasDiff.value=true
      }
    })
  }else{
    return {classs:{},vars:{},icons:{},treeData:[]}
  }
}
const treeContext = inject('LiteTreeContext')

let nodes:LiteTreeNode[] = []
let vars:Record<string,string> ={}
let classs:Record<string,string> ={}
let icons:Record<string,string> ={}


if(props.root){   
  if(slots.default){
        try {
          const result = parseSlotTree();
          nodes =  result.treeData
          vars = result.vars
          icons = result.icons
          classs = result.classs
          hasError.value=false
          nodes =  reactive(Array.isArray(nodes) ? nodes : [nodes])
        } catch (error) {
          hasError.value=true;
          // @ts-ignore
          nodes =[{title:"Invalid data provided to LiteTree",style:'color:red',
              // @ts-ignore
              children:[{title:error.message,style:'color:red'},]
            }]            
        }
        provide("LiteTreeContext",{
          diff:hasDiff,
          vars,
          icons,
          classs,        
        })
    } 
}else{
  nodes = props.children || []
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
  span.lite-tree-node{
    cursor: pointer;
    display: flex;
    width: 100%;
    padding:4px;
    margin:0px;     
    align-items: center;
    position: relative;     
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
      position: relative;     
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
    & > span.diff{
        width:20px;
        text-align: center;
    }

    .indicate{
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