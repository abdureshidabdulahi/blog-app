import {images} from './data.jsx'
export default function InformationAboutPic(){
    let result = images.map((items)=>(
        <div className='informationAboutPic'>
            <img src={items.located}  width={400} height={200}/>
            <p>{items.description}</p>

        </div>
    ))
    return( 
        <div className="information-container">
            {result}

        </div>
    )
}