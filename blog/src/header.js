 
import './App.css'
import { NavLink } from 'react-router-dom'
export default function Header(){
    return(
        <div className="header-container">
            <div><img src= "/assets/34884.jpg"  height={70}/></div>
           
         <div className='info'>
         <NavLink to='/' className='home'>Home</NavLink>
            <NavLink to='blogs' className='blogs'>Blogs</NavLink>
           <NavLink to='about' className='about'>About</NavLink>
         </div>
            <div><button className='signin'>Signin</button></div>
           
        </div>
    )
}