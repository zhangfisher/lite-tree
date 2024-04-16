import React,{useContext }from "react"
import { Context } from "./context"
import { StyledString } from "@common/utils/styledString"
import { toStyleObject } from "@common/utils/toStyleObject"
import { parseLinks } from '@common/utils/parseLinks';

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
        data-lite-tree
        className={'richlabel '+className + " " +classs.join(" ")}
        style={{...inlineStyle,...toStyleObject(style)!}}
        dangerouslySetInnerHTML={{__html: parseLinks(value)}}    
    />
}


export default RichLabel