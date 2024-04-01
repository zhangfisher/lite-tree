//import MagicString from "magic-string";
// 匹配样式样式块, 必须有bundle
const styleRegex = /\<style(.*?)\>([\s\S]*?)\<\/style\>/gm
const stylePropsRegex = /\b(\w+)(\s*(\=)\s*(([\"\'])(.*?)\5)?)?/gm


/**
 * 解析样式标签中的属性
 * 
 * props="bundle lang='ts' scoped"
 * 
 * =={bundle:true,lang:"ts",scoped:true}
 * 
 */
export function parseStyleProps(str:string){
    
    let matched:RegExpExecArray | null;
    const props:Record<string,boolean | string > = {}
 
    while ((matched = stylePropsRegex.exec(str)) !== null) {
        // 这对于避免零宽度匹配的无限循环是必要的
        if (matched.index === stylePropsRegex.lastIndex) {
            stylePropsRegex.lastIndex++;
        }
        
        // 结果可以通过`m变量`访问。
        // @ts-ignore
        matched.forEach((match, groupIndex,groups) => {
            const name = groups[1]      
            const value = groups[6]
            props[name] = value==undefined ? true : value=='true' ? true : value=='false' ? false : value
        });
    }
    // 默认scoped为true
    if(props.scoped===undefined) props.scoped = true
    return props
}
export type StyleProps =Record<string,string | boolean>
export type StyleParseResult = [string, Array<[StyleProps, string]>]
/**
 * 
 * 使用styleRegex解析代码中的样式声明：
 * - 返回[[样式标签属性，样式内容],[样式标签属性，样式内容],...]
 * - 当clead=true时会清空code中的样式
 * 
 * @param code 
 * @param clean  解析来清空样式，因为将被注入到head 
 */
export function parseStyles(code:string,clean:boolean=true):StyleParseResult{

    let styles: Array<[Record<string,string | boolean>, string]> = [];  
    let match;  
  
    // 使用正则表达式匹配所有的<style>标签  
    while ((match = styleRegex.exec(code)) !== null) {  
        const props = parseStyleProps(match[1].trim())
        const css = match[2].trim()
        if(props.bundle) {
            styles.push([props, css]);    
            if (clean) {  
                if(props.scoped){
                    code = code.replace(match[0], '<style scoped>:v{}</style>');  
                }else{
                    code = code.replace(match[0], '');  
                }                
            }              
        }        
    }   
    return [code,styles] 

}

const setupScriptRegex = /(\<script\s*.*?\bsetup\s*.*?\>)([\s\S]*?)(\<\/script\s*>)/gm

/**
 * 
 * @param id 
 * @param props   样式style里面的属性,形式如{scoped:true}等，用来传递参数
 * @param css 
 */
export function injectCodeToSetup(code:string,{styleId,css}:{styleId:string,props:StyleProps,css:string}){
    
    const matched = setupScriptRegex.exec(code)
    const injectCode = `
    const $insertStylesheet = (id,css)=>{
        let style = document.getElementById('${styleId}')
        if(!style){
            style = document.createElement("style")
            style.id = '${styleId}'
            document.head.appendChild(style)            
            style.innerHTML = css
        }
    }
    $insertStylesheet('${styleId}',\`${css}\`)
    `
    if(matched===null){
        return `<script setup>${injectCode}</script>\n${code}`
    }else{
        //const s = new MagicString(code)        
        return code.replace(setupScriptRegex,`$1${injectCode}\n$2\n$3`)
    } 
}