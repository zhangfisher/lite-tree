


import { createContext} from "react"
import type { LiteTreeContext } from "../../../src/types"
 

export const Context = createContext<LiteTreeContext>({
    hasFlag:false,
    indent:20,
    styles:{},
    classs:{},
    icons:{}
})