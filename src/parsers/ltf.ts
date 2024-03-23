import type { LiteTreeNode } from "../types";
import type { ParseTreeOptions } from "../parser"


 interface LiteTreeParseOptions{
    indent?:number;                 // 缩进空格数 
}

// 节点正则表达式
const nodeRegex = /(\+|\-)?\s*(\w+)(\((.*?)\))?\s*(\/\/\s*(.*))?\s*$/gm
const nodeTagsRegex  = /([^,]+)\,?/g
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
            子节点2.2                     // {css}          ==> 用于设置整行节点的样式
            子节点2.3                     // comment        ==> 节点注释内容
            子节点2.4                     // {css}注释      ==> 节点注释内容包含样式
            子节点2.5(tag1,{css}tag2)                       ==> 节点标签，其中{}表示标签样式
            子节点2.6(tag1,{css}tag2)     // comment        ==> 包含注释与节点标签，包含自定义样式#red
            {css}子节点2.7                                  ==> 只设置当前节点标题的样式
        -子节点3                                            ==> - 表示展开状态 
            子节点3.1 





* @param callback 
 */
 function parseLTF(treeData:string,callback?:((key:string,value:string)=>void),options?:LiteTreeParseOptions){
    const opts = Object.assign({indent:4},options)
    const lines = treeData.split("\n")

    // 形式如： tag1,{css}tag2,ta\,g3    
    function parseTags(strTags:string){
        if(!strTags) return []
        let matched
        let tags:string[]=[]
        while ((matched = nodeTagsRegex.exec(strTags)) !== null) {
            // 这对于避免零宽度匹配的无限循环是必要的
            if (matched.index === nodeTagsRegex.lastIndex) {
                nodeTagsRegex.lastIndex++;
            }
            tags.push(matched[1])
        }
        return tags
    }
    function parseNode(line:string):LiteTreeNode{
        let node:LiteTreeNode = {
            open:false,title:'',tags:[],comment:'',style:'',icon:'',
            level:0,  prefix:"",diff:'+',mark:'success'
        }
        nodeRegex.lastIndex = 0
        const match =nodeRegex.exec(line.trim())
        if(match){
            node.open =  match[1]=='-'  ?  true : false
            node.title = match[2] || ''
            node.tags = parseTags(match[4])  
            node.comment = match[6] || ''
        }

        return node as LiteTreeNode

    } 
    // 第一行的前置空格，接下的每一行在缩进的基础上都应该有相同的前置空格
    const preSpace = (lines[0].match(/^\s+/) || [''])[0]

    let previousNode:LiteTreeNode | undefined = undefined
    let parentNode:LiteTreeNode | undefined = undefined
    // @ts-ignore
    let rootNode:LiteTreeNode = {level:0,children:[]}
    const stackNodes:LiteTreeNode[] = [rootNode]


    for(let line of lines){
        if(line.trim() == '') continue
        line = line.substring(preSpace.length)        

        const node = parseNode(line) 
        node.level= Math.ceil((line.match(/^\s+/) || [''])[0].length / opts.indent) + 1

        if(!previousNode){ // 没有上一级时，如果curLevel>0,则为根节点      
            parentNode = rootNode 
        }else if( node.level == previousNode.level ) {      // 同一级别
            
        }else if(node.level > previousNode.level ) {       // 子级别                
            stackNodes.push(previousNode)
            parentNode = previousNode
        }else if(node.level < previousNode.level) {        // 父级别
            for(let i = stackNodes.length-1;i>=0;i--){
                if(stackNodes[i].level>=node.level){
                    stackNodes.pop()                                             
                }else {
                    parentNode = stackNodes[i]
                    break
                }
            }
        }
            

        // 添加节点         
        if(parentNode && !parentNode.children) {
            parentNode.children=[]
        }
        parentNode?.children!.push(node)
        previousNode = node
    }

    return rootNode.children
}




 type MacroStyles = Record<`#${string}`,string>
/**

 解析自定义样式宏定义

自定义样式被定义在树组件内容的开头

- 以#开头，例如：#red=color:red;
- 与树内容之间用---分割

@param content 
 @returns 
*/
  function parseMacroStyle(content:string):MacroStyles {
    return {}
}


const treeData=`
ROOT
    A
        a1
        a2
        a3
    + B                                            
        b1        
        - b2                     // {css}         
            b21
            b22
            b23
        b3                     // comment       
        b4                     // {css}注释     
        b5(tag1,{css}tag2)                      
        b6(tag1,{css}tag2)     // comment        
        {css}b7                                  
    - C
        c1        
        c2
`


const tree = parseLTF(treeData)!

// 按照树结构显示tree树，只显示树节点中的title
function displayTree(tree:LiteTreeNode[]){
    for(let node of tree){
        console.log(" ".repeat(node.level),node.title,"commect=",node.comment,"tags=",node.tags.join(','),"open=",node.open)
        if(node.children){
            displayTree(node.children)
        }
    }
}
displayTree(tree)