import './changepass.css'

const ChangePass = ()=>{
    return(
        <div className="change-pass">
            <h2>change password</h2>
            <input type="text" placeholder="Enter Old Password"/>
            <input type="text" placeholder="Enter New Password"/>
            <button>change Password</button>
        </div>
    )
}

export default ChangePass