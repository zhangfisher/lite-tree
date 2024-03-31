import React,{useContext }from "react"
import { context } from "./context"
export  interface RichLabelProps{
    value?:string
}

const RichLabel = ({ children }) => {
    const treeCtx = useContext(context)
    return <span

    >

    </span>

}


export default RichLabel