<template>
    <StyledString class="lite-tree-node-tag " :style="tag.style" :value="tag.value "/>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import StyledString from './StyledSpan.vue';

const props = defineProps({
    value: {
        type: String,
        default: ''             //{red}重点
    }
});

const presetStyles: Record<string, string> = {
    success: 'color:#28a745;border:1px solid #28a745;background-color:#bfffce;',
    warning: 'color:#ffc107;border:1px solid #ffc107;background-color:#fff9e7;',
    error: 'color:#dc3545;border:1px solid #dc3545;background-color:#ffd7d7;',
    info: 'color:#17a2b8;border:1px solid #17a2b8;background-color:#e6fcff;'
}

let tag = withStyleString(props.value)


if (tag.style && tag.style in presetStyles) {
    tag.style = presetStyles[tag.style!]
}

</script>

<script lang="ts">

export default {}

</script>
<style lang="less" bundle>
.lite-tree-node-tag {
    background-color: #eee;
    color: #333;
    padding: 2px 4px;
    border-radius: 4px;
    border: 1px solid #ddd;
    margin-left: 2px;
    margin-right: 2px;
    font-size: 12px;
}
</style>