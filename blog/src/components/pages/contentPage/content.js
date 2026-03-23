 import ReactQuill from "react-quill"
 import './content.css'
 import 'react-quill/dist/quill.snow.css'
 import axios from 'axios' 

 const BlogForm = ()=>{
    return(
        <div className="container">
           <div className="headers">
           <h2>Create Content</h2>
            <input type="text" placeholder="please enter title"/>
            <input type="text" placeholder="please enter author"/>
            <input type="text" placeholder="please enter category"/>
           </div>
           <div className="content" >
             <form>
                <ReactQuill placeholder="please write your descriptions here"/>
             </form>
           </div>

        </div>
    )
 }

 export default BlogForm