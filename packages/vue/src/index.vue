<template>
    <div data-lite-tree class="lite-tree" :class="{dark}">
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
    format: "lite",
    iconset:'default',
    dark:false
});

let format = ref(props.format)

if(!props.format){
    if(props.json) format.value="json"
    if(props.lite) format.value="lite"
}

const slots = useSlots();

// 返回默认插槽的内容字符串
const parseSlotData = ():LiteTreeParseResults => {
    const slotContent = slots.default?.()[0];
    if (slotContent && typeof slotContent.children === 'string') {
        return parseTree(slotContent.children, {format: props.format}) 
    } else {
        return { classs: {}, styles: {}, icons: {}, nodes: [] ,hasFlag:false }
    }
}
 
 
const { nodes:rNodes, styles, classs, icons,hasFlag:isShowFlag } = parseSlotData();

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
 