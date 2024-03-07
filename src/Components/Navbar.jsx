import React, { useEffect, useRef, useState } from 'react'
import { PiHandPalmLight } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux'
import { Toggle_theme } from '../Redux/Theme_reducer/Theme_action'
import { CiLogout } from "react-icons/ci";
import { action_logout } from '../Redux/Auth_reducer/Auth_action';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
import useSignout from '../Hooks/useSignout';
import { Change_bell_glow, Conversation_action_reset } from '../Redux/Conversation_reducer/Conversation_action';
import usegetallusers from '../Hooks/usegetallusers';
import { IoMdPersonAdd } from "react-icons/io";
import usesendrequest from '../Hooks/usesendrequest';
import use_custom_debounce from '../Hooks/use_custom_debounce';
import Pending_request from './Pending_request';
import { ToastContainer, toast as tostify } from 'react-toastify';
import { Distory_socket_action } from '../Redux/Socket_reducer/Socket_actions'
import use_listen_recived_request from '../Hooks/use_listen_recived_request';
function Navbar() {
  const [loading,signout] = useSignout()
  const bell_ring = useSelector((Store)=>Store.Conversation.bell)
  const pending_req_count = useSelector((Store)=>Store.Conversation.Pending_count)
  const showpendingref = useRef(null)
  const [searchedpeople,setsearchpeople] = useState([])
  let debounceTimeout;
  const inputref = useRef(null)
  const [searchparams,setsearchparams] = useSearchParams()
  const Auth = useSelector((Store)=>Store.Auth.Auth)
  const navigate = useNavigate()
  const [fetchloading,getallusers] = usegetallusers()
  const theme = useSelector((Store)=>Store.theme.theme)
  const dispatch  = useDispatch()
  const [reqLoading,sendRequest] = usesendrequest()
  const [current_req_sent_id,setcurrent_req_send_id] = useState('')
  //const handlerequestclick = use_custom_debounce(chk_debounce,1000)
  //listend reviced requ hook//
  use_listen_recived_request()
  /////////////////////////////
  const bellColor = bell_ring ? 'goldenrod' : 'currentColor';
   async function handlelogout(){
    
    let res = await signout()
    if(res.msg=='Logout Successfull'){
      toast.success('Logout Successfull')
      setTimeout(()=>{
        dispatch(action_logout())
        dispatch(Conversation_action_reset())
        navigate('/')
      },1000)
      
    }
    else{
      toast.error('Something went wrong')
    }
    
    }
    useEffect(()=>{
     const searchValue = searchparams.get('search');
      if(searchValue!==''&& searchValue!==null){
        clearTimeout(debounceTimeout)
        debounceTimeout = setTimeout(async()=>{
          try {
            const res = await getallusers(searchValue)
            if(res.msg){
              setsearchpeople(res.msg)
            }
            else{
              throw new Error('something went wrong')
            }
          } catch (error) {
            console.log(error);
          }
        },1000)
       
      }
      return ()=>{
        clearTimeout(debounceTimeout)
      }

    },[searchparams])
  async function handlesentrequest(userid){
    setcurrent_req_send_id(userid)
    try {
        const res = await sendRequest(userid)
        
        if(res.msg=='Request sent successfully'){
            alert('Friend Request Send')
            toast.success('Friend Request Send')
        }  
        else{
          alert(res.msg?res.msg:res)
          toast.error(res.msg?res.msg:res)
        }
    } catch (error) {
   ;
      toast.error(error)
    }
    finally{
      setcurrent_req_send_id('')
    }
   }
   //console.log(showpendingref.current.style.display=='','display');
  return (  
    <div style={{backgroundColor:'rgb(141, 141, 141)',color:'black'}} className="navbar relative">
  
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      <ul tabIndex={0}  className="menu   bg-white gap-3 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>About</a></li>
        <li >
        <label className="flex cursor-pointer gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
            <input type="checkbox" value="synthwave" onChange={()=>dispatch(Toggle_theme())} className="toggle theme-controller"/>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </label>

        </li>
        {Auth
          &&
          <li>
          <label onClick={handlelogout} className='text-lg  flex justify-start' >
            <span className='text-mi text-grey '>Logout</span>
            <CiLogout  />
          </label>
        </li>
        }
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="text-xl">We Chat</a>
    
  </div>
  {Auth&&<div className="navbar-end">
    <input type="text" ref={inputref} onChange={(e)=>setsearchparams({search:e.target.value})} placeholder="Search friends here" className="input text-white hidden input-bordered h-9 w-50 max-w-xs" />
    {searchparams.get('search') !== null && searchparams.get('search') !== '' && (
      <ul className='absolute z-20 top-12 mt-auto flex flex-col rounded-md justify-start p-2 gap-2 overflow-auto bg-white max-w-xs' style={{ width: '210px',maxHeight:'400px',overflow:'auto',right:'6.5rem',border:'1px solid grey'}}>
        {fetchloading&&<span className="loading loading-dots loading-md"></span>}
        {!fetchloading&&searchedpeople.length!==0&&(showpendingref.current.style.display=='none'||showpendingref.current.style.display=='') ? (
          searchedpeople.map((user, index) =>  (
            <div style={{border:'2px solid grey'}} className='flex justify-between rounded-lg items-center  p-1 ' key={index}>
              <div className='flex flex-col justify-start'>
                <li className="truncate">{user.fullname}</li> 
                <p style={{fontSize:'10px'}}> {user.username} </p>
              </div>
             
              {reqLoading&&current_req_sent_id==user._id&&<span className="loading loading-dots loading-xs"></span>}
               {!reqLoading&&<IoMdPersonAdd onClick={()=>handlesentrequest(user._id)} className='bg-grey p-0 rounded-full text-xl hover:bg-gray-400 cursor-pointer ' />}
              {reqLoading&&current_req_sent_id!=user._id&&
                <PiHandPalmLight/>
              }
            </div>
            ))
        ) : (
          !fetchloading&&<li>No user found</li>
        )}
      </ul>
    )}
      
      <button onClick={()=>{
         inputref.current.style.display=inputref.current.style.display === 'block' || inputref.current.style.display === '' ? 'none' : 'block'
         showpendingref.current.style.display='none'
        }
        
      } className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
      <button onClick={()=>{
         dispatch(Change_bell_glow(false))
         showpendingref.current.style.display=showpendingref.current.style.display=='block'?'none':'block'
         inputref.current.style.display='none'
     }} className="btn btn-ghost btn-circle" >
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={bellColor}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <span className="badge badge-xs badge-primary indicator-item">{pending_req_count}</span>
        </div>
      </button>
      <Pending_request showpendingref={showpendingref}/>
    </div>
    }
</div>
  )
}

export default Navbar