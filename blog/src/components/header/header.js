 
 
import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreateIcon from '@mui/icons-material/Create';
import {storeContext} from './../context/storeContext' 
import './header.css'
export default function Header(){
    const {setshowlogin,token,setToken,users} = useContext(storeContext)
    const navigate = useNavigate()
    const handleClick = ()=>{
        setToken(localStorage.removeItem('token'))
        navigate('/')
        window.location.reload()
    }
    return(
        <div className="header-container">
            <div><img src= "/assets/Gemini_Generated_Image_qvfoctqvfoctqvfo.png"  height={70} alt='header-log' onClick={()=>navigate('/')}/></div>
           
         <div className='info'>
         <NavLink to='/' className='home'> Home </NavLink>
           {
            token? <NavLink to={'blogs'} className='blogs'> Blogs </NavLink>:''
           }
           <NavLink to='about' className='about'> About </NavLink>
         </div>
            <div>{
                token?<div className='profile-container'>
                <div className='content-div'>
                   <div className="border-wrapper">
                    <p className="create-content" onClick={() => navigate('/createcontent')}>
                        <CreateIcon /> Create Content
                    </p>
                    </div>
                        <div className='profile-lists'>
                            {<img src={`http://localhost:5137/userImage/${users.profileImage}` } width={50} height={50} alt='dkjfd' 
                            /> || <AccountCircleIcon className='profile'/>}
                           <div className='uls'>
                             <ul>
                                <li onClick={()=>navigate('/profile')}>Profile</li> 
                                <li onClick={()=>navigate('/settings')}>Settings</li>
                                <li onClick={handleClick}>Sign Out</li> 
                            </ul>
                           </div>
                            </div>
                             </div>
                            </div>:
                            <button className='signin' onClick={()=>setshowlogin(true)}>Signin</button>
                    }</div>
           
        </div>
    )
}