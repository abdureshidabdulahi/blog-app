import { useContext, useState, useEffect } from 'react'
import './login.css'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import { storeContext } from '../../context/storeContext';


const LoginPage = ()=>{
    const {setshowlogin,setToken} =useContext(storeContext)
    const [signin,setSignin] =useState('Login')
    const [data,setData] = useState({
        fristName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const onchangeHandler = (event)=>{
        const value = event.target.value
        const name = event.target.name
        setData({...data,[name]:value})
    }
    const handleClick =async (event)=>{
        event.preventDefault()
        let url = 'http://localhost:5137/api/users'
        if(signin === 'Signin'){
            url +='/register'
        }
        if(signin === 'Login'){
            url +='/login'
        }
        const result = await axios.post(`${url}`,data)
        setData({
            fristName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:'',

        })
        setshowlogin(false)
        
        const message = result.data.message
        console.log(message)
        const token = result.data.token
        setToken(token)
        console.log(token) 
        localStorage.setItem('token',token)
    }
     useEffect(()=>{
        console.log(data) 
     })
    return(
         <div className="login-page">
           
            
                  
                 <form onSubmit={handleClick} className='login-form'>
                   <div className='login-header'> 
                    <h1 className='login-title'>{signin}</h1>
                    <p onClick={()=>setshowlogin(false)} className='login-title'>{<CloseIcon/>}</p>
                   </div>

                       {
                    signin === 'Signin' ?
                    <>
                    <div>
                    <p>Enter fristName</p>
                    <input type='text' placeholder='Enter fristName' name='fristName' value={data.fristName} onChange={onchangeHandler} required/>
                </div>
                <div>
                    <p>Enter lastName</p>
                    <input type='text' placeholder='Enter lastName' name='lastName' value={data.lastName} onChange={onchangeHandler} required/>
                </div>
                    </>:<></>
                }

            <div>
                <p>Email</p>
                <input type="email" placeholder="Enter your Email" name='email' value={data.email} onChange={onchangeHandler} required/>
            </div>
            <div>
                <p>Password</p>
                <input type="password" placeholder="Enter your Password" name='password' value={data.password} onChange={onchangeHandler} required/>
            </div>
           {
            signin === 'Signin' ? <div>
                <p>Confirm Password</p> 
                <input type='password' placeholder='Confirm Password' name='confirmPassword' value={data.confirmPassword} onChange={onchangeHandler} required/>
            </div> :<></>
           }
           <div className="checkbox">
             <input type="checkbox" required/> 
            <p>Accept to continue this.</p>
           </div>
           <button type='submit'>{signin}</button>
           {signin ==='Login'?<p>Don`t have account? <span onClick={()=>setSignin('Signin')}>Signin here</span></p>
           :<p>Already have account? <span onClick={()=>setSignin('Login')}>Login here</span></p>}
                 </form>
            </div>
         

    )
}
export default LoginPage