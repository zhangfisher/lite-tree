


import { createContext} from "react"
import type { LiteTreeContext, LiteTreeExpandEventHandler } from "@common/types" 
 
export type LiteTreeReactContext = LiteTreeContext & {
    onExpand?:LiteTreeExpandEventHandler
    onCollapse?:LiteTreeExpandEventHandler
}
export const Context = createContext<LiteTreeReactContext>({
    hasFlag:false,
    indent:20,
    styles:{},
    classs:{},
    icons:{},
    getIcon:()=>'',
    onExpand:()=>{},
    onCollapse:()=>{},
})