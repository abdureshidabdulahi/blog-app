import './login.css'


const LoginPage = ()=>{
    return(
         <div className="login-page">
            <h1>Login</h1>
            <div className="login">
            <div>
                <p>Email</p>
                <input type="email" placeholder="Enter your Email" />
            </div>
            <div>
                <p>Password</p>
                <input type="password" placeholder="Enter your Password" />
            </div>
           <div className="checkbox">
             <input type="checkbox" /> 
            <p>Accept to continue this.</p>
           </div>
           <button>login</button>
           <p>Don`t have account? <span>Signin here</span></p>
            </div>
         </div>

    )
}
export default LoginPage