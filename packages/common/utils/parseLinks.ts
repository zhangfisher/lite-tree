
/**
 * 解析字符串里面的链接,如"I am a string with [link](www.baidu.com),is cool"
 * 返回
 * ["I am a string with ",{link:"www.baidu.com",text:"link"},"is cool"]
 * @param content 
 */
export function parseLinks(content:string){
    const regex = /\[([^\[\]]*?)(\:(\w+))?\]\((([^\(\\\s)]+)(\s+[\w\u4e00-\u9fa5\w]+)?)\)/g
    const result = content.replace(regex,(matched,label,_1,icon,_2,link,tips)=>{
        return `<a style='display:inline-flex;align-items:center;' ${tips ? 'title='+tips : ''} class='action' target='_blank' href='${link}'>${icon ? `<span class='icon ${icon}'></span>`:''}${label}</a>`
    })       
    return result  
}