import jsonParser from "./parsers/json";
import lftParser, { type LiteTreeParseOptions } from "./parsers/ltf";


const SplitterRegex = /^---\s*$/gm;
/**
 * [ styleMacros,treeData ] , parseTreeContent(str)
 * @param context 
 */
export function parseTreeContent(context:string){
    const results = context.split(SplitterRegex)
    const [vars,treeData] = results.length==1 ? ["",results[0]] : results
    return [
        vars.trim(),
        treeData.trim()
    ]
}



export interface ParseTreeOptions{
    format?: 'ltf' | 'json' 
    // ltf解析参数
    ltfOptions?:LiteTreeParseOptions
    // 遍历节点时的回调
    forEachNode?:(key:string,value:any)=>any
} 


export interface ParseTreeResults{
    vars:Record<string,string>,
    treeData: Record<string,any>
} 


export function parseTree(context:string,options?:ParseTreeOptions){
    const opts = Object.assign({},options)
    const [vars,treeData] = parseTreeContent(context)
    
    if(opts.format=='json'){
        return jsonParser(treeData)
    }else{
        return lftParser(treeData,options?.ltfOptions)
    }
    return {
        vars,
        treeData
    }
}
