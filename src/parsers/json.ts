import { safeParseJson } from "../utils";
import type { ParseTreeOptions } from "../parser"


export default function parseJson(content:string){
    let nodes =  safeParseJson(content.trim(),(key,value)=>{
        if(typeof(value)=='object' && !Array.isArray(value)){
            value.open = value.open==undefined ? true : value.open;
        }
        return value;          
    });
    nodes =  Array.isArray(nodes) ? nodes : [nodes]
    return nodes;    
}
