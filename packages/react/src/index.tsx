import { Context } from "./context"
import type { LiteTreeProps,LiteTreeNode } from '@common/types'
import React,{ useState,useEffect} from "react"
import LiteTreeNodes from "./LiteTreeNodes"
import { parseTree } from "@common/parsers";
import { injectStyles } from "./styles"
import {LiteTreeReactContext} from "./context"

let scopeId = injectStyles()!


export const LiteTree = (props:React.PropsWithChildren<LiteTreeProps> & {data:string}) => {
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
        try{
            const {styles,classs,icons,nodes=[]} = parseTree(data,{
                format
            })
            setCtx({indent,hasFlag,styles,classs,icons,scopeId});
            setNodes(nodes)            
        }catch(e:any){
            console.error("[LiteTree]",e.stack)
            // @ts-ignore
            setNodes([{title:`解析错误:${e.message}`,icon:"error"}])
        }        
    }, [data]);


    return (
        <Context.Provider value={ctx}> 
            <div className="lite-tree">
                <LiteTreeNodes nodes={nodes} indent={0}/>
            </div>
        </Context.Provider>
    );
};

export * from '@common/types'

