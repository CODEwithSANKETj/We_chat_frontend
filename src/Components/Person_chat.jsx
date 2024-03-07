import React, { useEffect, useState } from 'react'
import Messages_Container from './Messages_Container'
import '../Css/person_chat.css'
import Message_input from './Message_input'
import { useSelector } from 'react-redux'
function Person_chat() {
  const current_active = useSelector((Store)=>Store.Conversation.Current)
  const [nochatflag,setnochatflag] = useState(current_active)
  const current_person = useSelector((Store)=>Store.Conversation.Person)
  const current_message = useSelector((Store)=>Store.Conversation.Messages)
  const theme = useSelector((Store)=>Store.theme.theme);
  useEffect(()=>{
    setnochatflag(current_active)
  },[current_active])
  return (
    <div id='Chat_box' style={{backgroundColor:`${theme=='black'?'black':'white'}`}} className='md:min-w-[450px] justify-start flex flex-col'>
        {nochatflag===null
        ?
        nochatselected()
        :
        <div className='flex flex-col' style={{height:'100%'}}>
          <div className='bg-slate-500 px-4 py-2 mb-2'>
            <span className='lable-text'>To: </span><span className='text-gray-900 font-bold'>{current_person.fullname}</span>
          </div>
          <Messages_Container/>
          <Message_input/>
        </div>
        }
    </div>
  )
}
const nochatselected=()=>{
  return (
      <div className='flex items-center justify-center w-full h-full'>
          <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
              <p>Welcome</p>
              <p>Select the message to start messaging</p>
          </div>
      </div>
  )
}

export default Person_chat