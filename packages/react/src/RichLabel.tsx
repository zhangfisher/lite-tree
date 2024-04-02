import React,{useContext }from "react"
import { Context } from "./context"
import { StyledString } from "@common/utils/styledString"
import { toStyleObject } from "@common/utils/toStyleObject"

export  interface RichLabelProps{
    value:string
    className?:string
    style?:React.CSSProperties
}

const RichLabel:React.FC<RichLabelProps> = (props:RichLabelProps) => {
    const { className='', style:inlineStyle={} } = props
    const treeCtx = useContext(Context)
    const {style,classs=[],value} = StyledString(props.value,treeCtx.styles);
    return <span
        data-lite-tree-nodes
        className={className + " " +classs.join(" ")}
        style={{...inlineStyle,...toStyleObject(style)!}}
        dangerouslySetInnerHTML={{__html: value}}    
    />
}


export default RichLabel