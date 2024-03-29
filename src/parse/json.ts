import { safeParseJson } from "../utils"; 


export default function parseJson(content:string,forEach:(key:string,value:any)=>void){
    let nodes =  safeParseJson(content.trim(),(key,value)=>{        
        if(typeof(value)=='object' && !Array.isArray(value)){
            value.expend = value.expend==undefined ? true : value.expend;
            if(value.diff) {
                value.flag = value.diff=='add' ? "+" : value.diff=='delete' ? "-" : value.diff=='modify' ? "*" : value.diff
                delete value.diff
            }
            if(!value.flag) value.flag=''
            if(!value.classs) value.classs = []
            if(!value.tags) value.tags = []
            if(!value.style) value.style = ''
            if(!value.icon) value.icon = ''
            if(!value.comment) value.comment = ''
            if(typeof(forEach)==='function'){
                Object.assign(value,forEach(key,value))
            }        
        }
        return value;          
    });
    nodes =  Array.isArray(nodes) ? nodes : [nodes]
    return nodes;    
}
