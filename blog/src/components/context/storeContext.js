import { useState } from "react";
import { createContext } from "react";


export const storeContext = createContext(null)

const Contexts = (props)=>{
    const [showlogin,setshowlogin] = useState(false)

    const context={
                showlogin,
                setshowlogin
    }

    return(
        <storeContext.Provider value={context}>
            {props.children}
        </storeContext.Provider>
    )
}
export default Contexts