
export function handleNodeClick(e:MouseEvent,emit:any){
    const target = e.target as HTMLElement
    const nodeEle = target.closest('.lite-tree-node')
    if(nodeEle){
        const nodeId=nodeEle.getAttribute("data-node-id")
        const param ={
            position:'node',
            node:nodeId,
            element:target
        }
        if(target.classList.contains('tag')){
            param.position='tag'
        }else if(target.classList.contains('flag')){
            param.position='flag'
        }else if(target.classList.contains('comment')){
            param.position='comment'
        }else if(target.classList.contains('action')){
            param.position='action'
        }else if(target.closest("span.title")){
            param.position='title'
        }else if(target.closest("span.flag")){
            param.position='flag'
        }
        emit(param)
        
        e.stopPropagation()
    }    
}


