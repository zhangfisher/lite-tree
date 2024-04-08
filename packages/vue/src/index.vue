<template>
    <div data-lite-tree class="lite-tree" >
        <LiteTreeNodes :nodes="nodes"></LiteTreeNodes>
    </div>
</template>

<script setup lang="ts">
import { ref, useSlots, withDefaults, provide, reactive } from 'vue';
import { LiteTreeContextId} from '@common/consts';
import { parseTree } from '@common/parsers';
import type { LiteTreeContext,LiteTreeProps,LiteTreeParseResults } from '@common/types';
import LiteTreeNodes from "./LiteTreeNodes.vue";
import { injectSvgIcons ,injectCustomStyles} from '@common/utils';
import '@common/styles';


// 默认使用Lite格式
const props = withDefaults(defineProps<LiteTreeProps>(), {
    indent: 4,
    iconset:'default'
});

let format = ref(props.format)

if(props.json) format.value="json"
if(props.lite) format.value="lite"

const slots = useSlots();

const getSlotData = ()=>{
    const slotContent = slots.default?.()[0];
    if (slotContent && typeof slotContent.children === 'string') {
        return slotContent.children
    }
}
    

// 返回默认插槽的内容字符串
const parseTreeData = ():LiteTreeParseResults => {
    const treeData = props.data || getSlotData();
    if (treeData) {
        return parseTree(treeData, {format:format.value}) 
    } else {
        return { classs: {}, styles: {}, icons: {}, nodes: [] ,hasFlag:false }
    }
}
const { nodes:rNodes, styles, classs, icons,hasFlag:isShowFlag } = parseTreeData();
injectCustomStyles(classs)
injectSvgIcons(icons)

let nodes=reactive(rNodes)

provide<LiteTreeContext>(LiteTreeContextId, {
    hasFlag: isShowFlag,
    indent: props.indent,
    styles,
    classs,
    icons
})

</script>
 