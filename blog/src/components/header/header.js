 
 
import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {storeContext} from './../context/storeContext'
export default function Header(){
    const {setshowlogin} = useContext(storeContext)
    const navigate = useNavigate()
    return(
        <div className="header-container">
            <div><img src= "/assets/34884.jpg"  height={70} alt='header-log' onClick={()=>navigate('/')}/></div>
           
         <div className='info'>
         <NavLink to='/' className='home'>Home</NavLink>
            <NavLink to='blogs' className='blogs'>Blogs</NavLink>
           <NavLink to='about' className='about'>About</NavLink>
         </div>
            <div><button className='signin' onClick={()=>setshowlogin(true)}>Signin</button></div>
           
        </div>
    )
}