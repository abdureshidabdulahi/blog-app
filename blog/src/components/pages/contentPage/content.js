 import ReactQuill from "react-quill"
 import './content.css'
 import 'react-quill/dist/quill.snow.css'
 import axios from 'axios' 
import { useContext, useEffect, useState } from "react"
import { storeContext } from "../../context/storeContext"

 const BlogForm = ()=>{
    const {token} =useContext(storeContext)
    const [image,setImage] =useState(null)
    const [previewUrl,setPreviewUrl] = useState(null)
    const [content,setContent] = useState({
        title:'',
        author:'',
        category:'',
        contents:''
    })

    const trigerFileInput = ()=>{
        document.getElementById('input-file').click()
    }

    const handlechange =(event)=>{
    const file = event.target.files[0]
        if(!file) return
        const previewImage = URL.createObjectURL(file)
        setImage(file)
        setPreviewUrl(previewImage)
    }
    const handleInput = (event)=>{
        const value = event.target.value
        const name = event.target.name
        setContent({...content,[name]:value})
    }
    const handleQuill = (value)=>{
        setContent({
            ...content,
            contents:value
        })
    }
    const handleSubmit =async (event)=>{
        event.preventDefault()
        const formData = new FormData()
        formData.append('title',content.title)
        formData.append('author',content.author)
        formData.append('category',content.category)
        formData.append('contents',content.contents)
        formData.append('image',image)
        await axios.post('http://localhost:5137/api/user/savecontent',formData,{headers:{token}})
        setContent({
            title:'',
            author:'',
            category:'',
            contents:''
        })

    }
    useEffect(()=>{
        console.log(content)
    },[content])
    return(
        <div className="container">
           <div className="headers">
           <h1>Create Content</h1>
           {
            image?<img src={previewUrl} alt="previewphoto" onClick={trigerFileInput}/>:<img src="/assets/upload_area.png" alt="upload" onClick={trigerFileInput}/>
           }
           <input type="file"  id="input-file" onChange={handlechange}/>
           <h3>Enter Your title Below</h3>
            <input type="text" placeholder="please enter title" value={content.title} name="title" onChange={handleInput}/>
            <h3>Enter The Author Below</h3>
            <input type="text" placeholder="please enter author" value={content.author} name="author" onChange={handleInput}/>
            <h3>Enter The Category Below</h3>
            <input type="text" placeholder="please enter category" value={content.category} name="category" onChange={handleInput}/>
           </div>
           <h2>Enter Your Description Below</h2>
           <div className="content" >
             <form onSubmit={handleSubmit}>
                <ReactQuill placeholder="please write your descriptions here" value={content.contents}  onChange={handleQuill}/>
                <button type="submit">Submit</button>
             </form>
           </div>

        </div>
    )
 }

 export default BlogForm