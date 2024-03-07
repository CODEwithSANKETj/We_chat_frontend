import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Store from '../Redux/Store'
import { Toggle_theme } from '../Redux/Theme_reducer/Theme_action';
import image from '../images/chat_image.png'
import '../Css/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import useSignin from '../Hooks/useSignin';
import toast, { Toaster } from 'react-hot-toast'
import { action_login } from '../Redux/Auth_reducer/Auth_action';
function Login() {
    const theme = useSelector((Store)=>Store.theme.theme)
    const [loading,signin] = useSignin()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user,setuser] = useState({
      username:'',
      password:''
    })
  async  function handlelogin(e){
  
      e.preventDefault()
      let res = await signin(user)
      if(res.msg){
      
       
        toast.success('User logged in Scccessfull')
        dispatch(action_login(res?.user))
        setTimeout(()=>{
          
          navigate('/dashboard')
        },1500)
      }
      else{
        toast.error(res)
      }
    
    }
   
  return (
    <div id='container' style={{backgroundColor:`${theme=='white'?'rgb(209, 210, 211)':'black'}`}} className=' flex flex-col flex-1 justify-center items-center bg-white  text-white '>
      <div id='loginpage' style={{backgroundColor:`${theme=='white'?theme:'rgb(85, 86, 86)'}`,color:`${theme=='white'?'black':'white'}`}} className='flex  justify-center flex-col items-center rounded-xl' >
           
            <img className='h-32 w-32' src={image} alt="" />
            <label className={`input input-bordered flex items-center gap-2 bg-${theme=='white'?'white':'black'} text-${theme=='white'?'black':'white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input onChange={(e)=>setuser({...user,username:e.target.value})} type="text" className={`grow bg-white text-${theme=='white'?'black':'white'}`} placeholder="Username" />
            </label>
            <label className={`input input-bordered flex items-center gap-2 bg-${theme === 'white' ? 'white' : 'black'} text-${theme === 'white' ? 'black' : 'white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill={`${theme === 'white' ? 'black' : 'white'}`} className="w-4 h-4 opacity-70">
                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
              </svg>
              <input onChange={(e) => setuser({ ...user, password: e.target.value })} type="password" className={`grow bg-${theme === 'white' ? 'black' : 'white'} text-${theme === 'white' ? 'black' : 'white'}`} placeholder='password' />
            </label>

            <button onClick={handlelogin} className="btn btn-info w-40">
              {loading&&<span className="loading loading-spinner loading-sm"></span>}
              {!loading&&'Login'}
            </button>
            <h2>Dont have an account? <span style={{color:'blue',cursor:'pointer'}}><Link to={'/signup'}><a>Sign up</a></Link></span></h2>
                          
      </div>
    
    </div>
  )
}

export default Login

{/* 





 */}