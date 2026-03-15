import { useState } from 'react'
import './login.css'
import axios from 'axios'
import { useEffect } from 'react'


const LoginPage = ()=>{
    const [signin,setSignin] =useState('Login')
    const [data,setData] = useState({
        fristName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const onchangeHandler = (event)=>{
        const value = event.target.value
        const name = event.target.name
        setData({...data,[name]:value})
    }
    const handleClick =async ()=>{
        const url = 'http://localhost:5137/api/users'
        if(signin === 'Signin'){
            url +='/register'
        }
        if(signin === 'Login'){
            url +='/login'
        }
        const result = await axios.post(`${url}`,data)
        const token = result.data
        localStorage.setItem('token',token)
    }
     useEffect(()=>{
        console.log(data)
     })
    return(
         <div className="login-page">
            <h1>{signin}</h1>
            <div className="login">

                {
                    signin === 'Signin' ?
                    <>
                     <div>
                    <p>Enter fristName</p>
                    <input type='text' placeholder='Enter fristName' name='fristName' value={data.fristName} onChange={onchangeHandler}/>
                </div>
                <div>
                    <p>Enter lastName</p>
                    <input type='text' placeholder='Enter lastName' name='lastName' value={data.lastName} onChange={onchangeHandler}/>
                </div>
                    </>:<></>
                }

            <div>
                <p>Email</p>
                <input type="email" placeholder="Enter your Email" name='email' value={data.email} onChange={onchangeHandler}/>
            </div>
            <div>
                <p>Password</p>
                <input type="password" placeholder="Enter your Password" name='password' value={data.password} onChange={onchangeHandler}/>
            </div>
           {
            signin === 'Signin' ? <div>
                <p>Confirm Password</p> 
                <input type='password' placeholder='Confirm Password' name='confirmPassword' value={data.confirmPassword} onChange={onchangeHandler}/>
            </div> :<></>
           }
           <div className="checkbox">
             <input type="checkbox" /> 
            <p>Accept to continue this.</p>
           </div>
           <button onClick={()=>handleClick}>{signin}</button>
           {signin ==='Login'?<p>Don`t have account? <span onClick={()=>setSignin('Signin')}>Signin here</span></p>
           :<p>Already have account? <span onClick={()=>setSignin('Login')}>Login here</span></p>}
            </div>
         </div>

    )
}
export default LoginPage