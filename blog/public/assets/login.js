export default function Login(){
    return(
        <div className="login-container">
            <div className="login">
            <h3>Login Into Your Account</h3>
            <input type="text" placeholder="Your Email" />
            <input type="text" placeholder="Your password" />
            <button>SignIn</button>
            <p>Don't Have Account? <span>Register Here</span></p>
            </div>
        </div>
    )
}