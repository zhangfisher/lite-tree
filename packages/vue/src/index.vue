<template>
    <div class="lite-tree">
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



// 默认使用Lite格式
const props = withDefaults(defineProps<LiteTreeProps>(), {
    indent: 4,
    format: "lite",
    iconset:'default'
});

let format = ref(props.format)

if(!props.format){
    if(props.json) format.value="json"
    if(props.lite) format.value="lite"
}

const hasError = ref<boolean>(false);
const hasFlag = ref<boolean>(false);

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

 
 
const { nodes:rNodes, styles, classs, icons } = parseSlotData();

injectCustomStyles(classs)
injectSvgIcons(icons)


let nodes=reactive(rNodes)

provide<LiteTreeContext>(LiteTreeContextId, {
    hasFlag: hasFlag.value,
    indent: props.indent,
    styles,
    classs,
    icons
})

</script>


<style bundle lang="less" scoped="false">
@import "../../common/styles/root.less"; 
</style> 