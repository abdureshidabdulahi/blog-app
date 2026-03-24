import { useContext } from "react";
import { storeContext } from "../../context/storeContext";
import './userBlog.css'
import dompurify from 'dompurify'

 
const Blog = () => {
  const {content} = useContext(storeContext)
   return(
    <div className="container">
    {
      content.map((item)=>(
        <div className="each-content-container">
          {<img src={ `http://localhost:5137/images/${item.image}`} alt="header" />}
         <div dangerouslySetInnerHTML={{__html:dompurify.sanitize(item.description)}} />
        </div>
      ))
    }
    </div>
   )
};

export default Blog;