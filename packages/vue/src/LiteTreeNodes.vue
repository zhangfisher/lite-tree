<template>
  <ul  data-lite-tree :class="['lite-tree-nodes']">
    <li  data-lite-tree v-for="(node, index) in nodes" :key="index">
      <span  data-lite-tree class="lite-tree-node" 
        @click="toggleNode(node)"
        :class="node.classs" 
        :style="node.style">
        <span  data-lite-tree class="flag" v-if="treeCtx.hasFlag">
          <RichLabel :value="node.flag" />
        </span>
        <span  data-lite-tree class="indent" :style="{ width: indent + 'px' }"></span>
        <span 
          data-lite-tree
          v-if="hasChildren(node)"
          :class="[
            'opener',
            'icon',
            'arrow',
            { open: isNodeOpen(node) }]"/>
        <span data-lite-tree class="icon" :class="node.icon ? node.icon : (hasChildren(node) ? isNodeOpen(node) ? 'folder-open':'folder' : 'file')"/>
        <span  data-lite-tree class="title">
          <RichLabel :value="node.title" />
          <RichLabel class="tag" v-for="tag in node.tags" :key="tag" :value="tag" />
        </span>
        <RichLabel  class="comment" :value="node.comment" />
      </span>
      <SlideUpDown :active="isNodeOpen(node)" :duration="200">
        <LiteTreeNodes v-if="hasChildren(node) && isNodeOpen(node)" :indent="indent + 20"
          :class="isNodeOpen(node) ? 'open' : 'close'" :nodes="node.children">
        </LiteTreeNodes>
      </SlideUpDown>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { withDefaults, inject } from 'vue';
import type { LiteTreeNode,LiteTreeContext ,LiteTreeNodesProps } from '@common/types';
import RichLabel from './RichLabel.vue';
import { LiteTreeContextId } from '@common/consts'; 
// @ts-ignore
import SlideUpDown from 'vue-slide-up-down'

const props = withDefaults(defineProps<LiteTreeNodesProps>(), {
  indent: 0,
  nodes: () => ([])
});

const treeCtx = inject<LiteTreeContext>(LiteTreeContextId)!

// 展开/折叠节点
const toggleNode = (node: LiteTreeNode): void => {
  node.open = node.open == undefined ? false : !node.open;
};
// 是否有子节点
const hasChildren = (node: LiteTreeNode): boolean => {
  return Array.isArray(node.children) && node.children.length > 0;
};
// 节点是否已打开
const isNodeOpen = (node: LiteTreeNode): boolean => {
  return node.open == undefined ? true : node.open;
}; 
 

</script>

<script lang="ts">
export default {}
</script>
