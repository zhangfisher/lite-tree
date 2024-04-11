
export const SupportedIcons =  [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'vue',
    'md',
    'gif',
    'jpg',
    'jpeg',
    'png',
    'bmp',
    'webp',
    'ico',
    'tiff',
    'img',
    'txt',
    'svg',
    'java',
    'go',
    'less',
    'sass',
    'scss',
    'css',
    'htm',
    'html',
    'yaml',
    'pdf',
    'doc',
    'docx',
    'mp4',
    'avi',
    'mov',
    'wmv',
    'mpeg',
    'mpg',
    'rm',
    'ram',
    'swf',
    'flv',
    'video',
    'xls',
    'xlsx',
    'ppt',
    'pptx',
    'exe',
    'xml',
    'svelte',
    'cpp',
    'svelte',
]
export function getFileTypeIcon(node){
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
    // 取得文件扩展名，如果不包括'.'，则是文件
    if(title.indexOf('.')<0) return 'file'
    
    const ext = title.split('.').pop().toLowerCase()
    // ext不能是数字，如.11
    if(ext.length>1 && String(parseInt(ext))!==ext && !title.startsWith('.') && SupportedIcons.includes(ext)){
        return ext
    }
    return 'file'
}

