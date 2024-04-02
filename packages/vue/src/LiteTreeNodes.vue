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
        <span class="icon" :class="node.icon ? node.icon : (hasChildren(node) ? isExpand(node) ? 'folder-expand':'folder' : 'file')"/>
        <span class="title">
          <RichLabel :value="node.title" />
          <RichLabel class="tag" v-for="tag in node.tags" :key="tag" :value="tag" />
        </span>
        <RichLabel  class="comment" :value="node.comment" />
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
<style bundle="lite-tree-nodes" lite lang="less">
@import '../../common/styles/nodes.less';
</style>