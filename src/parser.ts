import jsonParser from "./parsers/json";
import parseSimpleTree, { type SimpleTreeParseOptions } from "./parsers/simple";
import type { LiteTreeNode } from "./types";


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

export function parseStylesAndIcons(str:string){
    const styles:Record<string,any> = {}
    const icons:Record<string,any> = {}
    const varRegex = /^\s*(\w+)\s*\=\s*((\{([\w\n\S\s]*?)\})|(\<svg[\w\n\S\s]*?<\/svg\>)|(.*$))/gm
    let matched        
    while((matched = varRegex.exec(str))!==null){
           // 这对于避免零宽度匹配的无限循环是必要的
        if (matched.index === varRegex.lastIndex) {
            varRegex.lastIndex++;
        }
        const key = matched[1]
        let value = matched[4] ||  matched[5]  || matched[6] 

        if(value.startsWith("<svg")){
            icons[key] = value
        }else{
            value = value.trim()
            if(value.startsWith("{")) value =value.substring(1)
            if(value.endsWith("}")) value = value.substring(0,value.length-1)
            styles[key] = value.replaceAll("\n",";")
        }
    }
    return [styles,icons]
}

export function parseTreeObject(strTree:string,options:ParseTreeOptions){    
    let treeData:LiteTreeNode[] = []
    try{
        if(options.format=='json'){
            treeData = jsonParser(strTree)
        }else{
            treeData = parseSimpleTree(strTree,options?.ltfOptions)
        }
    }catch(e:any){
        treeData = [{title:`解析错误:${e.message}`,icon:"error",open:true,level:0,diff:undefined,comment:e.message,style:"",tags:[]}]
    }
    return treeData
}

export interface ParseTreeOptions{
    format?: 'simple' | 'json' 
    // ltf解析参数
    ltfOptions?:SimpleTreeParseOptions 
} 


export type ParseTreeResults = {
    styles:Record<string,string>,
    icons:Record<string,string>,
    treeData: LiteTreeNode[]
}


export function parseTree(context:string,options?:ParseTreeOptions):ParseTreeResults{
    const opts = Object.assign({},options)
    const [strVars,strTree] = splitTreeContent(context)
    const [styles,icons] = parseStylesAndIcons(strVars)
    const treeData = parseTreeObject(strTree,opts)
    return {styles,icons,treeData}
}
