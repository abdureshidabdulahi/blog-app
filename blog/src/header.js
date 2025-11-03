 
import './App.css'
import { NavLink } from 'react-router-dom'
export default function Header(){
    return(
        <div className="header-container">
            <div><img src= "/assets/34884.jpg"  height={70}/></div>
           
         <div className='info'>
         <span><NavLink to='/'>Home</NavLink></span>
            <span>Blogs</span>
           <span>About</span>
         </div>
            <div><button className='signin'>Signin</button></div>
           
        </div>
    )
}