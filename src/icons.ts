
const icons={
    file:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTI1LjcgOS4zbC03LTdjLS4yLS4yLS40LS4zLS43LS4zSDhjLTEuMSAwLTIgLjktMiAydjI0YzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWMTBjMC0uMy0uMS0uNS0uMy0uN3pNMTggNC40bDUuNiA1LjZIMThWNC40ek0yNCAyOEg4VjRoOHY2YzAgMS4xLjkgMiAyIDJoNnYxNnoiLz48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xMCAyMmgxMnYySDEwem0wLTZoMTJ2MkgxMHoiLz48L3N2Zz4=',
    folder:`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTUgNGg0bDMgM2g3YTIgMiAwIDAgMSAyIDJ2OGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMlY2YTIgMiAwIDAgMSAyLTIiLz48L3N2Zz4=`,
    "folder-expand":`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0ibTUgMTlsMi43NTctNy4zNTFBMSAxIDAgMCAxIDguNjkzIDExSDIxYTEgMSAwIDAgMSAuOTg2IDEuMTY0bC0uOTk2IDUuMjExQTIgMiAwIDAgMSAxOS4wMjYgMTl6YTIgMiAwIDAgMS0yLTJWNmEyIDIgMCAwIDEgMi0yaDRsMyAzaDdhMiAyIDAgMCAxIDIgMnYyIi8+PC9zdmc+`,
    arrow:`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9IiNhYmFiYWIiIGQ9Im0xMiA4bDEwIDhsLTEwIDh6Ii8+PC9zdmc+`,
    tag:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEwIDE0YTQgNCAwIDEgMSA0LTRhNC4wMDUgNC4wMDUgMCAwIDEtNCA0Wm0wLTZhMiAyIDAgMSAwIDEuOTk4IDIuMDA0QTIuMDAyIDIuMDAyIDAgMCAwIDEwIDhaIi8+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTYuNjQ0IDI5LjQxNUwyLjU4NiAxNS4zNTRBMiAyIDAgMCAxIDIgMTMuOTQxVjRhMiAyIDAgMCAxIDItMmg5Ljk0MWEyIDIgMCAwIDEgMS40MTQuNTg2bDE0LjA2IDE0LjA1OGEyIDIgMCAwIDEgMCAyLjgyOGwtOS45NDMgOS45NDNhMiAyIDAgMCAxLTIuODI5IDBaTTQgNHY5Ljk0MkwxOC4wNTggMjhMMjggMTguMDU4TDEzLjk0MiA0WiIvPjwvc3ZnPg==",
    checked:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjEgMjEiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTUuNSAzLjVoMTBhMiAyIDAgMCAxIDIgMnYxMGEyIDIgMCAwIDEtMiAyaC0xMGEyIDIgMCAwIDEtMi0ydi0xMGEyIDIgMCAwIDEgMi0yIi8+PHBhdGggZD0ibTcuNSAxMC41bDIgMmw0LTQiLz48L2c+PC9zdmc+",
    unchecked:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjEgMjEiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik01LjUgMy41aDEwYTIgMiAwIDAgMSAyIDJ2MTBhMiAyIDAgMCAxLTIgMmgtMTBhMiAyIDAgMCAxLTItMnYtMTBhMiAyIDAgMCAxIDItMiIvPjwvc3ZnPg==",
    star:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTIyIDkuMjRsLTcuMTktLjYyTDEyIDJMOS4xOSA4LjYzTDIgOS4yNGw1LjQ2IDQuNzNMNS44MiAyMUwxMiAxNy4yN0wxOC4xOCAyMWwtMS42My03LjAzek0xMiAxNS40bC0zLjc2IDIuMjdsMS00LjI4bC0zLjMyLTIuODhsNC4zOC0uMzhMMTIgNi4xbDEuNzEgNC4wNGw0LjM4LjM4bC0zLjMyIDIuODhsMSA0LjI4eiIvPjwvc3ZnPg=="
}

/**
 * 创建一个容器来保存所有Svg图标
 * @returns 
 */
export function getSvgIconContainer(){
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
    const svgIconContainer = getSvgIconContainer()
    for(let [name,define] of Object.entries({...svgIcons,...icons})){
        const iconClassName = `.icon.${name}`
        const isSvg =define.startsWith("<svg") 
        const svgData=isSvg ? compressSvgData(define).replaceAll("<","%3C").replaceAll(">","%3E").replaceAll('"',"'") : define

        const iconStyle = `.lite-tree ${iconClassName}{
            background-color: currentColor;
            mask-image: url("${isSvg ? `data:image/svg+xml,${svgData}` : svgData}");            
        }`;
        if(svgIconContainer.innerHTML.includes(`.lite-tree ${iconClassName}`)) continue
        svgIconContainer.innerHTML = svgIconContainer.innerHTML + "\n" + iconStyle
    }
}
 