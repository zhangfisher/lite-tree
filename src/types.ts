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
  


//  mark: 'success' | 'warning' | 'error' | 'info';