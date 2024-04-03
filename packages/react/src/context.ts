


import { createContext} from "react"
import type { LiteTreeContext } from "@common/types"
 
export type LiteTreeReactContext = LiteTreeContext  
export const Context = createContext<LiteTreeReactContext>({
    hasFlag:false,
    indent:20,
    styles:{},
    classs:{},
    icons:{}
})