export interface LiteTreeNode {
    id: string;
    title: string;
    icon: string;
    open: boolean;    
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


export interface LiteTreeProps {
  format?: 'json' | 'lite'
  json?:boolean
  lite?:boolean
  data?:string
  // lite格式解析参数indent
  indent?: number;             
  // 图标集名称
  iconset?:string
  // 暗色模式
  dark?:boolean
  //根据节点数据动态解析图标名称
  getIcon?: (node:LiteTreeNode)=>string
}


export type LiteTreeParseResults = {
  hasFlag:boolean,              // 是否有标志列
  classs:Record<string,string>,
  styles:Record<string,string>,
  icons:Record<string,string>,
  nodes: LiteTreeNode[]
}