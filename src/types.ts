export interface LiteTreeNode {
    id?: string;
    title: string;
    icon?: string;
    open?: boolean;    
    mark?: 'success' | 'warning' | 'error' | 'info';
    diff?: 'add' | 'delete' | 'modify' | "+" | "-" | "*";
    comment?:string
    style?:string
    prefix?:string
    tags?:string[]
    children?: LiteTreeNode[];
  }
  