import React,{useCallback, useContext, useState }from "react"
import type { LiteTreeNode } from "@common/types"
import {toStyleObject} from "@common/utils/toStyleObject"
import classnames from "classnames"
import RichLabel from "./RichLabel"
import {SlideDown} from 'react-slidedown' 
import { Context } from "./context"

export type LiteTreeNodesProps =React.PropsWithRef<{
    nodes:LiteTreeNode[]
    indent?:number
}>

const LiteTreeNodes:React.FC<LiteTreeNodesProps> =(props) => {
    const {nodes=[],indent=0} = props    

    const [nodeStatus,setNodeStatus] = useState(nodes.map(node=>node.expand))

    const treeCtx = useContext(Context)        
    return  (<ul data-lite-tree className="lite-tree-nodes">
        { nodes.map((node,index)=>{
            const hasChildren = node.children && node.children.length > 0
            return (<li data-lite-tree key={index}>
                <span data-lite-tree className={"lite-tree-node "+node.classs.join(" ")} 
                    onClick={()=>setNodeStatus([...nodeStatus.slice(0,index),!nodeStatus[index],...nodeStatus.slice(index+1)])}
                    style={toStyleObject(node.style)}>
                    {/* 显示标识 */}
                    { treeCtx.hasFlag ? <span data-lite-tree className ="flag">{ node.flag }</span> : null } 
                    {/* 缩进距离 */}
                    <span data-lite-tree className="indent" style={ {width: indent + 'px'} }></span>
                    {/* 展开折叠指示符 */}
                    { hasChildren ? <span data-lite-tree className={classnames('node-indicator','icon','arrow',{ expand: nodeStatus[index]})} /> : null}
                    {/* 图标 */}
                    <span data-lite-tree className={classnames("icon",node.icon ? node.icon :{
                        'folder-expand': hasChildren && nodeStatus[index],
                        'folder': hasChildren && !nodeStatus[index],
                        'file': !hasChildren})
                    }/>
                    {/* 标题 */}
                    <span data-lite-tree className="title">
                        <RichLabel value={node.title}/>
                        {/* 标签 */}    
                        { node.tags.map((tag,index)=><RichLabel className="tag" key={index} value={tag}/>) }
                    </span>
                    {/* 注释 */}
                    <RichLabel className="comment" value={node.comment} />
                </span>
                {/* 子节点 */}
                { node.children && node.children.length>0  && nodeStatus[index]?                         (
                        <SlideDown>
                            <LiteTreeNodes nodes={node.children} indent={indent+20}/>
                        </SlideDown>
                    ) : null
                }   
            </li>)
        })}
    </ul>)

}

export default LiteTreeNodes