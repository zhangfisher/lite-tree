<template>
    <div class="lite-tree">
        <LiteTreeNodes :nodes="nodes"></LiteTreeNodes>
    </div>
</template>

<script setup lang="ts">
import { ref, useSlots, withDefaults, provide, reactive } from 'vue';
import { LiteTreeContextId,flagAlias} from '@common/consts';
import { parseTree } from '@common/parsers';
import type { LiteTreeContext,LiteTreeNode,LiteTreeProps } from '@common/types';
import LiteTreeNodes from "./LiteTreeNodes.vue";
import {injectStylesheet,enableImportant , injectSvgIcons } from '@common/utils';



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
const parseSlotData = () => {
    const slotContent = slots.default?.()[0];
    if (slotContent && typeof slotContent.children === 'string') {
        try {
            return parseTree(slotContent.children, {
                format: props.format,
                forEach: (node: LiteTreeNode) => {
                    const flag = node.flag
                    if (flag && flag.length>0) {
                        hasFlag.value = true     // 通过遍历确认是否显示diff列
                        if(flag in flagAlias){
                            node.classs.push(flagAlias[flag])
                        }
                    }                    
                }
            })
        } catch (error) {
            hasError.value = true;
            console.error(error)
            // @ts-ignore
            nodes = [{
                title: "Invalid data provided to LiteTree", style: 'color:red',
                // @ts-ignore
                children: [{ title: error.message, style: 'color:red' },]
            }]
        }
        return { classs: {}, styles: {}, icons: {}, nodes: [] }
    } else {
        return { classs: {}, styles: {}, icons: {}, nodes: [] }
    }
}

const injectCustomStyles =(classs:Record<string,string>)=>{
    injectStylesheet(`        
        ${Object.keys(classs).map(k=>`.lite-tree ${k} { ${enableImportant(classs[k])} }`).join('\n')} 
    `,{id:'lite-tree-custom-styles',mode:'replace'})   
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