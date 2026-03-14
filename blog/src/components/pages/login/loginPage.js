import { dividerClasses } from "@mui/material/Divider"


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
            <p>Continue to accept this</p>
           </div>
           <button>login</button>
            </div>
         </div>

    )
}