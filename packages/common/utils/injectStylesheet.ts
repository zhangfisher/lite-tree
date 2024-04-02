import { randomId } from "./randomId";
import { enableScoped } from "./enableScoped"
export interface InjectStylesheetOptions{
	id:string
	mode?:'replace' | 'append',
	scoped?:boolean | string
}

export function injectStylesheet(css:string,options?:InjectStylesheetOptions){
	const {id,mode,scoped=true} = Object.assign({mode:'replace'},options)
	let style = document.head.querySelector(`#${id}`)
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
	}else{
		style.innerHTML += css
	}
	return scopeId
}
