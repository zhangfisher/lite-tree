import { StringOptions, compileStringAsync } from "sass"

export default async function (code:string,options:StringOptions<'async'>){   
   return (await compileStringAsync(code,options)).css
}