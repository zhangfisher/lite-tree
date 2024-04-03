import { randomId } from "./randomId";
import { enableScoped } from "./enableScoped"
export interface InjectStylesheetOptions{
	id:string
	// 默认仅当指定id的样式不存在时注入
	mode?:'replace' | 'append' | 'default',
	scoped?:boolean | string,
	// 当样式已经存在时的回调
	onExist?:(style:HTMLStyleElement)=>void
}

export function injectStylesheet(css:string,options?:InjectStylesheetOptions){
	const {id,mode,scoped=true} = Object.assign({mode:'default'},options)
	let style = document.head.querySelector(`#${id}`) as HTMLStyleElement
	let scopeId:string | undefined
	if(!style){
		if(scoped){
			scopeId = scoped==true ? randomId() : scoped
			css = enableScoped(css,scopeId)
		}
		style = document.createElement('style');
		style.innerHTML = css;
		style.id = id		
		document.head.appendChild(style); 
		return style
	}		
	if(mode=='replace'){
		style.innerHTML = css
	}else if(mode=='append'){
		style.innerHTML += css
	}
	return scopeId
}
