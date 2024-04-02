import jsonParser from "./json";
import parseLiteTree, { type LiteTreeParseOptions } from "./lite";
import type { LiteTreeNode,LiteTreeParseResults } from "../types";


const SplitterRegex = /^---\s*$/gm;

export interface LiteTreeVars{
    styles:Record<string,any> 
    classs:Record<string,any>
    icons:Record<string,any>
}

/** 
 * @param context 
 */
export function splitTreeContent(context:string){
    const results = context.split(SplitterRegex)
    const [vars,treeData] = results.length==1 ? ["",results[0]] : results
    return [
        vars.trim(),
        treeData.trim()
    ]
}
/**
 
解析声明的样式、类、图标等变量
  
.classname=color:red;border:1px solid red;           //声明类样式
.classname2=color:red;border:1px solid red;          //声明类样式
#style1=display:flex;                                //声明样式
#style2=margin:2px;                                  //声明样式
icon1=<svg></svg>                                    //声明图标
icon2=<svg></svg>                                    //声明图标 
 * 
 * @param str 
 * @returns 
 */
export function parseVars(str:string):LiteTreeVars{
    const styles:Record<string,any> = {}
    const classs:Record<string,any> = {}
    const icons:Record<string,any> = {}
    const varRegex = /^\s*([\w\#\.]+)\s*\=\s*((\{([\w\n\S\s]*?)\})|(\<svg[\w\n\S\s]*?<\/svg\>)|(.*$))/gm
    let matched        
    while((matched = varRegex.exec(str))!==null){
           // 这对于避免零宽度匹配的无限循环是必要的
        if (matched.index === varRegex.lastIndex) {
            varRegex.lastIndex++;
        }
        const key = matched[1].trim()
        let value = matched[4] ||  matched[5]  || matched[6] 

        if(value.startsWith("<svg") || value.startsWith('data:image/svg+xml;')){
            icons[key] = value
        }else{
            value = value.trim()
            if(value.startsWith("{")) value =value.substring(1)
            if(value.endsWith("}")) value = value.substring(0,value.length-1)
            if(key.startsWith(".")){
                classs[key] = value.replaceAll("\n",";")
            }else if(key.startsWith("#")){
                styles[key] = value.replaceAll("\n",";")
            }            
        }
    }
    return {styles,classs,icons}
}

export function parseTreeObject(strTree:string,vars:LiteTreeVars, options:ParseTreeOptions){    
    let treeData:LiteTreeNode[] = []
    try{
        if(options.format=='json'){
            treeData = jsonParser(strTree,(key,value)=>{
                if(typeof(value)==='object' && !Array.isArray(value)){
                    if(typeof(options.forEach)==='function'){
                        return options.forEach(value)
                    }
                }           
            })
        }else{
            treeData = parseLiteTree(strTree,vars,options)
        }
    }catch(e:any){
        console.error(e)
        treeData = [{title:`解析错误:${e.message}`,icon:"error",expand:true,level:0,flag:'',classs:[''],comment:e.message,style:"",tags:[]}]
    }
    return treeData
}

export interface ParseTreeOptions{
    format?: 'lite' | 'json' 
    // ltf解析参数
    ltfOptions?:LiteTreeParseOptions 
    forEach?: (node:LiteTreeNode)=>void
} 



export function parseTree(context:string,options?:ParseTreeOptions):LiteTreeParseResults{
    const opts = Object.assign({},options)
    const [strVars,strTree] = splitTreeContent(context)
    const vars = parseVars(strVars)
    const nodes = parseTreeObject(strTree,vars,opts)
    return {
        ...vars,
        nodes
    }
}
