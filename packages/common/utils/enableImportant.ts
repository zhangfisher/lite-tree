
 


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
 
 