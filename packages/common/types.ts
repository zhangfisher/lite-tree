import { getIcon } from './utils/getIcon';
export interface LiteTreeNode {
    id: string;
    title: string;
    icon: string;
    open: boolean;    
    level:number
    flag: '+' | '-' | '*' | '!' | 'x' | 'v'  | string;
    diff?: '+' | '-' | '*' 
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
    getIcon:(node:LiteTreeNode)=>string
}
export interface LiteTreeNodesProps {
  indent?: number;
  nodes: LiteTreeNode[];
}

export type LiteTreeDataFormat  = 'json' | 'lite'
export interface LiteTreeProps {
  format?: LiteTreeDataFormat
  json?:boolean
  lite?:boolean
  data?:string
  // lite格式解析参数indent
  indent?: number;             
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




export type LiteTreeEvents = 'expand' | 'collapse' | 'click'

export type LiteTreeClickPosition = 'title' | 'tag'  | 'flag' | 'comment' | 'icon' | 'opener'
export type LiteTreeClickParams = {
    position:LiteTreeClickPosition
    node:string        // 节点id
    element:HTMLElement
}

