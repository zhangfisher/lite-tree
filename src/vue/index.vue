<template>
    <div class="lite-tree">
        <LiteTreeNodes :nodes="nodes"></LiteTreeNodes>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, useSlots, withDefaults, provide, reactive } from 'vue';
import type { LiteTreeNode } from './types';
import { LiteTreeContextId,flagAlias} from './consts';
import { parseTree } from '../parse';
import type { LiteTreeContext } from './types';
import LiteTreeNodes from "./LiteTreeNodes.vue";
import { injectStylesheet,enableImportant } from '../utils';
import { injectSvgIcons } from '../icons';

interface LiteTreeProps {
    indent?: number;                // 启用lite格式时的缩进空格数量       
    lite?: boolean                  // Lite格式
    json?: boolean                  // JSON格式
    iconset?: string[]              // 图标集,如[file,folder,arrow]
}


// 默认使用Lite格式
const props = withDefaults(defineProps<LiteTreeProps>(), {
    indent: 4,
    lite: true,
    json: false,
    iconset:()=>['folder','file']
});

const hasError = ref<boolean>(false);
const hasFlag = ref<boolean>(false);

const slots = useSlots();

// 返回默认插槽的内容字符串
const parseSlotData = () => {
    const slotContent = slots.default?.()[0];
    if (slotContent && typeof slotContent.children === 'string') {
        try {
            return parseTree(slotContent.children, {
                format: props.lite ? 'lite' : 'json',
                forEach: (node: LiteTreeNode) => {
                    const flag = node.flag
                    if (flag && flag.length>0) {
                        hasFlag.value = true     // 通过遍历确认是否显示diff列
                        if(flag in flagAlias) node.classs.push(flagAlias[flag])
                    }                    
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

const injectCustomStyles =(classs:Record<string,string>)=>{
    injectStylesheet(`        
        ${Object.keys(classs).map(k=>`.lite-tree ${k} { ${enableImportant(classs[k])} }`).join('\n')} 
    `,{id:'lite-tree-custom-styles',mode:'replace'})   
}
 
const { nodes:rNodes, styles, classs, icons } = parseSlotData();

injectCustomStyles(classs)
injectSvgIcons(icons)


const nodes=reactive(rNodes)

provide<LiteTreeContext>(LiteTreeContextId, {
    hasFlag: hasFlag.value,
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