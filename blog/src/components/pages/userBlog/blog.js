import { useContext } from "react";
import { storeContext } from "../../context/storeContext";
import './userBlog.css'
import dompurify from 'dompurify'

 
const Blog = () => {
  const {myBlogs} = useContext(storeContext)
   return(
    <div className="container">
    {
      myBlogs.map((item)=>(
        <div className="each-content-container">
          {<img src={ `http://localhost:5137/images/${item.image}`} alt="header" />}
          <h1>{item.title}</h1>
         <div dangerouslySetInnerHTML={{__html:dompurify.sanitize(item.description)}} className="quill"/>
         <hr />
        </div>
      ))
    }
    </div>
   )
};

export default Blog;