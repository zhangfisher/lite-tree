

<template>
    <span class="lite-tree-node-tag " :style="getTagStyle(value)">{{getTagValue(value)}}</span>    
</template>
  
<script setup lang="ts">
/**
 *  */  
import { ref, computed, defineProps } from 'vue';

type TagType = 'success' | 'warning' | 'error' | 'info';
type Tag = string
const props = defineProps({  
    value:{
        type: String, 
        default: ''             //{red}重点
    }
});

const presetColors:Record<string,string> ={
    success:'color:#28a745;border:1px solid #28a745;background-color:#bfffce;',
    warning:'color:#ffc107;border:1px solid #ffc107;background-color:#fff9e7;',
    error:'color:#dc3545;border:1px solid #dc3545;background-color:#ffd7d7;',
    info:'color:#17a2b8;border:1px solid #17a2b8;background-color:#e6fcff;'
}

const getTagStyle = (tag:string)  => { 
     if(tag.startsWith('{') && tag.includes('}')){
        const style =  tag.substring(1,tag.indexOf('}')).trim().toLowerCase()
        if(style in presetColors){
            return presetColors[style]
        }
        return style
     }else{
        return undefined
    }
}
  
const getTagValue = (tag:string)  => { 
     if(tag.startsWith('{') && tag.includes('}')){
        return tag.substring(tag.indexOf('}')+1)
     }else{
        return tag
    }
}
  
  </script>
  
  <script lang="ts">
  
  export default {}
  
  </script>
<style lang="less" scoped>
.lite-tree-node-tag {
    background-color: #eee;
    color: #333;
    padding: 2px 4px;
    border-radius: 4px;
    border: 1px solid #ddd;
    margin-left: 2px;
    margin-right: 2px ;
    font-size: 12px;
    &.success{
        background-color: #28a745;
        border-color: #28a745;
    }
    &.warning{
        background-color: #ffc107;
        border-color: #ffc107;
    }    
    &.error{
        background-color: #dc3545;
        border-color: #dc3545;
    }
    &.info{
        background-color: #17a2b8;
        border-color: #17a2b8;
    }
}  
  
  </style>