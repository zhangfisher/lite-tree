<template>
    <div class="lite-tree">
        <LiteTreeNodes :nodes="nodes"></LiteTreeNodes>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, useSlots, withDefaults, provide, reactive,onMounted } from 'vue';
import type { LiteTreeNode } from './types';
import { LiteTreeContextId } from './consts';
import { parseTree } from '../parse';
import type { LiteTreeContext } from './types';
import LiteTreeNodes from "./LiteTreeNodes.vue";
import { injectStylesheet } from '../utils';
import { injectSvgIcons } from '../icons';

interface LiteTreeProps {
    indent?: number;                // 启用lite格式时的缩进空格数量       
    lite?: boolean                  // Lite格式
    json?: boolean                  // JSON格式
}

// 默认使用Lite格式
const props = withDefaults(defineProps<LiteTreeProps>(), {
    indent: 4,
    lite: true,
    json: false
});

const hasError = ref<boolean>(false);
const hasDiff = ref<boolean>(false);

const slots = useSlots();

// 返回默认插槽的内容字符串
const parseSlotData = () => {
    const slotContent = slots.default?.()[0];
    if (slotContent && typeof slotContent.children === 'string') {
        try {
            return parseTree(slotContent.children, {
                format: props.lite ? 'lite' : 'json',
                forEach: (node: LiteTreeNode) => {
                    if (node.diff) hasDiff.value = true     // 通过遍历确认是否显示diff列
                }
            })
        } catch (error) {
            hasError.value = true;
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

// 增加一些预设的样式
const injectPresetStyles =(classs:Record<string,string>)=>{
    injectStylesheet(`
        .lite-tree .diff-add { color: green; }
        .lite-tree .diff-delete { color: red; }
        .lite-tree .diff-modify { color: blue; }
        .lite-tree .success { background-color: #f3ffec;color: green; }
        .lite-tree .warning { background-color: #fff3e6;color: orange; }
        .lite-tree .error { background-color: #ffe6e6;color: red; }
        .lite-tree .info { background-color: #e6f7ff;color: blue; }
        .lite-tree .primary { background-color: #f0f5ff;color: #0052cc; }
        .lite-tree .secondary { background-color: #f4f4f4;color: #333; }    
        ${Object.keys(classs).map(k=>`.lite-tree ${k} { ${classs[k]} }`).join('\n')} 
    `,{id:'lite-tree-preset-styles',mode:'replace'})
}

 
const { nodes:rNodes, styles, classs, icons } = parseSlotData();

injectPresetStyles(classs)
injectSvgIcons(icons)


const nodes=reactive(rNodes)

provide<LiteTreeContext>(LiteTreeContextId, {
    hasDiff: hasDiff.value,
    indent: props.indent,
    styles,
    classs,
    icons
})

</script>


<style bundle lang="less" scope="false">
.lite-tree {
    position: relative;
    padding: 8px; 
    border: 1px solid #eee;
    text-align: left;
}
</style> 