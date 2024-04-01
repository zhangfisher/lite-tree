import { injectCodeToSetup, parseStyles } from "./parse";
import { shortHash } from "./utils";
import less from "./less";
import sass from "./sass";
import type { PluginOption } from "vite"; 
export interface StyleBundlerOptions {
	lessOptions?: Less.Options;
	sassOptions?: any;
} 

/**
 * 在一段CSS代码中为所有规则注入scope属性
 * @param css 
 * @param scopeId 
 */
function insertScopeId(css: string, scopeId: string) {
    const regex = /(?<=\}|^)([^\{\}]+)(?=\{)/gm;        
	// @ts-ignore
    return css.replace(regex, (match:string, rules:string) => {  
        return  rules.split(",").map(r=>{
			r=r.trim()
            if(r.startsWith("@")) return r
            const i = r.indexOf(":")
            if(i==-1){
                return "\n"+r + `[data-v-${scopeId}]`
            }else{
                return "\n"+r.slice(0,i) + `[data-v-${scopeId}]` + r.slice(i)
            }
        }).join(",")  
    });  
}

/**
 * 从Vue组件的编译代码中提取scopeId，被保存在['__scopeId',....]中
 * @param code 
 */
function pickScopeId(code:string){
    const match = /(\'|\")__scopeId\1\s*,\s*(\'|\")(data-v-\w+)\2/gm.exec(code);
    return match ? match[3] : null;
}

export default (options?: StyleBundlerOptions) => {
	const opts = Object.assign(
		{
			lessOptions: {},
			sassOptions: {},
		},
		options
	);
	const scopeIds = new Map<string, string>(); 
	// let building:boolean = false
	return [
		{
			name: "vue-style-bundler",
			enforce: "pre",
			async transform(code: string, id: string) {
				// 1. 只处理.vue文件
				if (!/.vue$/.test(id)) {
					return;
				}
				// 2. 检查是否有style
				let [newCode, styles] = parseStyles(code);
				// 3. 获取需要捆绑的样式
				if (styles.length > 0) {
					const fileId = shortHash(id);
					// 在<script setup>中插入代码
					for (const [props, css] of styles) {
						const styleId = typeof props.bundle == "string" ? props.bundle : fileId;       
						let compiledCss = css;                 
						if (props.lang == "less") {
							compiledCss = await less(css, opts.lessOptions);
						} else if (["sass", "scss"].includes(props.lang as string)) {
							compiledCss = await sass(css, opts.sassOptions);							
						}  
						if(props.scoped){
							// 此时template还没有被编译，无法得到scopeId，先用styleId代替
							compiledCss = insertScopeId(compiledCss, styleId);   
							scopeIds.set(id, styleId);
						}
						newCode = injectCodeToSetup(newCode, { styleId, props, css:compiledCss });
						
					}                    
					return newCode;
				} else {
					return code;
				}
			},
		},
		{
			name: "vue-style-bundler-post",
			enforce: "post",
			// configResolved(config:ResolvedConfig) {   
			// 	//building = config.command === 'build';   
			// },  
			async transform(code: string, id: string) {
				if(scopeIds.has(id.split("?")[0])){   
					const styleId = scopeIds.get(id) || '';                 
					const scopeId = pickScopeId(code);
					if(scopeId){
						code = code.replace(new RegExp(`data-v-\w+`,"g"),styleId);
						// if(building){
						// 	code=code.replace(/\s*_hoisted_[\w\$\d]+\s*\=\s*\{/gm,(matched:string)=>{
						// 		return `${matched}\n"${scopeId}":"",\n`
						// 	})
						// }
					}										
				} 		
				return code;
			},
		},
	]  as PluginOption
}; 
