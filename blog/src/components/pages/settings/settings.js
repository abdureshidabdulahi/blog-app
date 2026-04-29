 
import './settings.css'
import { useContext, useRef } from 'react'
import axios from 'axios'
import ChangePass from './changePass'
import { useEffect, useState } from 'react'
import { storeContext } from '../../context/storeContext'
const SettingsPage = ()=>{ 
    const {token,users} = useContext(storeContext)
    const fileRef = useRef()
    const [value,setValue] =useState(true)
    const [profile,setProfile] = useState(null)
    const [previweUrl,setPreviewUrl] = useState(null)
    const [data,setData] = useState({
        username:'',
        gmail:'',
        bio:'',
        youtube:'',
        facebook:'',
        telegram:'',
        whatsApp:'',

    })
    const handleChange = (event)=>{
        const value = event.target.value
        const name = event.target.name
        setData((pre)=>({...pre,[name]:value}))
        

    }
  
const handleprofileClick =()=>{  
     fileRef.current.click()
}
  const onchangeFile = (event)=>{
    const file = event.target.files[0] 
    setProfile(file)
    const preview = URL.createObjectURL(file)
    setPreviewUrl(preview)
    console.log('this is the files',file)
    if(!file){
        console.log('there is no file')
    }
    }

    const handleSubmit =async(event)=>{
        event.preventDefault()
        const fileData = new FormData()
        fileData.append('username',data.username)
        fileData.append('gmail',data.gmail)
        fileData.append('bio',data.bio)
        fileData.append('youtube',data.youtube)
        fileData.append('facebook',data.facebook)
        fileData.append('whatsApp',data.whatsApp)
        fileData.append('telegram',data.telegram)
        fileData.append('profileImage',profile)  
        await axios.put('http://localhost:5137/api/users/add_profile_image',fileData,{headers:{token}})
        setData({
             username:'',
        gmail:'',
        bio:'',
        youtube:'',
        facebook:'',
        telegram:'',
        whatsApp:'',
        })


    }
    const handlePassword = ()=>{
        setValue(false)
    }
    const handleEdit = ()=>{
        setValue(true)
    }
    useEffect(()=>{
        console.log(data)

    },[data]
)
        return(
        <div className="settings-container">
            <div className="sidebar">
            <h2>Dashbord</h2>
            <p onClick={handleEdit}>Edit Profile</p>
            <p onClick={ handlePassword}>Change password</p>
            </div>
           {
            value?
           <form onSubmit={handleSubmit}>
              <div className="main"> 
               <div className='main-profile'>
                 <h2>Edit Profile</h2> 
                  <img src={previweUrl || '/assets/upload_area.png'} alt="editphoto" className='profile-photo' width={150} height={150} 
                 onClick={handleprofileClick}/>
                 <input type='file' ref={fileRef} className='input-file' id='input-field' onChange={onchangeFile}/>
                 
               </div>
               <div className='main-profile2'> 
                <div className="header-input"> 
                    <input onChange={handleChange} value={data.gmail}  name='gmail'  type="text" placeholder='Enter Gmail'/>
                    
                </div>
                <input className='header-input' onChange={handleChange} value={data.username} name='username' type="text" placeholder='Enter Username' className='input'/>
                <p>. Username will be used to search the user and will be visible to all users.</p>
                <textarea name='bio' onChange={handleChange} value={data.bio} placeholder="Write your Bio" rows={5} cols={10}/>
                
                <h2>Add Your Social Media Account</h2>
                <div className='social-media'>
                    <input type="text" onChange={handleChange} value={data.youtube} name='youtube' placeholder="https:// youtube"/>
                    <input type="text" onChange={handleChange} value={data.telegram} name='telegram' placeholder="https:// telegram"/>
                    <input type="text" onChange={handleChange} value={data.facebook} name='facebook' placeholder="https:// facebook"/>
                    <input type="text" onChange={handleChange} value={data.whatsApp} name='whatsApp' placeholder="https:// whatsApp"/>
                </div>
                <button type='submit'>Upload Changes</button>
               </div>
            </div>
           </form>:<ChangePass/>
           }
        </div>
    )
}

export default SettingsPage