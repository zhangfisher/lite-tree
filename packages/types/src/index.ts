export interface LiteTreeNode {
    title: string;
    icon: string;
    expand: boolean;    
    level:number
    flag: string;
    comment:string
    style:string
    classs:string[]
    tags:string[]
    children?: LiteTreeNode[];
  }
  
export interface LiteTreeContext {    
    hasFlag:boolean  
    indent:number
    styles:Record<string,string>
    classs:Record<string,string>
    icons:Record<string,string>

}
export interface LiteTreeNodesProps {
  indent?: number;
  nodes: LiteTreeNode[];
}


export  interface LiteTreeIconsets{
  file: string
  folder: string
  folderExpand: string  
}