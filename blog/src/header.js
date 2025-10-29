 
import './App.css'
export default function Header(){
    return(
        <div className="header-container">
            <div><img src= "/assets/34884.jpg"  height={70}/></div>
           
         <div className='info'>
         <span>Home</span>
            <span>Blogs</span>
           <span>About</span>
         </div>
            <div><button className='signin'>Signin</button></div>
           
        </div>
    )
}