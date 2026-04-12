import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";


export const storeContext = createContext(null)

const Contexts = (props)=>{
    const [token,setToken] =useState(localStorage.getItem('token'))
    const [allContents,setAllContent] = useState([])
    const [myBlogs,setMyBlogs] = useState([])
    const [showlogin,setshowlogin] = useState(false)
    const [userId,setUserId] = useState(null)

    // Decode token to get userId
    const decodeToken = (token) => {
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.id;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    useEffect(() => {
        if (token) {
            const id = decodeToken(token);
            setUserId(id);
        } else {
            setUserId(null);
        }
    }, [token]);

  
    // fetchContent from the backend

    const fetchAllContent =async ()=>{
   const result = await axios.get('http://localhost:5137/api/user/getcontent',{},{headers:{token}})
   setAllContent(result.data.listOfContents)
  
   if(result.data.success === true){
    // console.log('this is the content',result)
   }
   
    }
    const fetchUserBlog =async ()=>{
        const result = await axios.post('http://localhost:5137/api/user/myblogs',{},{headers:{token}})
            setMyBlogs(result.data.myBlogs)
    }
useEffect(()=>{
    fetchAllContent()
    fetchUserBlog()
},[])

const context={
    showlogin,
    setshowlogin,
    token,
    setToken, 
    myBlogs,
    allContents,
    userId
}
    return(
        <storeContext.Provider value={context}>
            {props.children}
        </storeContext.Provider>
    )
}
export default Contexts