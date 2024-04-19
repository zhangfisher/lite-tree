import { enableImportant } from "./enableImportant";
import { injectStylesheet } from "./injectStylesheet";

export function injectCustomStyles(classs:Record<string,string>,el?:HTMLElement){
    injectStylesheet(`        
        ${Object.keys(classs).map(k=>`.lite-tree ${k} { ${enableImportant(classs[k])} }`).join('\n')} 
    `,{id:'lite-tree-custom-styles',mode:'replace',el})   
}
 