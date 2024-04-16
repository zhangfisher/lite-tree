export const LiteTreeContextId = Symbol("LiteTreeContext")
// 标识符=>[样式类，样式字符串]
export const flagAlias:Record<string,string | string[]> = { 
    "+": "diff-add", 
    "-": "diff-delete", 
    "*": "diff-modify", 
    "!": ["important","[important]"],
    "x": ["error","[no]"],
    "v": ["correct","[yes]"]
}

export const LiteTreeScopeId="data-lite-tree"