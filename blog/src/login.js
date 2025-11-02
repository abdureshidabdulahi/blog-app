import './App.css'

export default function Login(){
    return(
        <div className="login-container">
            <div className="login">
            <h3>Login Into Your Account</h3>
            <input type="Email" placeholder="Your Email" className='login-input' name='email' required/>
            <input type="password" placeholder="Your password" className='login-input' name='password' required/>
            <button className='login-button'>Signin</button>
            <p>Don't Have Account? <span className='register'>Register Here</span></p>
            </div>
        </div>
    )
}