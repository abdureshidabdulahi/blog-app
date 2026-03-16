import { useState } from "react";
import { createContext } from "react";


export const storeContext = createContext(null)

const Contexts = (props)=>{
    const [token,setToken] =useState(localStorage.getItem('token'))
    const [showlogin,setshowlogin] = useState(false)

    const context={
                showlogin,
                setshowlogin,
                token,
                setToken,
    }

    return(
        <storeContext.Provider value={context}>
            {props.children}
        </storeContext.Provider>
    )
}
export default Contexts