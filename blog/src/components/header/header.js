 
 
import { NavLink, useNavigate } from 'react-router-dom'
export default function Header(){
    const navigate = useNavigate()
    return(
        <div className="header-container">
            <div><img src= "/assets/34884.jpg"  height={70}/></div>
           
         <div className='info'>
         <NavLink to='/' className='home'>Home</NavLink>
            <NavLink to='blogs' className='blogs'>Blogs</NavLink>
           <NavLink to='about' className='about'>About</NavLink>
         </div>
            <div><button className='signin' onClick={()=>navigate('/signin')}>Signin</button></div>
           
        </div>
    )
}