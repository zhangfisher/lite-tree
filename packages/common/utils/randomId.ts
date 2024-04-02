
export function randomId(len:number =10){
    return Math.random().toString(36).substring(2, len+2)
} 