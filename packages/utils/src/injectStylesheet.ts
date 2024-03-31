
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
