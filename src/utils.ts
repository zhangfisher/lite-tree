/**
 *   使用正则表达式解析非标JOSN
 * 
 */


// 匹配键名和值不规范的JSON字符串
// //const badJsonRegex = /(\s*[\w\u4e00-\u9fa5]+\s*(?=:))|((?=:\s*)\'.*\')|(\'.*?\'(?=\s*:))|((?<=:\s*)\'.*?\')/gm
// const badJsonRegex =/(\s*[\w\u4e00-\u9fa5]+\s*(?=:))|((?=:\s*)\'.*\')|(\'.*?\'(?=\s*:))|((?<=:\s*)\'.*?\')|((?<=,|\[\s*)\'.*?\')/gm


// 匹配未添加逗号的行
const addLineCommaRegex = /(?<!(\s*\,\s*)|([\[\{\}]\s*))\n(?!\s*\}\s*)/gm

// 匹配使用""或''包裹字符串   
const strVarRegex = /((?<!\\)\"|\')(.*?)((?<!\\)\1)/gm
// 匹配任意没有使用""包裹的key
const badKeyRegex = /([\s\[\,\{\b]{1})(?<!\"])(\w+)(?!\")(\s*\:)/gm

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
    console.log("JSONTree = ",str)
    // 先尝试解析一个JSON字符串，如果解析失败，再尝试进行修复
    try{
        return JSON.parse(str,(key,value)=>{
            if(callback){
                return callback(key,value)
            }
            return value
        })
    }catch{}
    

    // 1. 如果行未添加逗号，添加逗号
    let resultStr = str.replaceAll(addLineCommaRegex,",\n")
    // 2. 匹配使用""或''包裹字符串，全部编码以防止后继正则出错
    resultStr = resultStr.replaceAll(strVarRegex,(s,begin,value,end)=>{
        return `\"${encodeURI(value)}\"`
    })
    // 3. 将key处理没有""包裹的全部加上""
    resultStr = resultStr.replaceAll(badKeyRegex,(s,p1,value,p2)=>{
        return `${p1}\"${value}\"${p2}`
    })
    // 4. 将一些全角字符转换为半角字符，容错
    resultStr = resultStr.replaceAll("，",",")
        .replaceAll("“","\"")
        .replaceAll("”","\"")


   
    return JSON.parse(resultStr,(key,value)=>{
        if(typeof(value)=="string") value= decodeURI(value)
        if(callback){
            return callback(key,value)
        }
        return value
    }) 
    
} 
 
 
/**
 * 一个简单的形式如
 * 
 * "{css样式}xxxx"的字符串，字符串开头的{xxxx}会被解析为css样式
 * 
 * 如：  withStyleString("{color:red}hello world")  =  ["color:red",hello world]
 * 
 * @param str 
 */
export function withStyleString(str:string){
    let style = str.match(/^\{.*?\}/)?.[0]
    if(style){
        str = str.replace(style,"")
        style = style.slice(1,-1)
    }
    return {style,value:str}
}