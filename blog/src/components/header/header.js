 
 
import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreateIcon from '@mui/icons-material/Create';
import {storeContext} from './../context/storeContext' 
import './header.css'
export default function Header(){
    const {setshowlogin,token} = useContext(storeContext)
    const navigate = useNavigate()
    return(
        <div className="header-container">
            <div><img src= "/assets/34884.jpg"  height={70} alt='header-log' onClick={()=>navigate('/')}/></div>
           
         <div className='info'>
         <NavLink to='/' className='home'>Home</NavLink>
           {
            token? <NavLink to={'blogs'} className='blogs'>Blogs</NavLink>:''
           }
           <NavLink to='about' className='about'>About</NavLink>
         </div>
            <div>{
                token?<div className='content-div'><p className='create-content'><CreateIcon/>Create Content</p><AccountCircleIcon className='profile'/></div>:<button className='signin' onClick={()=>setshowlogin(true)}>Signin</button>
                    }</div>
           
        </div>
    )
}