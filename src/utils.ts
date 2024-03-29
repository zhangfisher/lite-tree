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
 * 移除字符串中的样式
 * 
 * "{color:red}hello world"  =  "hello world"
 * "{color:red}{border:1px solid red}hello world"  =  "{border:1px solid red}hello world"
 * 
 * @param str 
 */
export function removeStyledHead(str:string){
	if(typeof(str)!=="string") return str
	return str.replace(/^\{.*?\}/,"")
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
export function StyledString(str:string,styles:Record<string,string>){
    if(typeof(str)!=="string") return {style:"",value:str||''}
    let style = str.match(/^\{.*?\}/)?.[0]
	const classList = []
    if(style){
        str = str.replace(style,"")
        style = style.slice(1,-1) // 移除{}
		// 替换样式变量
        style = replaceStyleVar(style,styles)
		if(!style.endsWith(";")) style = style + ";"
		// 提取用到的样式类, 样式类在字符串中以.开头,以;结尾,没有{},如".success;"
		const clsRegex = /\.([\w\s*\.]+)\;/g
		// 提取clsRegex匹配到的样式类
		let matched
		while((matched = clsRegex.exec(style))!==null){
			const cls = matched[1]
			classList.push(cls)
		}
    }	
    return {style,value:str,classs:classList}
}

function replaceStyleVar(css:string,styles:Record<string,string>):string{
    if (typeof styles == "object") {
        Object.entries(styles).forEach(([key, val]) => {
            if (!val.endsWith(";")) val = val + ";";
            css = css!.replace(key, val);
        });
    }
    return css
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

