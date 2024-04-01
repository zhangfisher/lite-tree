import { Context } from "./context"
import type { LiteTreeContext,LiteTreeNode } from '@common/types'
import { useState } from "react"
import LiteTreeNodes from "./LiteTreeNodes"


export default () => {
    const [ctx,setCtx] = useState<LiteTreeContext>({
        hasFlag: false,
        indent: 20,
        styles: {},
        classs: {},
        icons: {},
    });

    return (
        <Context.Provider value={ctx}> 
            <div className="lite-tree">
                <LiteTreeNodes :nodes=""  ></LiteTreeNodes>
            </div>
        </Context.Provider>
    );
};
