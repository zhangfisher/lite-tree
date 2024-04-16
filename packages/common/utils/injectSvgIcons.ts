/**
 * 
 * 用于注入Svg图标到页面中
 * 
 */
/**
 * 创建一个容器来保存所有Svg图标
 * @returns 
 */
export function getSvgIconContainer(callback?:(ele:HTMLElement)=>void){
    if(globalThis.document==undefined) return
    let svgContainer = document.querySelector("#lite_tree_icons") as HTMLElement
    if(!svgContainer){
        svgContainer = document.createElement("style")
        svgContainer.id="lite_tree_icons"
        svgContainer.innerHTML = `.lite-tree .icon{
            display:inline-block;
            width:1em;
            height:1em;
            margin:0.2em;
        }`
        document.head.appendChild(svgContainer)              
        if(callback){
            callback(svgContainer)
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
 * 注入所有icons文件夹中的图标
 */
export function injectSvgIcons(svgIcons:Record<string,string>){
    if(globalThis.document==undefined) return
    const svgIconContainer = getSvgIconContainer()
    for(let [name,define] of Object.entries(svgIcons)){
        const iconClassName = `.icon.${name}`
        const isSvg =define.startsWith("<svg") 
        const svgData=isSvg ? compressSvgData(define).replaceAll("<","%3C").replaceAll(">","%3E").replaceAll('"',"'") : define
        const iconStyle = `.lite-tree ${iconClassName}{
            background-color: transparent;
            color: currentColor;
            background-image: url("${isSvg ? `data:image/svg+xml,${svgData}` : svgData}");            
        }`;
        if(svgIconContainer.innerHTML.includes(`.lite-tree ${iconClassName}`)) continue
        svgIconContainer.innerHTML = svgIconContainer.innerHTML + "\n" + iconStyle
    }
}
 