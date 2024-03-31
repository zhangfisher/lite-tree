//  /**
//  * 解析带有样式的字符串。
//  * 
//  * @param str - 需要解析的字符串，形如 "{css样式字符串}aaaaa{css样式字符串}字符串"。
//  * @param styles - 样式变量的映射，形如 { varName: 'cssValue' }。
//  * @returns 返回一个数组，每个元素是一个二元组，形如 [string, string]，其中第一个元素是字符串，第二个元素是对应的样式字符串。
//  * 
//  * 此函数首先使用正则表达式将输入字符串分割为多个部分，然后交换样式和文本的顺序。
//  * 然后，对于每个部分，如果它后面有一个样式部分，就将它们作为一个二元组添加到结果数组中。
//  * 如果一个部分后面没有样式部分，就将它和一个空字符串作为一个二元组添加到结果数组中。
//  */
//  function parseStyledString(str: string,styles:Record<string,string>): [string,string][]  {
// 	const regex = /(\\?\{[^{}]+\}\\?)/g;
// 	const result: [string, string][] = [];
//     let splited = str.split(regex)
//     const isStyle = (s:string)=>s.startsWith("{") && s.endsWith("}")
//     // 1. 交换样式与文本顺序
//     for(let i=0;i<splited.length;i++){
//         const s = splited[i]
//         if(s.startsWith("{") && s.endsWith("}")){
//             if(i<splited.length-1){
//                 [splited[i], splited[i + 1]] = [splited[i + 1], splited[i]];
//             }
//         }
//     }
//     // 2. 
//     for(let i=0;i<splited.length;i++){
//         if(splited[i].trim()=='') continue
//         const next = splited[i+1]
//         if(next && isStyle(next)){            
//             result.push([splited[i],replaceStyleVar(next.substring(1,next.length-1),styles,{})])
//             i++
//         }else if(!isStyle(splited[i])){
//             result.push([splited[i],''])
//         }
//     }  
// 	return  result;
//   }


// /**
//  * 替换样式变量
//  * 将css里面的变量替换为实际的值
//  * 例如:
//  * replaceStyleVar("{#aaa;color:red;.bbb;}",{"#aaa":"font-size:9px;",".bbb":"border:none;"})
//  *    =>  {font-size:9px;color:red;}
//  * 
//  * 注意: 类样式会被替换为空字符串
//  * 
//  * @param css 
//  * @param vars 
//  * @returns 
//  */
// export function replaceStyleVar(css:string,styles:Record<string,string>):string{
// 	const varRegex = /(?<!:)(([#\.]{1}\w+))\s*;\b(?!:)/g
// 	if(css.trim().endsWith(";")) css=css.trim()+";"
// 	return css.replace(varRegex,(matched,key)=>{
// 		if(key in styles){
// 			let r = styles[key]
// 			if(!r.endsWith(";")) r = r+";"
// 			return r
// 		}else if(matched.startsWith(".")){
// 			return ''
// 		}
// 		return matched
// 	})
// }