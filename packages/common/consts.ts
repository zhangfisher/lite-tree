export const LiteTreeContextId = Symbol("LiteTreeContext")
export const flagAlias:Record<string,string> = { 
    "+": "diff-add", 
    "-": "diff-delete", 
    "*": "diff-modify", 
    "!": "highlight" 
}

