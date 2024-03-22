import { safeParseJson } from "../utils";
import type { ParseTreeOptions } from "../parser"


export default function parseJson(content:string,callback?:ParseTreeOptions['forEachNode']){
    let nodes =  safeParseJson(content.trim(),(key,value)=>{
        if(typeof(callback)=='function'){
            callback(key,value);
        }
        return value;          
    });
    nodes =  Array.isArray(nodes) ? nodes : [nodes]
    return nodes;    
}
