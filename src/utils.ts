/**
 *   使用正则表达式解析非标JOSN
 * 
 */


// 匹配键名和值不规范的JSON字符串
//const badJsonRegex = /(\s*[\w\u4e00-\u9fa5]+\s*(?=:))|((?=:\s*)\'.*\')|(\'.*?\'(?=\s*:))|((?<=:\s*)\'.*?\')/gm
const badJsonRegex =/(\s*[\w\u4e00-\u9fa5]+\s*(?=:))|((?=:\s*)\'.*\')|(\'.*?\'(?=\s*:))|((?<=:\s*)\'.*?\')|((?<=,|\[\s*)\'.*?\')/gm


// 匹配未添加逗号的行
const addLineCommaRegex = /(?<!(\s*\,\s*)|([\[\{\}]\s*))\n(?!\s*\}\s*)/gm

/**
 * 解析非标的JSON字符串为{}
 * 非标的JSON字符串指的是：
 *  - key没有使用使用""包裹
 *  - 字符串value没有使用""包裹
 *  
 * @param {*} str 
 * @returns 
 */
export function safeParseJson(str:string,callback?:(key:string,value:any)=>any){
    let matched;     
    // 如果行未添加,则添加
    let resultStr = str.replaceAll(addLineCommaRegex,",\n")
                .replaceAll("，",",")
                .replaceAll("“","\"")
                .replaceAll("”","\"")
    while ((matched = badJsonRegex.exec(resultStr)) !== null) {
        if (matched.index === badJsonRegex.lastIndex) {
            badJsonRegex.lastIndex++;
        }                
        let oldLen = resultStr.length
        let item = matched[0].trim()
        const matchedLength = matched[0].length
        if(item.startsWith("'") && item.endsWith("'")){
            item = item.substring(1,item.length-1)
        }
        item = '"'+item+'"'
        resultStr = `${resultStr.substring(0,matched.index)}${item}${resultStr.substring(matched.index+matchedLength)}`
        badJsonRegex.lastIndex += resultStr.length - oldLen
    }
    try{
        return JSON.parse(resultStr,callback)
    }catch(e){
        return JSON.parse(str,callback)
    }
    
} 
 
 