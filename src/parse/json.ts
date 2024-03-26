import { safeParseJson } from "../utils"; 


export default function parseJson(content:string,forEach:(key:string,value:any)=>void){
    let nodes =  safeParseJson(content.trim(),(key,value)=>{
        if(typeof(forEach)==='function'){
            forEach(key,value)
        }        
        if(typeof(value)=='object' && !Array.isArray(value)){
            value.open = value.open==undefined ? true : value.open;
        }
        return value;          
    });
    nodes =  Array.isArray(nodes) ? nodes : [nodes]
    return nodes;    
}
