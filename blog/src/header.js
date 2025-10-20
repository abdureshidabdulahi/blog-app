import image1 from './assets/34884.jpg'
import './App.css'
export default function Header(){
    return(
        <div className="header-container">
            <div><img src={image1}  height={70}/></div>
           
         <div className='info'>
         <span>Home</span>
            <span>Blogs</span>
           <span>About</span>
         </div>
            <div><button className='signin'>Signin</button></div>
           
        </div>
    )
}