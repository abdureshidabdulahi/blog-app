import { images } from "./data"

export default function Blogs(){
    let image = images.map((element)=>(
     
       <>
        <img src={element.located}  width={200} height={150} 
        style={{objectFit:'cover',objectPosition:'center'}}
        />
        <h3>{element.category}</h3>
        <h5>{element.name}</h5>
        </>
        
        
      
    ))
    return(
        <div className="blogs-container">
            <div>
                {image}
                 
            </div>

        </div>
    )
}