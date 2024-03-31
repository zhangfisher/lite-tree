import { Context } from "./context"
import type { LiteTreeContext } from "../../../src/types"
import { useState } from "react"
 
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
            {/* Add your child components here */}
        </Context.Provider>
    );
};
