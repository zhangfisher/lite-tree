import type { LiteTreeNode } from "../types";

export function getIcon(node:LiteTreeNode):string{
    // 优先使用节点数据中指定的图标
    const icon= String(node.icon).trim()    
    if(icon.length>0) return node.icon
    // 如果节点有子节点，使用默认图标folder-open/folder
    if(node.children && node.children.length>0){
        const isOpen = node.open==undefined ? true : node.open;
        return isOpen ? 'folder-open' : 'folder'
    }
    const title = node.title.trim()
    // 如果节点的标题以'/'结尾代表是一个文件夹，使用默认图标folder
    if(title.endsWith('/')) {        
        node.icon="folder"
        node.title = title.slice(0,-1)
        return 'folder'
    }
    return 'file'
}