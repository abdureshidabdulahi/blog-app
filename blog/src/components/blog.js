import { useContext } from "react"; 
import { storeContext } from "./context/storeContext";
export default function Blogs(){  
    const {content} =useContext(storeContext)
    return(
        <div className="blogs-container"> 
            { content.map((item)=>(
            <div>
                <p>{item.title}</p>
                <p>{item.author}</p>
                <div 
                        className="blog-description"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                    />
            </div>
             ))}
        </div>
    )
}