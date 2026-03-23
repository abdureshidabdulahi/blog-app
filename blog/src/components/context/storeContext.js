import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";


export const storeContext = createContext(null)

const Contexts = (props)=>{
    const [token,setToken] =useState(localStorage.getItem('token'))
    const [content,setContent] = useState([])
    const [showlogin,setshowlogin] = useState(false)

    const context={
                showlogin,
                setshowlogin,
                token,
                setToken,
    }
    // fetchContent from the backend

    const fetchContent =async ()=>{
   const result = await axios.get('http://localhost:5137/api/user/getcontent')
   if(result.success === true){
    console.log('this is the content',result.data)
   }
   
    }
useEffect(()=>{
    fetchContent()
})
    return(
        <storeContext.Provider value={context}>
            {props.children}
        </storeContext.Provider>
    )
}
export default Contexts