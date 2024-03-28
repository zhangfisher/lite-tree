<template>
  <ul :class="['lite-tree-nodes']">
    <li v-for="(node,index) in nodes" :key="index" >
      <span class="lite-tree-node"
        :class="[getDiffClass(node.diff),getNodeClasss(node)]"
        @click="toggleNode(node)"
        :style="[getNodeStyle(node),node.style]" 
      >
        <span class="diff-flag" v-if="treeCtx.hasDiff">{{ node.diff }}</span>
        <span class="indent" :style="{width:indent+'px'}"></span>
        <span :class="hasChildren(node) ? ['folder',{open:node.open==undefined ? true : node.open}] : null"></span>       
        <span class="icon file"></span>
        <span class="title">
          <StyledLabel :value="removeStyledHead(node.title)"/>        
          <StyledLabel class="tag" v-for="tag in node.tags" :key="tag" :value="tag"/>  
        </span>
        <StyledLabel class="a comment" :value="node.comment" />              
      </span>      
      <SlideUpDown :active="isOpen(node)" :duration="200">
        <LiteTreeNodes v-if="hasChildren(node) && isOpen(node)"
          :indent="indent+20"
          :class="isOpen(node) ? 'open' : 'close'"
          :nodes="node.children"
        >
        </LiteTreeNodes>
    </SlideUpDown> 
    </li>    
  </ul>
</template>

<script setup lang="ts">
import { defineProps, withDefaults,inject  } from 'vue';
import type { LiteTreeNode } from './types';
import StyledLabel from './StyledLabel.vue';
// @ts-ignore
import SlideUpDown from 'vue-slide-up-down'
import { LiteTreeContextId } from './consts';
import type { LiteTreeContext } from './types';
import { StyledString,removeStyledHead } from '../utils';

interface LiteTreeNodesProps {
  indent?: number;
  nodes: LiteTreeNode[];
}

const props = withDefaults(defineProps<LiteTreeNodesProps>(),{  
  indent:0,
  nodes:()=>([])
});

const treeCtx = inject<LiteTreeContext>(LiteTreeContextId)!

// 展开/折叠节点
const toggleNode = (node: LiteTreeNode): void => {
  node.open =node.open==undefined ? false : !node.open;
};
// 是否有子节点
const hasChildren = (node: LiteTreeNode): boolean=>{
  return Array.isArray(node.children) && node.children.length > 0;
};
// 节点是否已打开
const isOpen = (node: LiteTreeNode): boolean=>{
  return node.open==undefined ? true : node.open;
};  
// diff
const getDiffClass = (c: string | undefined): string=>{
    return c=="+" ? 'diff-add' : c=="-" ? 'diff-delete' : c=="*" ? 'diff-modify' : ''
};

const getNodeStyle = (node:LiteTreeNode)=>StyledString(node.title,treeCtx.styles).style
const getNodeClasss = (node:LiteTreeNode)=>StyledString(node.title,treeCtx.styles).classs

</script>  
<script lang="ts">
export default {}
</script>
<style bundle lang="less"> 
  .lite-tree-nodes {
      color: #555;
      display: flex;
      flex-direction: column;
      list-style: none !important;
      padding:0px;
      &>li {
          &>span.lite-tree-node {
              cursor: pointer;
              display: flex;
              width: 100%;
              padding: 4px;
              margin: 0px;
              align-items: center;
              position: relative;
              &.diff-add {
                  background-color: #f3ffec;
                  color: green;
              }
              &.diff-modify {
                  background-color: #fff6e9;
                  color: orange;
              }
              &.diff-delete {
                  background-color: #ffeaea;
                  color: red
              }             
              &>span.diff-flag {
                  width: 24px;
                  text-align: center;                    
              }

              &>span.title {
                  flex-grow: 1;
                  padding-right: 4px;
                  &>span.tag {
                      background-color: #eee;
                      color: #333;
                      padding: 2px 4px;
                      border-radius: 4px;
                      border: 1px solid #ddd;
                      margin-left: 2px;
                      margin-right: 2px;
                      font-size: 12px;
                  }
              } 
              &>span.comment {
                  color: #bbb;
              }

              &>span.folder {
                  width: 20px;
                  height: 10px;
                  border-left: 10px solid #999;
                  border-right: 10px solid transparent;
                  border-bottom: 5px solid transparent;
                  border-top: 5px solid transparent;
                  transform-origin: 5px center;
                  transform: rotate(0deg);
                  transition: all 0.2s;
                  &.open {
                      transform-origin: 5px center;
                      transform: rotate(90deg);
                      transition: all 0.2s;
                  }
              }

              &:hover {
                  background-color: #f8f8f8;
                  border-radius: 4px;
              }
          }
      }
      .success {
          background-color: #f3ffec;
          color: green;
      }
      .warning {
          background-color: #fff6e9;
          color: orange;
      }
      .error {
          background-color: #ffeaea;
          color: red
      }
      .info {
          background-color: #f5f5f5;
      }
  } 
</style> 