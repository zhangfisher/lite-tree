
/**
 * 实现将一个标准的css style字符串转换为react的样式对象
 */


export function toStyleObject(css:string | undefined){
    const style:Record<string,any> = {};
    (css||'').split(";").forEach((item)=>{
        if(item.trim().length>0){
            let [key,...values] = item.split(":")
            key = key.replace(/-([a-z])/g,(_,letter)=>letter.toUpperCase())
            style[key.trim()] = values.join(':')
        }
    })
    return style
}