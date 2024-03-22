import type { ParseTreeOptions } from "../parser"


export interface LiteTreeParseOptions{
    indent?:number;                 // 缩进空格数 
}

/**
   解析LiteTreeFormat格式的树，简称LTF
    
一种简单的基于缩进的树形文本格式，类似于yaml，但更简单

例如:

#red=color:red;            ---> 用于声明样式
#green=color:green;        ---> 用于声明样式
---                        ===> 用于分割样式与树内容
    根节点
        子节点1
            子节点1.1
            子节点1.2
        +子节点2                                            ==> +表示折叠状态
            子节点2.1        
            子节点2.2           // {css}                     ==> 用于设置整行节点的样式
            子节点2.3(注释)                                  ==> 节点注释内容
            子节点2.4({css}注释)                             ==> 节点注释内容包含样式
            子节点2.5           // [tag1] [{}tag2]           ==> 节点标签，其中{}表示标签样式
            子节点2.6(注释)     // [{#red}tag1] [{}tag2]     ==> 包含注释与节点标签，包含自定义样式#red
            {css}子节点2.7                                   ==> 只设置当前节点标题的样式
            -{css}子节点2.7                                  ==> 只设置当前节点标题的样式，并该节点展开状态 
        -子节点3                                             ==> - 表示展开状态 
            子节点3.1 
    



* @param callback 
 */
export default function parseLTF(treeData:string,callback?:((key:string,value:string)=>void),options?:LiteTreeParseOptions){
    const opts = Object.assign({indent:2},options)
    const lines = treeData.split("\n")
    const nodes = []
    function parseNode(line:string,parent: Record<string,any> | null){
        let nodeLine = line.substring(preSpace.length)      // 去掉前置空格
        let node = {open:false,title:'',tags:[],comment:'',style:'',icon:''}
        
        if(nodeLine.startsWith('+')){
            node.open = true
            nodeLine = nodeLine.substring(1)
        }


    }
    // 第一行的前置空格，接下的每一行在缩进的基础上都应该有相同的前置空格
    const preSpace = (lines[0].match(/^\s+/) || [''])[0]
    let currentNode = null
    let parentNode = null
    for(let line of lines){
        if(line.trim()=='') continue
        const level = (line.match(/^\s+/) || [''])[0].length
        const node = parseNode(line,parentNode)
        nodes.push(node)
    }


}




export type MacroStyles = Record<`#${string}`,string>
/**

 解析自定义样式宏定义

自定义样式被定义在树组件内容的开头

- 以#开头，例如：#red=color:red;
- 与树内容之间用---分割

@param content 
 @returns 
*/
export  function parseMacroStyle(content:string):MacroStyles {
    return {}
}

