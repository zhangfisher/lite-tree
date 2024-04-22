import { Context } from "./context"
import type { LiteTreeProps,LiteTreeNode, LiteTreeClickParams, LiteTreeClickEventHandler, LiteTreeExpandEventHandler } from '@common/types'
import React,{ useCallback, useState} from "react"
import LiteTreeNodes from "./LiteTreeNodes"
import { parseTree } from "@common/parsers";
import {LiteTreeReactContext} from "./context"
import { getIcon, handleNodeClick, injectCustomStyles, injectSvgIcons } from "@common/utils";
import classnames from 'classnames'; 
import "@common/styles"


export * from "@common/types"

export type NodeClickEvent = MouseEvent & {
    detail:LiteTreeClickParams
}
export type LiteTreeReactProps = React.PropsWithChildren<LiteTreeProps & {
    style?:React.CSSProperties
    className?:string
    onClick?:LiteTreeClickEventHandler
    onExpand?:LiteTreeExpandEventHandler
    onCollapse?:LiteTreeExpandEventHandler
}>

export const LiteTree = React.forwardRef<any,LiteTreeReactProps>((props:LiteTreeReactProps,ref) => {
    const { indent=4,data,style,className,onClick,onExpand,onCollapse} = props
    let format = props.format ? props.format : props.json ? "json" :props.lite ? "lite" : undefined 
    const [ctx,setCtx] = useState<LiteTreeReactContext>({
        hasFlag: false,
        indent: 4,
        styles: {},
        classs: {},
        icons: {},
        getIcon,
        onExpand,
        onCollapse
    });
    const [treeData] = useState(()=>{
        return data || (props.children && Array.isArray(props.children) ? 
        (props.children as any[]).map(n=>String(n)).join("\n") : String(props.children))
    })    
    
    const [nodes] = useState<LiteTreeNode[]>(()=>{
        const {styles,classs,icons,nodes=[],hasFlag} = parseTree(treeData,{format})
        setCtx({indent,hasFlag,styles,classs,icons,getIcon,
            onExpand,
            onCollapse});            
        injectCustomStyles(classs)
        injectSvgIcons(icons)
        return nodes        
    })    

    const onNodeClick = useCallback((e:any)=>{
        if(typeof onClick == 'function'){
            handleNodeClick(e,(params:LiteTreeClickParams)=> {                
                onClick(params,e)                
            })}
        }                        
    ,['onClick'])
    

    return (
        <Context.Provider value={ctx}> 
            <div data-lite-tree style={style} className={classnames("lite-tree",className)} ref={ref} onClick={onNodeClick}>
                <LiteTreeNodes nodes={nodes} indent={0}/>
            </div>
        </Context.Provider>
    );
})

export * from '@common/types'

