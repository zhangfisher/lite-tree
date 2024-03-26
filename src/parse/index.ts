import jsonParser from "./json";
import parseLiteTree, { type LiteTreeParseOptions } from "./lite";
import type { LiteTreeNode } from "../types";


const SplitterRegex = /^---\s*$/gm;


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
 * 解析内容中的图标
 * 
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
export function parseMicros(str:string){
    const vars:Record<string,any> = {}
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

        if(value.startsWith("<svg")){
            icons[key] = value
        }else{
            value = value.trim()
            if(value.startsWith("{")) value =value.substring(1)
            if(value.endsWith("}")) value = value.substring(0,value.length-1)
            if(key.startsWith(".")){
                classs[key] = value.replaceAll("\n",";")
            }else{
                vars[key] = value.replaceAll("\n",";")
            }
            
        }
    }
    return {vars,classs,icons}
}

export function parseTreeObject(strTree:string,options:ParseTreeOptions){    
    let treeData:LiteTreeNode[] = []
    try{
        if(options.format=='json'){
            treeData = jsonParser(strTree,(key,value)=>{
                if(typeof(value)==='object' && !Array.isArray(value)){
                    if(typeof(options.forEach)==='function'){
                        options.forEach(value)
                    }
                }           
            })
        }else{
            treeData = parseLiteTree(strTree,options)
        }
    }catch(e:any){
        treeData = [{title:`解析错误:${e.message}`,icon:"error",open:true,level:0,diff:undefined,comment:e.message,style:"",tags:[]}]
    }
    return treeData
}

export interface ParseTreeOptions{
    format?: 'lite' | 'json' 
    // ltf解析参数
    ltfOptions?:LiteTreeParseOptions 
    forEach?: (node:LiteTreeNode)=>void
} 


export type ParseTreeResults = {
    classs:Record<string,string>,
    vars:Record<string,string>,
    icons:Record<string,string>,
    treeData: LiteTreeNode[]
}


export function parseTree(context:string,options?:ParseTreeOptions):ParseTreeResults{
    const opts = Object.assign({},options)
    const [strVars,strTree] = splitTreeContent(context)
    const treeData = parseTreeObject(strTree,opts)
    return {...parseMicros(strVars),treeData}
}
