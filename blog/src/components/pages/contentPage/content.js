 import { useState } from 'react'
import './content.css'


const Content = ()=>{
    const [previewImage,setPreviewImage] =useState(null)
    
    const handleImage = (event)=>{
        const file = event.target.files[0] 
           const previewurl = URL.createObjectURL(file)
         
        setPreviewImage(previewurl)
    }
    const trigerFileInput = ()=>{
        document.getElementById('file-input').click()
    }
    return(
        <div className="content-container">
            <div className="image">
            {
                previewImage?<img src={previewImage} alt='image2' width={500} height={300} onClick={trigerFileInput}/>:
                <img src="/assets/upload_area.png" alt="upload-photo" width={500} height={300} onClick={trigerFileInput}/>
            }
            <input type='file' onChange={handleImage} style={{display:'none'}} id='file-input'/>
             </div>
            <h2><input type='text' placeholder='write title here!'/></h2>
            <textarea placeholder="write description and conclution" cols='70' rows={30}/>
            <button>publish</button>
            
        </div>
    )
}

export default Content