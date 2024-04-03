export const LiteTreeContextId = Symbol("LiteTreeContext")
export const flagAlias:Record<string,string | string[]> = { 
    "+": "diff-add", 
    "-": "diff-delete", 
    "*": "diff-modify", 
    "!": ["important","[important]"],
    "x": ["error","{color:red;background-color:#ffeaea}[no]"],
    "v": ["correct","{color:green;background-color: #f3ffec}[yes]"]
}

export const LiteTreeScopeId="data-lite-tree"