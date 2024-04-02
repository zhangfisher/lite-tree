import React,{useCallback }from "react"
import type { LiteTreeNode } from "@common/types"
import {toStyleObject} from "@common/utils/toStyleObject"
import classnames from "classnames"
import RichLabel from "./RichLabel"
import {SlideDown} from 'react-slidedown' 

export type LiteTreeNodesProps =React.PropsWithRef<{
    nodes:LiteTreeNode[]
    indent?:number
}>

const LiteTreeNodes:React.FC<LiteTreeNodesProps> =React.forwardRef<typeof LiteTreeNodes,LiteTreeNodesProps>((props, ref) => {

    const {nodes=[],indent=0} = props
    const toggleNode = useCallback((node:LiteTreeNode)=>{
        node.expand = !node.expand
    },[])
    
    return  (<ul data-lite-tree-nodes className="lite-tree-nodes">
        { nodes.map((node,index)=>{
            const hasChildren = node.children && node.children.length > 0
            return (<li data-lite-tree-nodes key={index}>
                <span data-lite-tree-nodes className={"lite-tree-node "+node.classs.join(" ")} 
                    onClick={()=>toggleNode(node)}
                    style={toStyleObject(node.style)}>
                    {/* 显示标识 */}
                    { node.flag ? <span data-lite-tree-nodes className ="flag">{ node.flag }</span> : null } 
                    {/* 缩进距离 */}
                    <span data-lite-tree-nodes className="indent" style={ {width: indent + 'px'} }></span>
                    {/* 展开折叠指示符 */}
                    { hasChildren ? <span data-lite-tree-nodes className={classnames('node-indicator','icon','arrow',{ expand: !node===false})} /> : null}
                    {/* 图标 */}
                    <span data-lite-tree-nodes className={classnames("icon",node.icon ? node.icon :{
                        'folder-expend': hasChildren && node.expand,
                        'folder': hasChildren && !node.expand,
                        'file': !hasChildren})
                    }/>
                    {/* 标题 */}
                    <span data-lite-tree-nodes className="title">
                        <RichLabel value={node.title}/>
                        {/* 标签 */}    
                        { node.tags.map((tag,index)=><RichLabel className="" key={index} value={tag}/>) }
                    </span>
                    {/* 注释 */}
                    <RichLabel className="comment" value={node.comment} />
                                      

                </span>
                {/* 子节点 */}
                { node.children && node.children.length>0 ?
                                        (
                                            <SlideDown className={'my-dropdown-slidedown'}>
                                                <LiteTreeNodes nodes={node.children} indent={indent+20}/>
                                            </SlideDown>
                                        ) : null
                                    }   
                            </li>)
                        })}
                    </ul>)

})


export default LiteTreeNodes