<template>
  <ul :class="['lite-tree-nodes']">
    <li v-for="(node, index) in nodes" :key="index">
      <span class="lite-tree-node" 
        @click="toggleNode(node)"
        :class="node.classs" 
        :style="node.style">
        <span class="flag" v-if="treeCtx.hasFlag">{{ node.flag }}</span>
        <span class="indent" :style="{ width: indent + 'px' }"></span>
        <span 
          v-if="hasChildren(node)"
          :class="[
            'node-indicator',
            'icon',
            'arrow',
            { expand: isExpand(node) }]"/>
        <span class="icon" :class="hasChildren(node) ? isExpand(node) ? 'folder-open':'folder' : 'file'"/>
        <span class="title">
          <StyledLabel :value="node.title" />
          <StyledLabel class="tag" v-for="tag in node.tags" :key="tag" :value="tag" />
        </span>
        <StyledLabel  class="comment" :value="node.comment" />
      </span>
      <SlideUpDown :active="isExpand(node)" :duration="200">
        <LiteTreeNodes v-if="hasChildren(node) && isExpand(node)" :indent="indent + 20"
          :class="isExpand(node) ? 'expand' : 'close'" :nodes="node.children">
        </LiteTreeNodes>
      </SlideUpDown>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, inject } from 'vue';
import type { LiteTreeNode } from './types';
import StyledLabel from './StyledLabel.vue';
// @ts-ignore
import SlideUpDown from 'vue-slide-up-down'
import { LiteTreeContextId } from './consts';
import type { LiteTreeContext } from './types';

interface LiteTreeNodesProps {
  indent?: number;
  nodes: LiteTreeNode[];
}

const props = withDefaults(defineProps<LiteTreeNodesProps>(), {
  indent: 0,
  nodes: () => ([])
});

const treeCtx = inject<LiteTreeContext>(LiteTreeContextId)!

// 展开/折叠节点
const toggleNode = (node: LiteTreeNode): void => {
  node.expand = node.expand == undefined ? false : !node.expand;
};
// 是否有子节点
const hasChildren = (node: LiteTreeNode): boolean => {
  return Array.isArray(node.children) && node.children.length > 0;
};
// 节点是否已打开
const isExpand = (node: LiteTreeNode): boolean => {
  return node.expand == undefined ? true : node.expand;
}; 
 

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
  padding: 0px;

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

      &.highlight { 
        background-color: #eee;
        color: black;
        font-weight: bold;
      }

      &>span.flag {
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

      &>span.node-indicator {
        width: 1em;
        height: 1em;
        transform-origin: 10px center;
        transform: rotate(0deg);
        transition: all 0.2s; 
        &.expand {
          transform-origin: 10px center;
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