import { Context } from "./context"
import type { LiteTreeProps,LiteTreeNode } from '@common/types'
import React,{ useState,useEffect, useRef} from "react"
import LiteTreeNodes from "./LiteTreeNodes"
import { parseTree } from "@common/parsers";
import { injectStyles } from "./styles"
import {LiteTreeReactContext} from "./context"
import { injectCustomStyles, injectSvgIcons } from "@common/utils";

let scopeId = injectStyles()!

export type LiteTreeReactProps = React.PropsWithChildren<LiteTreeProps> & {data:string}

export const LiteTree = React.forwardRef<any,LiteTreeReactProps>((props:LiteTreeReactProps,ref) => {
    const { indent=4,data=''} = props
    let format = props.format ? props.format : props.json ? "json" : "lite"
    const [nodes,setNodes] = useState<LiteTreeNode[]>([])
    const [ctx,setCtx] = useState<LiteTreeReactContext>({
        hasFlag: false,
        indent: 4,
        styles: {},
        classs: {},
        icons: {},
        scopeId
    });

    useEffect(() => {
        let hasFlag = false
        const {styles,classs,icons,nodes=[]} = parseTree(data,{
            format
        })
        setCtx({indent,hasFlag,styles,classs,icons,scopeId});            
        injectCustomStyles(classs)
        injectSvgIcons(icons)
        setNodes(nodes)         
    }, [data]);
    return (
        <Context.Provider value={ctx}> 
            <div className="lite-tree" ref={ref}>
                <LiteTreeNodes nodes={nodes} indent={0}/>
            </div>
        </Context.Provider>
    );
})

export * from '@common/types'

