<template>
<span class="lite-tree-icon">
    <svg xmlns="http://www.w3.org/2000/svg">
      <use :xlink:href="'#'+name" />
    </svg>
</span>
</template>
<script setup lang="ts">
/**
 * import { Icon } from 'litetree';
 * 
 
 <Icon name="success">...svg代码...</Icon>
 <Icon name="success">...svg代码...</Icon>

 <Icon name="success" size="">

 * 
 */

import { defineProps, useSlots } from 'vue';
import { compressSvg } from './utils';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    width: {
        type: [String, Number],
        default: 24
    },
    height: {
        type: [String, Number],
        default: 24
    },
    color: {
        type: String,
        default: 'currentColor'
    },

});


const svgData = useSlots().default?.()[0];
if(svgData){
    // 查找图标容器
    let styleContainer = document.head.querySelector('svg[id=lite-tree-icons]')
    if(!styleContainer){
        styleContainer = document.createElement("svg")
        styleContainer.id = 'lite-tree-icons'
        document.head.appendChild(styleContainer)                    
    }
    // 添加图标
    let iconEle = styleContainer.querySelector(`symbol#${props.name}`)
    if(!iconEle){
        iconEle = document.createElement("symbol")
        iconEle.id = props.name
        iconEle.innerHTML = compressSvg(svgData as unknown as string)        
        styleContainer.appendChild(iconEle)
    }
}



</script>
<style lang="less">
.lite-tree-icon{
    display: inline-block;
    width: 24px;
    height: 24px;
    svg{
        color:currentColor; 
        width: 100%;
        height: 100%;
    }
}
</style>
