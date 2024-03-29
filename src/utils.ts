import { inject } from 'vue';
/**
 *   使用正则表达式解析非标JOSN
 *
 */

// 匹配键名和值不规范的JSON字符串
// //const badJsonRegex = /(\s*[\w\u4e00-\u9fa5]+\s*(?=:))|((?=:\s*)\'.*\')|(\'.*?\'(?=\s*:))|((?<=:\s*)\'.*?\')/gm
// const badJsonRegex =/(\s*[\w\u4e00-\u9fa5]+\s*(?=:))|((?=:\s*)\'.*\')|(\'.*?\'(?=\s*:))|((?<=:\s*)\'.*?\')|((?<=,|\[\s*)\'.*?\')/gm

// 匹配未添加逗号的行
const addLineCommaRegex = /(?<!(\s*\,\s*)|([\[\{\}]\s*))\n(?!\s*\}\s*)/gm;

// 匹配使用""或''包裹字符串
const strVarRegex = /((?<!\\)\"|\')(.*?)((?<!\\)\1)/gm;
// 匹配任意没有使用""包裹的key
const badKeyRegex = /([\s\[\,\{\b]{1})(?<!\"])(\w+)(?!\")(\s*\:)/gm;

/**
 * 解析非标的JSON字符串为{}
 * 非标的JSON字符串指的是：
 *  - key没有使用使用""包裹
 *  - 字符串value没有使用""包裹
 *
 * @param {*} str
 * @returns
 */
export function safeParseJson(str: string, callback?: (key: string, value: any) => any) {
	// 先尝试解析一个JSON字符串，如果解析失败，再尝试进行修复
	try {
		return JSON.parse(str, (key, value) => {
			if (callback) {
				return callback(key, value);
			}
			return value;
		});
	} catch {}
	// 1. 如果行未添加逗号，添加逗号
	let resultStr = str.replaceAll(addLineCommaRegex, ",\n");
	// 2. 匹配使用""或''包裹字符串，全部编码以防止后继正则出错
	resultStr = resultStr.replaceAll(strVarRegex, (s, begin, value, end) => {
		return `\"${encodeURI(value)}\"`;
	});
	// 3. 将key处理没有""包裹的全部加上""
	resultStr = resultStr.replaceAll(badKeyRegex, (s, p1, value, p2) => {
		return `${p1}\"${value}\"${p2}`;
	});
	// 4. 将一些全角字符转换为半角字符，容错
	resultStr = resultStr.replaceAll("，", ",").replaceAll("“", '"').replaceAll("”", '"');
	return JSON.parse(resultStr, (key, value) => {
		if (typeof value == "string") value = decodeURI(value);
		if (callback) {
			return callback(key, value);
		}
		return value;
	});
}

/**
 * 替换样式变量
 * 将css里面的变量替换为实际的值
 * 例如:
 * replaceStyleVar("{#aaa;color:red;.bbb;}",{"#aaa":"font-size:9px;",".bbb":"border:none;"})
 *    =>  {font-size:9px;color:red;}
 * 
 * 注意: 类样式会被替换为空字符串
 * 
 * @param css 
 * @param vars 
 * @returns 
 */
export function replaceStyleVar(css:string,styles:Record<string,string>):string{
	const varRegex = /(?<!:)(([#\.]{1}\w+))\s*;\b(?!:)/g
	if(css.trim().endsWith(";")) css=css.trim()+";"
	return css.replace(varRegex,(matched,key)=>{
		if(key in styles){
			let r = styles[key]
			if(!r.endsWith(";")) r = r+";"
			return r
		}else if(matched.startsWith(".")){
			return ''
		}
		return matched
	})
}

/**
 * 压缩svg字符串
 *
 * @param svg
 * @returns
 */
export function compressSvg(svg: string) {
	return svg;
}


export interface InjectStylesheetOptions{
	id:string
	mode:'replace' | 'append' 
}

export function injectStylesheet(css:string,options?:InjectStylesheetOptions){
	const {id,mode} = Object.assign({mode:'replace'},options)
	let style = document.head.querySelector(`#${id}`)
	if(!style){
		style = document.createElement('style');
		style.innerHTML = css;
		style.id = id		
		document.head.appendChild(style);
		return style
	}	
	if(mode=='replace'){
		style.innerHTML = css
	}else{
		style.innerHTML += css
	}
	return style
}

/**
 * 对css字符串里面的所在的样式加上!important
 * @param css 
 */
export function enableImportant(css:string){
	return css.replace(/(.*?)(\s*;)/g,(matched,p1,p2)=>{
		if(p1.trim().endsWith("!important")) return matched
		return p1.trim() + "!important;"
	})
}

/**
 * pickStyle("{color:red}") = "color:red;
 * @param css 
 * @returns 
 */
export function pickStyle(css:string){
	css= css.trim()
	if(css.startsWith("{") && css.endsWith("}")){
		css = css.slice(1,-1)
	}
	css= css.trim()
	if(!css.endsWith(";")) css = css + ";"
	return css
}


/**
 * 解析样式字符串
 * 
 * 1. 将样式字符串里面的#aaa替换为vars里面的值
 * 2. 返回样式字符串里面的类名称列表
 * 
 * parseStyleString("#aaa;border:1px solid red;.bbb", {aaa:"color:red;"}) 
 * ==> {style:{color:red;border:"1px solid red;"},classs:[".bbb"]}
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
	if(!style.trim().endsWith(";")) style=style.trim()+";"
	style = style.replace(varRegex,(matched,key)=>{
		if(key in vars){
			let r = vars[key]
			if(!r.endsWith(";")) r = r+";"
			return r
		}else if(key.startsWith("#")){
			return ""
		}else if(matched.startsWith(".")){
			classList.push(key)
            return ""
		}
		return matched
	})
	return {style,classs:classList}
}

// /**
//  * 移除字符串中的样式
//  * 
//  * "{color:red}hello world"  =  "hello world"
//  * "{color:red}{border:1px solid red}hello world"  =  "{border:1px solid red}hello world"
//  * 
//  * @param str 
//  */
// export function removeStyledHead(str:string){
// 	if(typeof(str)!=="string") return str
// 	return str.replace(/^\{.*?\}/,"")
// }
/**
 * 一个简单的形式如
 * 
 * "{css样式}xxxx"的字符串，字符串开头的{xxxx}会被解析为css样式
 * 
 * 如：  withStyleString("{color:red}hello world")  =  ["color:red",hello world]
 * 
 * @param str 
 */
export function StyledString(str:string,styles:Record<string,string>){
    if(typeof(str)!=="string") return {style:"",value:str||''}
	const styleRegex =/^\{(.*?)\}/g
    let style:string='',classs:string[]=[]
	const value = str.replace(styleRegex,(matched,css)=>{
		const result = parseStyleString(css,styles)
		style = result.style
		classs.push(...result.classs)
		return ''
	})
    return {value,style,classs}
}
