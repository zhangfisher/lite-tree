import React,{useContext,useCallback }from "react"
import { Context } from "./context"
import type { LiteTreeNode } from "@common/types"
import toStyleObject from "style-to-object"

export  interface LiteTreeNodesProps{
    nodes:LiteTreeNode[]
    indent?:number
}



const LiteTreeNodes:React.FC<React.PropsWithChildren<LiteTreeNodesProps>> = (props) => {
    const treeCtx = useContext(Context)
    const {nodes=[],indent=0} = props
    const toggleNode = useCallback((node:LiteTreeNode)=>{
        node.expand = !node.expand
    },[])

    return  (<ul className="lite-tree-nodes">
        { nodes.map((node,index)=>{
            return (<li key={index} className="lite-tree-node">
                <span className={"lite-tree-node "+node.classs.join(" ")} 
                    onClick={()=>toggleNode(node)}
                    style={toStyleObject(node.style)!}>
                    { node.flag ? <span className ="flag">{ node.flag }</span> : null } 
                    <span className="indent" style={ {width: indent + 'px'} }></span>

                </span>

            </li>)
        })}
    </ul>)

}


export default LiteTreeNodes