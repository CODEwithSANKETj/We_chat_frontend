import React, { useEffect, useRef } from 'react'
import Message_text from './Message_text'
import usegetMessages from '../Hooks/usegetMessages'
import { useDispatch, useSelector } from 'react-redux'
import { Conversation_action_fetch_history, Conversation_action_reset } from '../Redux/Conversation_reducer/Conversation_action'
import use_listen_message from '../Hooks/use_listen_message'
import Message_skeleton from './Message_skeleton'
import '../Css/person_chat.css'
function Messages_Container() {
  const [loading] = usegetMessages()
  use_listen_message()
  const current_messages = useSelector((Store)=>Store.Conversation.Messages)
  const current_person = useSelector((Store)=>Store.Conversation.Person)
  const scrollableDivRef = useRef(null);

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    }
  }, [current_messages]);
 
  return (
    <div id='chat_container'  style={{maxHeight:'450px',width:'100%'}}  ref={scrollableDivRef}  className='px-4 flex-1 flex-col gap-0 overflow-auto'>
        {loading && (
          <div className='px-4 flex-1'>
              {Array(3).fill().map((_, idx) => (
                  <Message_skeleton key={idx}/>
              ))}
          </div>
        )}

        {current_messages.length>0&&!loading&&current_messages.map((item,index)=>{
          return <Message_text key={index} person={current_person} item={item} />
        })}
       
    </div>
  )
}

export default Messages_Container