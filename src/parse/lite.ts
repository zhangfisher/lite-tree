import type { ParseTreeOptions } from ".";
import type { LiteTreeNode } from "../vue/types"; 

export interface LiteTreeParseOptions{
    indent?:number;                     // 缩进空格数 
    forEach?:(node:LiteTreeNode)=>void;  // 遍历节点
}

// 节点正则表达式 
const nodeRegex= /(\+|\-)?\s*(\[\s*([\w]?)\s*\])?\s*([^\(\/\\]+)(\((.*?)\))?\s*(\/\/([\*\+\-])?\s*(.*?))?$/gm
const nodeTagsRegex  = /([^,]+)\,?/g
/**
   解析LiteTreeFormat格式的树，简称LTF
    
一种简单的基于缩进的树形文本格式，类似于yaml，但更简单

例如:

red=color:red;            ---> 用于声明样式
green=color:green;        ---> 用于声明样式
icon1=<svg></svg>         ---> 用于声明图标
icon2=<svg></svg>         ---> 用于声明图标

---                        ===> 用于分割样式与树内容
    根节点
        子节点1
            子节点1.1(+)
            +子节点1.2(+)
        +子节点2                                            ==> +表示折叠状态
            子节点2.1        
            子节点2.2                     // {css}          ==> 用于设置整行节点的样式
            [icon] 子节点2.3              // comment        ==> 节点注释内容
            子节点2.4                     // {css}注释      ==> 节点注释内容包含样式
            子节点2.5(tag1,{css}tag2)                       ==> 节点标签，其中{}表示标签样式
            子节点2.6(tag1,{css}tag2)     // comment        ==> 包含注释与节点标签，包含自定义样式#red
            {css}子节点2.7                                  ==> 只设置当前节点标题的样式
            {!css}子节点2.7                                 ==> 设置当前整个节点的样式
        -子节点3                                            ==> - 表示展开状态 
            子节点3.1                     //+
            子节点3.1                     //+
            子节点3.1                     //-
            子节点3.1                     //-
            子节点3.1                     //-
            子节点3.1                     //*
            子节点3.1                     //*
            子节点3.1                     //*

* @param callback 
 */
export default function parseLiteTree(treeData:string,options:ParseTreeOptions){
    const opts = Object.assign({indent:4},options.ltfOptions)
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
            let tag = matched[1]
            if(tag.startsWith("'") || tag.startsWith('"')){
                tag = tag.substring(1)
            }
            if(tag.endsWith("'") || tag.endsWith('"')){
                tag = tag.substring(0,tag.length-1)
            }            
            tags.push(tag)
        }
        return tags
    }
    function parseNode(line:string):LiteTreeNode{
        let node:LiteTreeNode = {
            open:false,title:'',tags:[],comment:'',style:'',icon:'',
            level:0,diff:'+'
        }
        nodeRegex.lastIndex = 0
        const match =nodeRegex.exec(line.trim())
        if(match){
            node.open =  match[1]=='+'  ?  false : true
            node.icon = match[3] || ''
            node.title = match[4] || ''
            node.tags = parseTags(match[6])  
            // @ts-ignore
            node.diff= match[8]
            node.comment = match[9] || ''
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
        if(typeof(options.forEach)=='function'){
            options.forEach(node)
        }
    }

    return rootNode.children!
}
 