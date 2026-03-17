

const SettingsPage = ()=>{
    return(
        <div className="settings-container">
            <div className="sidebar">
            <h2>Dashbord</h2>
            <p>Edit Profile</p>
            <p>Change password</p>
            </div>
            <div className="main"> 
               <div>
                 <h2>Edit Profile</h2>
                 <img src="" alt="editphoto" />
                 <button>Upload</button>
               </div>
               <div>
                <div className="header-input">
                    <input type="text" />
                    <input type="text" />
                </div>
                <input type="text" />
                <p>Username will be used to search the user and will be visible to all users.</p>
                <textarea placeholder="Bio"> </textarea>
                <h2>Add Your Social Media Account</h2>
                <div>
                    <input type="text" placeholder="https://"/>
                    <input type="text" placeholder="https://"/>
                    <input type="text" placeholder="https://"/>
                    <input type="text" placeholder="https://"/>
                </div>
               </div>
            </div>
        </div>
    )
}

export default SettingsPage