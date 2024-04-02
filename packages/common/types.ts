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


export interface LiteTreeProps {
  format?: 'json' | 'lite'
  json?:boolean
  lite?:boolean
  // lite格式解析参数indent
  indent?: number;             
  // 图标集名称
  iconset?:string
}


export type LiteTreeParseResults = {
  hasFlag:boolean,              // 是否有标志列
  classs:Record<string,string>,
  styles:Record<string,string>,
  icons:Record<string,string>,
  nodes: LiteTreeNode[]
}