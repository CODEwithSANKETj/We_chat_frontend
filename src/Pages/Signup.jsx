import React, { useState } from 'react';
import image from '../images/chat_image.png';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useSignup from '../Hooks/useSignup';
import toast, { Toaster } from 'react-hot-toast'
function Signup() {
  const navigate = useNavigate()
  const theme = useSelector((store) => store.theme.theme);
  const [user, setUser] = useState({
    fullname: '',
    username: '',
    password: '',
    gender: '',
    retype_pass: ''
  });
  const {loading,signup}=useSignup()
  const [warning,setwarning] = useState(false)
  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    const result = await signup(user)
  
    if(result?.msg=='User Created Successfully'){
      toast.success('Signin successfull ! You may login now',{
        position:'bottom-center'
      })
        setTimeout(()=>{
          navigate('/')
        },1500)
    }
    else{
      toast.error(result?result:'Something went wrong',{
        position:'bottom-center'
      })
    }
  }
  function setGender(gender){
    setUser({...user,gender:gender})
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
//
  return (
    <div id='Signup_container' style={{ backgroundColor:`${theme=='white'?'rgb(209, 210, 211)':'black'}`}} className={`flex flex-col justify-center items-center gap-2  ${theme === 'white' ? 'text-black bg-white' : 'text-white bg-black'}`}>
      <div style={{backgroundColor:`${theme=='white'?theme:'rgb(85, 86, 86)'}`,color:`${theme=='white'?'black':'white'}`}} className=' flex flex-col pb-12 mt-2 rounded-md w-80 justify-center items-center'>
        <form className='flex flex-col mt-2 justify-center  items-center max-w-60' onSubmit={handleSubmit}>
          <img className='h-32 w-32 mb-2' src={image} alt="" />
          <div className='flex flex-col gap-2'>
            <label className={`input input-bordered flex items-center gap-2 ${theme === 'white' ? 'bg-white' : 'bg-black'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input type="text" required={true} name='fullname' className="grow bg-white" placeholder="Full Name" onChange={handleChange} />
            </label>
            <label className={`input input-bordered flex items-center gap-2 ${theme === 'white' ? 'bg-white' : 'bg-black'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input type="text" required={true} name='username' className="grow" placeholder="Username" onChange={handleChange} />
            </label>
            <label className={`input input-bordered flex items-center gap-2 ${theme === 'white' ? 'bg-white' : 'bg-black'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
              <input type="password" required={true} className="grow" name='password' placeholder='password' onChange={handleChange} />
            </label>
            <label className={`input input-bordered flex items-center gap-2 ${theme === 'white' ? 'bg-white' : 'bg-black'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
              <input type="password" required={true} className="grow" name='retype_pass' onChange={handleChange} placeholder='Confirm password' />
            </label>
            <div className='flex flex-row'>
              <div className="form-control flex flex-row">
                <label className="label gap-2 cursor-pointer">
                  <span className="label-text">Male</span>
                  <input type="checkbox" checked={user.gender=='male'} onChange={() => setGender('male')} className="checkbox border-slate-900" />
                </label>
                <label className="label gap-2 cursor-pointer">
                  <span className="label-text">Female</span>
                  <input type="checkbox" checked={user.gender=='female'} onChange={() => setGender('female')} className="checkbox border-slate-900" />
                </label>
              </div>
            </div>
            
            <button type="submit" className={`btn ${theme === 'white' ? 'btn-info' : 'btn-dark'}`}>
              {loading&&<span className="loading loading-spinner loading-sm"></span>}
              {!loading&&'Sign up'}
              
              </button>
          <h2>Already have an account? <span style={{ color: 'red', cursor: 'pointer' }}><Link to={'/'}>Sign in</Link></span></h2>

          </div>
        
        </form>

      </div>
     
      
    </div>
  );
}
export default Signup;
