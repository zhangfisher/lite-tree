import type { Ref } from "vue";

export interface LiteTreeNode {
    title: string;
    icon: string;
    open: boolean;    
    level:number
    diff: "+" | "-" | "*" | undefined;
    comment:string
    style:string
    tags:string[]
    children?: LiteTreeNode[];
  }
  
export interface LiteTreeContext {    
    hasDiff:boolean  
    indent:number
    styles:Record<string,string>
    classs:Record<string,string>
    icons:Record<string,string>

}
  

 