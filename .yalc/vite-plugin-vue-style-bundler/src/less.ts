import less from "less"

export default async function (code:string,options:Less.Options){
   return (await less.render(code,options)).css
}