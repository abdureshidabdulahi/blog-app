import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";


export const storeContext = createContext(null)

const Contexts = (props)=>{
    const [token,setToken] =useState(localStorage.getItem('token'))
    const [content,setContent] = useState([])
    const [showlogin,setshowlogin] = useState(false)

  
    // fetchContent from the backend

    const fetchContent =async ()=>{
   const result = await axios.get('http://localhost:5137/api/user/getcontent')
   setContent(result.data.listOfContents)
  
   if(result.data.success === true){
    // console.log('this is the content',result)
   }
   
    }
useEffect(()=>{
    fetchContent()
},[])

const context={
    showlogin,
    setshowlogin,
    token,
    setToken,
    content
}
    return(
        <storeContext.Provider value={context}>
            {props.children}
        </storeContext.Provider>
    )
}
export default Contexts