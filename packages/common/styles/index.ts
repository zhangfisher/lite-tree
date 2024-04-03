import { LiteTreeScopeId } from "../consts"
import { injectStylesheet } from "../utils"
// @ts-ignore
import styles from './styles.css?raw'
// @ts-ignore
import icons from './icons.css?raw'

export function injectStyles(){
    // 1. 注入样式文件
    let scopedId = injectStylesheet(styles,{
        id:"lite-tree-styles",
        scoped:LiteTreeScopeId
    })
    // 2. 注入图标文件
    injectStylesheet(icons,{
        id:"lite-tree-icons",
        scoped:false
    })
    // 3. 注入react-slidedown组件样式
    injectStylesheet(`.react-slidedown {
        overflow: hidden;
        position: relative;
        display: flex; 
        flex-direction: column;
        width: 100%; 
        height:0;
        transition-property: none;
        transition-duration: .3s;
        transition-timing-function: ease-in-out;
    }
    .react-slidedown.transitioning {
        overflow-y: hidden;
    }
    .react-slidedown.closed {
        display: none;
    }`,{id:"lite-tree-react-slidedown",scoped:false})
    return scopedId
}

injectStyles()