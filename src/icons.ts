
const icons={
    // file:`<svg xmlns='http://www.w3.org/2000/svg' viewBox="0 0 1024 1024"><path d="M842.667 981.333H181.333A53.393 53.393 0 0 1 128 928V96a53.393 53.393 0 0 1 53.333-53.333H648.08a52.987 52.987 0 0 1 37.713 15.62L880.38 252.873A52.987 52.987 0 0 1 896 290.587V928a53.393 53.393 0 0 1-53.333 53.333zm-661.334-896A10.667 10.667 0 0 0 170.667 96v832a10.667 10.667 0 0 0 10.666 10.667h661.334A10.667 10.667 0 0 0 853.333 928V298.667h-160A53.393 53.393 0 0 1 640 245.333v-160zM682.667 115.5v129.833A10.667 10.667 0 0 0 693.333 256h129.834zM704 768H320a21.333 21.333 0 0 1 0-42.667h384A21.333 21.333 0 0 1 704 768zm0-213.333H320A21.333 21.333 0 0 1 320 512h384a21.333 21.333 0 0 1 0 42.667zm-213.333-256H320A21.333 21.333 0 0 1 320 256h170.667a21.333 21.333 0 0 1 0 42.667z"/></svg>`,
    //<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m25.7 9.3l-7-7c-.2-.2-.4-.3-.7-.3H8c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-.3-.1-.5-.3-.7zM18 4.4l5.6 5.6H18V4.4zM24 28H8V4h8v6c0 1.1.9 2 2 2h6v16z"/><path fill="currentColor" d="M10 22h12v2H10zm0-6h12v2H10z"/></svg>
    file:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTI1LjcgOS4zbC03LTdjLS4yLS4yLS40LS4zLS43LS4zSDhjLTEuMSAwLTIgLjktMiAydjI0YzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWMTBjMC0uMy0uMS0uNS0uMy0uN3pNMTggNC40bDUuNiA1LjZIMThWNC40ek0yNCAyOEg4VjRoOHY2YzAgMS4xLjkgMiAyIDJoNnYxNnoiLz48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xMCAyMmgxMnYySDEwem0wLTZoMTJ2MkgxMHoiLz48L3N2Zz4=',
    folder:`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTUgNGg0bDMgM2g3YTIgMiAwIDAgMSAyIDJ2OGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMlY2YTIgMiAwIDAgMSAyLTIiLz48L3N2Zz4=`,
    "folder-open":`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0ibTUgMTlsMi43NTctNy4zNTFBMSAxIDAgMCAxIDguNjkzIDExSDIxYTEgMSAwIDAgMSAuOTg2IDEuMTY0bC0uOTk2IDUuMjExQTIgMiAwIDAgMSAxOS4wMjYgMTl6YTIgMiAwIDAgMS0yLTJWNmEyIDIgMCAwIDEgMi0yaDRsMyAzaDdhMiAyIDAgMCAxIDIgMnYyIi8+PC9zdmc+`,
    arrow:`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9IiNhYmFiYWIiIGQ9Im0xMiA4bDEwIDhsLTEwIDh6Ii8+PC9zdmc+`,
    tag:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEwIDE0YTQgNCAwIDEgMSA0LTRhNC4wMDUgNC4wMDUgMCAwIDEtNCA0Wm0wLTZhMiAyIDAgMSAwIDEuOTk4IDIuMDA0QTIuMDAyIDIuMDAyIDAgMCAwIDEwIDhaIi8+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTYuNjQ0IDI5LjQxNUwyLjU4NiAxNS4zNTRBMiAyIDAgMCAxIDIgMTMuOTQxVjRhMiAyIDAgMCAxIDItMmg5Ljk0MWEyIDIgMCAwIDEgMS40MTQuNTg2bDE0LjA2IDE0LjA1OGEyIDIgMCAwIDEgMCAyLjgyOGwtOS45NDMgOS45NDNhMiAyIDAgMCAxLTIuODI5IDBaTTQgNHY5Ljk0MkwxOC4wNTggMjhMMjggMTguMDU4TDEzLjk0MiA0WiIvPjwvc3ZnPg=="
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
            background-image: url("${isSvg ? `data:image/svg+xml,${svgData}` : svgData}");
        }`;
        if(svgIconContainer.innerHTML.includes(`.lite-tree ${iconClassName}`)) continue
        svgIconContainer.innerHTML = svgIconContainer.innerHTML + "\n" + iconStyle
    }
}
 