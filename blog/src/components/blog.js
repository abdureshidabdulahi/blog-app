import { useContext } from "react";
import { storeContext } from "./context/storeContext";

 
const Blog = () => {
  const {content} = useContext(storeContext)
   return(
    <div className="container">
    {
      content.map((item)=>(
        <p>{item.description}</p>
      ))
    }
    </div>
   )
};

export default Blog;