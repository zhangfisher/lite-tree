import { LiteTreeDataFormat } from "../types";


/**
 * 根据树数据推断是json或lite格式
 * @param treeData 
 */
export function getTreeFormat(treeData:String):LiteTreeDataFormat{
    if((treeData.startsWith('[') && treeData.endsWith(']')) || (treeData.startsWith('{') && treeData.endsWith('}'))){
        return 'json'
    }else{
        return 'lite'
    }
}