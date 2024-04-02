import { LiteTreeScopeId } from "@common/consts"
import { injectStylesheet } from "@common/utils"

// LITE_TREE_ROOT_STYLE和LITE_TREE_NODE_STYLE是vite.config.ts中定义的常量

export function injectStyles(){
    let scopedId:string = ''
    // @ts-ignore
    injectStylesheet(LITE_TREE_ROOT_STYLE,{id:"lite-tree",scoped:false})
    // @ts-ignore
    scopedId = injectStylesheet(LITE_TREE_NODES_STYLE,{
        id:"lite-tree-nodes",
        mode:"append",
        scoped:LiteTreeScopeId
    })

    injectStylesheet(`.react-slidedown {
        overflow: hidden;
        position: relative;
        display: flex; 
        flex-direction: column;
        width: 100%; 
        height:auto;
        transition-property: none;
        transition-duration: .3s;
        transition-timing-function: ease-in-out;
    }
    .react-slidedown.transitioning {
        overflow-y: hidden;
    }
    .react-slidedown.closed {
        display: none;
    }`,{id:"react-slidedown",scoped:false})
    return scopedId
}