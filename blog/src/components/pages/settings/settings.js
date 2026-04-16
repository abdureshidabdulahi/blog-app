 
import './settings.css'
import ChangePass from './changePass'
import { useState } from 'react'
const SettingsPage = ()=>{ 
    const [value,setValue] =useState(true)
    const [data,setData] = useState({})
    const handleChange = ()=>{

    }
    const handlePassword = ()=>{
        setValue(false)
    }
    const handleEdit = ()=>{
        setValue(true)
    }
        return(
        <div className="settings-container">
            <div className="sidebar">
            <h2>Dashbord</h2>
            <p onClick={handleEdit}>Edit Profile</p>
            <p onClick={ handlePassword}>Change password</p>
            </div>
           {
            value?
             <div className="main"> 
               <div className='main-profile'>
                 <h2>Edit Profile</h2>
                 <img src='/assets/d12dfdbd6b7501faf694ac42775f19451aee8805-324x328.webp' alt="editphoto" width={150} height={150}/>
                 <button>Upload</button>
               </div>
               <div className='main-profile2'> 
                <div className="header-input"> 
                    <input type="text" placeholder='Enter Gmail'/>
                    
                </div>
                <input onChange={handleChange} type="text" placeholder='Enter Username' className='input'/>
                <p>Username will be used to search the user and will be visible to all users.</p>
                <textarea onChange={handleChange} placeholder="Bio" rows={5} cols={10}/>
                
                <h2>Add Your Social Media Account</h2>
                <div className='social-media'>
                    <input type="text" placeholder="https:// youtub"/>
                    <input type="text" placeholder="https:// telegram"/>
                    <input type="text" placeholder="https:// facebook"/>
                    <input type="text" placeholder="https://whatsApp"/>
                </div>
               </div>
            </div>:<ChangePass/>
           }
        </div>
    )
}

export default SettingsPage