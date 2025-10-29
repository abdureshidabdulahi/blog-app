import { images } from "./data"
import './App.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function Blogs(){
    let image = images.map((element)=>(
     
       <div className="image-tittle">
        <img src={element.located}  width={300} height={200} 
        style={{objectFit:'cover',objectPosition:'center',borderRadius:'5px',marginBottom:'7px'}}
        />
        <h3>{element.category}</h3>
        <h2>{element.name}</h2>
        <div className="acount">
        <AccountCircleIcon   style={{width:'40px',height:'40px',}}/>
        <div className="nameAndDate">
            <p>{element["acount-name"]}</p>
            <p>{element.date}</p>

        </div>
        </div>
        </div>
        
        
      
    ))
    return(
        <div className="blogs-container">
        
                 {image}
             
        </div>
    )
}