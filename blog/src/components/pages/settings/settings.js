 
import './settings.css'
import { useRef } from 'react'
import ChangePass from './changePass'
import { useEffect, useState } from 'react'
const SettingsPage = ()=>{ 
    const [value,setValue] =useState(true)
    const [profile,setProfile] = useState(null)
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
    const onchangeFile = (event)=>{
    const file = event.target.files[0]
    setProfile(file)
    console.log('this is the files',file)
    if(!file){
        console.log('there is no file')
    }
    }
const handleprofileClick =()=>{  
    document.getElementById('input-field').click()
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
           <form>
              <div className="main"> 
               <div className='main-profile'>
                 <h2>Edit Profile</h2>
                 
               {
                profile === null &&(
                     <img src='/assets/upload_area.png' alt="editphoto" className='profile-photo' width={150} height={150} 
                 onClick={handleprofileClick}/>
                )
               }
                 
                 <input type='file' className='input-file' id='input-field' ref={inputRef} onChange={onchangeFile}/>
                 
               </div>
               <div className='main-profile2'> 
                <div className="header-input"> 
                    <input onChange={handleChange}  name='gmail'  type="text" placeholder='Enter Gmail'/>
                    
                </div>
                <input onChange={handleChange} name='username' type="text" placeholder='Enter Username' className='input'/>
                <p>Username will be used to search the user and will be visible to all users.</p>
                <textarea name='bio' onChange={handleChange} placeholder="Write your Bio" rows={5} cols={10}/>
                
                <h2>Add Your Social Media Account</h2>
                <div className='social-media'>
                    <input type="text" onChange={handleChange} name='youtube' placeholder="https:// youtube"/>
                    <input type="text" onChange={handleChange} name='telegram' placeholder="https:// telegram"/>
                    <input type="text" onChange={handleChange} name='facebook' placeholder="https:// facebook"/>
                    <input type="text" onChange={handleChange} name='whatsApp' placeholder="https:// whatsApp"/>
                </div>
                <button>Upload Changes</button>
               </div>
            </div>
           </form>:<ChangePass/>
           }
        </div>
    )
}

export default SettingsPage