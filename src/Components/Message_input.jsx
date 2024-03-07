import React, { useRef, useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../Hooks/useSendMessage';
import { useSelector } from 'react-redux';
import '../Css/person_chat.css'
function Message_input() {
    const [message,setmessage] = useState('')
    const [loading,SendMessage]=useSendMessage()
    const theme = useSelector((Store)=>Store.theme.theme);
    const textarearef = useRef(null)
    async function handlesubmit(e){
      e.preventDefault()
      if(message!==''){
        const res = await  SendMessage(message)
        setmessage('')
      
      }
    }
    function handlekeyup(e){
      textarearef.current.style.height=`60px`
      let schight = e.target.scrollHeight;
      
      textarearef.current.style.height=`${schight}px`
    }
 
  return (
    <form className='px-4 my-3' onSubmit={handlesubmit}>
        <div className='w-full relative flex justify-center'>
            <div id='wrapper'>
              <textarea 
              value={message}
              onChange={(e)=>setmessage(e.target.value)}
              style={{backgroundColor:`${theme=='white'?'rgba(243, 241, 239)':''}`,
              color:`${theme=='white'?'black':'white'}`,
            }} onKeyUp={handlekeyup} ref={textarearef} required={true} placeholder='Type here to send the message'></textarea>
            </div>
            {loading ?
              <span className="absolute inset-y-3 end-2  items-center loading loading-spinner loading-sm text-white"></span>
              :
              <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                <IoSend/>
              </button>
          }
            
        </div>
    </form>
  )
}


export default Message_input