<template>
  <ul :class="['lite-tree-nodes',{'root':root}]">
    <li v-for="node in nodes" :key="node.id || node.title" >
      <span class="lite-tree-node"
        :class="node.mark"
        @click="toggleNode(node)"
        :style="node.style"
      >
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
          :class="isOpen(node) ? 'open' : 'close'"
        >
              {{ node.children }}
        </LiteTree>
    </SlideUpDown>
    </li>    
  </ul>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref, useSlots } from 'vue';
import { safeParseJson } from "./utils";
import Comment from './Comment.vue';
import Tag from './Tag.vue';
import { withStyleString } from './utils';
// @ts-ignore
import SlideUpDown from 'vue-slide-up-down'

interface LiteTreeNode {
  id?: string;
  title: string;
  icon?: string;
  open?: boolean;    
  mark?: 'success' | 'warning' | 'error' | 'info';
  comment?:string
  style?:string
  tags?:string[]
  children?: LiteTreeNode[];
}

const props = defineProps({  
  root:{
    type: Boolean, 
    default: true
  }, 
  indent:{
    type: Number,
    default: 0  
  }
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


const hasError = ref<boolean>(false); 

const slots = useSlots();
let nodes:LiteTreeNode[] = []

if(slots.default){
  const slotContent = slots.default?.()[0];
  if (slotContent && typeof slotContent.children === 'string') {
        try {
          nodes =  safeParseJson(slotContent.children.trim(),(key,value)=>{
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
</style> ./Comment.vue