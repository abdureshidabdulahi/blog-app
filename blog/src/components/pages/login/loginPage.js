import { useState } from 'react'
import './login.css'


const LoginPage = ()=>{
    const [signin,setSignin] =useState('Login')
    return(
         <div className="login-page">
            <h1>{signin}</h1>
            <div className="login">

                {
                    signin === 'Signin' ?
                    <>
                     <div>
                    <p>Enter fristName</p>
                    <input type='text' placeholder='Enter fristName'/>
                </div>
                <div>
                    <p>Enter lastName</p>
                    <input type='text' placeholder='Enter lastName'/>
                </div>
                    </>:<></>
                }

            <div>
                <p>Email</p>
                <input type="email" placeholder="Enter your Email" />
            </div>
            <div>
                <p>Password</p>
                <input type="password" placeholder="Enter your Password" />
            </div>
           {
            signin === 'Signin' ? <div>
                <p>Confirm Password</p> 
                <input type='password' placeholder='Confirm Password' />
            </div> :<></>
           }
           <div className="checkbox">
             <input type="checkbox" /> 
            <p>Accept to continue this.</p>
           </div>
           <button>{signin}</button>
           {signin ==='Login'?<p>Don`t have account? <span onClick={()=>setSignin('Signin')}>Signin here</span></p>
           :<p>Already have account? <span onClick={()=>setSignin('Login')}>Login here</span></p>}
            </div>
         </div>

    )
}
export default LoginPage