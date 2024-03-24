export interface LiteTreeNode {
    title: string;
    icon: string;
    open: boolean;    
    level:number
    mark: 'success' | 'warning' | 'error' | 'info';
    diff: 'add' | 'delete' | 'modify' | "+" | "-" | "*";
    comment:string
    style:string
    prefix:string
    tags:string[]
    children?: LiteTreeNode[];
  }
  


