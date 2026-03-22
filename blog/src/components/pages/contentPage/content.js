 import { useState } from 'react'
import './content.css'
import { useEffect } from 'react'


const Content = ()=>{
    const [previewImage,setPreviewImage] =useState(null)
    const [file,setFile] = useState(null)
    const [data,setData] = useState({
        title:'',
        description:'',
        author:'', 


    })
 
    const handleImage = (event)=>{
        const file = event.target.files[0] 
        if(!file) return
           const previewurl = URL.createObjectURL(file)
         
        setPreviewImage(previewurl)
        setFile(file)
    }
    const trigerFileInput = ()=>{
        document.getElementById('file-input').click()
    }
    const handleChange = (event)=>{
        const value = event.target.value
        const name = event.target.name
        setData({...data,[name]:value})
    }
    const formData = new FormData() 
    formData.append('title',data.title)
    formData.append('description',data.description)
    formData.append('author',data.author)
    formData.append('image',file)
    const handleSubmit = ()=>{

    }
    useEffect(()=>{
        console.log(formData)
    })

    return(
        <div className="content-container">
           <form onSubmit={handleSubmit}>
             <div className="image">
            {
                previewImage?<img src={previewImage} alt='image2' width={500} height={300} onClick={trigerFileInput}/>:
                <img src="/assets/upload_area.png" alt="upload-photo" width={500} height={300} onClick={trigerFileInput}/>
            }
            <input type='file' onChange={handleImage} style={{display:'none'}} id='file-input'/>
             </div>
            <h2><input type='text' name='title' value={data.title} placeholder='write title here!' onChange={handleChange} required/></h2>
            <h2><input type='text' placeholder='write the author here' name='author' value={data.author} required/></h2>
            <h2><input type='text' placeholder='write the category here!' name='category' value={data.category} required/></h2>
            <textarea placeholder="write description and conclution" cols='70' rows={30} required/>
            <button type='submit'>publish</button>
           </form>
            
        </div>
    )
}

export default Content