

/**
 * 在一段CSS代码中为所有规则注入scope属性
 * @param css 
 * @param scopeId 
 */
export function enableScoped(css: string, scopeId: string) {
    const regex = /(?<=\}|^)([^\{\}]+)(?=\{)/gm;        
	// @ts-ignore
    return css.replace(regex, (match:string, rules:string) => {  
        return  rules.split(",").map(r=>{
			r=r.trim()
            if(r.startsWith("@")) return r
            const i = r.indexOf(":")
            if(i==-1){
                return "\n"+r + `[${scopeId}]`
            }else{
                return "\n"+r.slice(0,i) + `[${scopeId}]` + r.slice(i)
            }
        }).join(",")  
    });  
}