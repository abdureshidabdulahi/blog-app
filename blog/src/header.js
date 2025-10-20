import image1 from './assets/34884.jpg'
import './App.css'
export default function Header(){
    return(
        <div className="header-container">
            <div><img src={image1}  height={100}/></div>
            <div></div>
            <div></div>
        </div>
    )
}