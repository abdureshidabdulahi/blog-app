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
    const modules = {
        toolbar:[
            [{'header':[3,4,5]}],
            ['bold','italic','underline'],
            [{list:'ordered'},{list:'bullet'}],
            ['link'],
            ['clean']
        ]
    }
    const formats =[
        'header',
        'bold','italic','underline',
        'list','bullet',
        'link'
    ]

    const trigerFileInput = ()=>{
        document.getElementById('input-file').click()
    }

    const handlechange =(event)=>{
    const file = event.target.files[0]
    // console.log(file)
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
        console.log('this is the form',formData)
        await axios.post('http://localhost:5137/api/user/savecontent',formData,{headers:{token}})
        setContent({
            title:'',
            author:'',
            category:'',
            contents:''
        })
        setImage(null)
        setPreviewUrl(null)
    }
    useEffect(()=>{
        console.log(content)
    },[content])
    return(
        <div className="container"> 
           <h1>Create Content</h1>
           {
            image?<img src={previewUrl} alt="previewphoto" onClick={trigerFileInput}/>:<img src="/assets/upload_area.png" alt="upload" onClick={trigerFileInput}/>
           }
           <form onSubmit={handleSubmit}>
           <input type="file"  id="input-file" onChange={handlechange}/>
           <h3>Enter Your title Below</h3>
            <input type="text" placeholder="please enter title" value={content.title} name="title" onChange={handleInput}/>
            <h3>Enter The Author Below</h3>
            <input type="text" placeholder="please enter author" value={content.author} name="author" onChange={handleInput}/>
            <h3>Enter The Category Below</h3>
            <input type="text" className="category" placeholder="please enter category" value={content.category} name="category" onChange={handleInput}/>
          
           <h2>Enter Your Description Below</h2>
            
             
                <ReactQuill formats={formats} modules={modules} placeholder="please write your descriptions here" value={content.contents}  onChange={handleQuill}/>
                <button type="submit">Submit</button>
             </form>
            

        </div>
    )
 }

 export default BlogForm