 import { data } from 'react-router-dom'
import './profile.css'


const ProfilePage =()=>{
    return(
        <div className="profile-page">
            <div className="profile-blogs">
                <h2>My Blogs</h2>
                <div>
                        hi its me
                </div>
            
            </div>
            <div className="profile-profile"> 
                <img src='/assets/erick-chevez-WSD3UnbB6ZI-unsplash.jpg' alt="profile-phot" width={150} height={150}/>
                <p>@user</p>
                <p>0 blogs - 0 reads</p>
                <button>Edit Profile</button>
                <p className='bio'>no bio here</p>
                <p>joined at december 9</p>


            </div>
        </div>
    )
}

export default ProfilePage