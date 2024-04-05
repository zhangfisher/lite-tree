
/**
 * 解析样式字符串
 * 
 * 1. 将样式字符串里面的#aaa替换为vars里面的值
 * 2. 返回样式字符串里面的类名称列表
 * 
 * parseStyleString("#aaa;border:1px solid red;.bbb", {aaa:"color:red;"}) 
 * ==> {style:{color:red;border:"1px solid red;"},classs:["bbb"]}
 * 
 * 
 * @param str 
 * @returns 
 */
export function parseStyleString(str:string | undefined,vars:Record<string,string>){
	let style = str
	if(!style || style.trim().length==0) return {style:"",classs:[]}	
	const classList:string[] = []
	const varRegex = /(?<!:)(([#\.]{1}\w+))\s*;(?!:)/g
	if(style.startsWith("{")) style = style.substring(1)
	if(style.endsWith("}")) style = style.substring(0,style.length-1)
	if(!style.trim().endsWith(";")) style=style.trim()+";"
	style = style.replace(varRegex,(matched,key)=>{
		if(key in vars){
			let r = vars[key]
			if(!r.endsWith(";")) r = r+";"
			return r
		}else if(key.startsWith("#")){
			return ""
		}else if(matched.startsWith(".")){
			classList.push(key.substring(1))
            return ""
		}
		return matched
	})
	return {style,classs:classList}
}

 
/**
 * 
 * 解析带样式和图标的字符串
 * 
 * 
 * - "{css样式}xxxx"的字符串，字符串开头的{xxxx}会被解析为css样式
 * - 字符串中的[xxx]会被解析为图标
 * 
 * 如：  
 *  - StyledString("{color:red;}hello world")  ==  {style:"color:red",value:'hello world'}
 * - StyledString("{color:red;}hello [world]")  ==  {style:"color:red",value:'hello world<span 'icon world'></span>'}
 *  
 * 
 * 
 * @param str 
 */
export function StyledString(str:string,styles:Record<string,string>){
    if(typeof(str)!=="string") return {style:"",value:str||''}
	const styleRegex =/^\{(.*?)\}/g
    let style:string='',classs:string[]=[]
	let value = str.replace(styleRegex,(matched,css)=>{
		const result = parseStyleString(css,styles)
		style = result.style
		classs.push(...result.classs)
		return ''
	})
	// 解析图标
	const iconRegex = /\[([\w\.\-\_]+)\]/g
	value = value.replace(iconRegex,(matched,iconName)=>{
		return `<span class="icon ${iconName}"></span>`
	})
    return {value,style,classs}
}
