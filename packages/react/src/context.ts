


import { createContext} from "react"
import type { LiteTreeContext } from "@common/types"
 
export type LiteTreeReactContext = LiteTreeContext & {scopeId:string}
export const Context = createContext<LiteTreeReactContext>({
    scopeId:"",
    hasFlag:false,
    indent:20,
    styles:{},
    classs:{},
    icons:{}
})