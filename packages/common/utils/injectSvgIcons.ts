/**
 * 
 * 用于注入Svg图标到页面中
 * 
 */
/**
 * 创建一个容器来保存所有Svg图标
 * @returns 
 */
export function createSvgIconContainer(loc?:HTMLElement){
    if(globalThis.document==undefined) return
    let svgContainer = (loc || document).querySelector("#lite_tree_icons") as HTMLElement
    if(!svgContainer){
        svgContainer = document.createElement("style")
        svgContainer.id="lite_tree_icons"
        svgContainer.innerHTML = `.lite-tree .icon{
            display:inline-block;
            width:1em;
            height:1em;
            margin:0.2em;
        }`
        if(loc){
            loc.appendChild(svgContainer)              
        }else{
            document.head.appendChild(svgContainer)              
        } 
    }    
    return svgContainer
} 

/**
 * 压缩Svg数据，去掉一些无用的数据
 */
const compressRegex = /(\<\?xml(.*)?\?\>)|(\<\!DOCTYPE.*?\>)|(width\=\"\d+\"\s?)|(height\=\"\d+\"\s?)|(\bxmlns(\:\w+)?\=\".*?\"\s?)|(p\-id\=\"\d+\"\s?)|(t\=\"\d+\"\s?)|(version\=\".*?\"\s?)|(class\=\"\w+\"\s?)/gm;
function compressSvgData(svgData:string){
    return svgData.replace(compressRegex,'')
}
/**
 * 注入所有图标
 * @param svgIcons 
 * @param loc       注入的位置
 * @returns 
 */
export function injectSvgIcons(svgIcons:Record<string,string>,loc?:HTMLElement){
    if(globalThis.document==undefined) return
    const svgIconContainer = createSvgIconContainer(loc)
    for(let [name,define] of Object.entries(svgIcons)){
        const iconClassName = `.icon.${name}`
        const isSvg =define.startsWith("<svg") 
        const svgData=isSvg ? compressSvgData(define).replaceAll("<","%3C").replaceAll(">","%3E").replaceAll('"',"'") : define
        const iconStyle = `.lite-tree ${iconClassName}{
            mask-image: url("${isSvg ? `data:image/svg+xml,${svgData}` : svgData}");            
            -webkit-mask-image: url("${isSvg ? `data:image/svg+xml,${svgData}` : svgData}");
            -moz-mask-image: url("${isSvg ? `data:image/svg+xml,${svgData}` : svgData}");
        }`;
        if(svgIconContainer.innerHTML.includes(`.lite-tree ${iconClassName}`)) continue
        svgIconContainer.innerHTML = svgIconContainer.innerHTML + "\n" + iconStyle
    }
}
 