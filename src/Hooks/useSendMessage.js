import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Conversation_action_send_message } from '../Redux/Conversation_reducer/Conversation_action'

function useSendMessage() {
    const dispatch = useDispatch()
    const [loading,setloading] = useState(false)
    const current_person = useSelector((Store)=>Store.Conversation.Person)
    const SendMessage=async(messagetosend)=>{
        setloading(true)
        try {
            const res =await fetch(`${import.meta.env.VITE_REACT_API_URL}/api/message/send/${current_person._id}`,{
                method:"POST",
                headers:{'Content-Type':"application/json"},
                body:JSON.stringify({message:messagetosend}),
                credentials:'include'
            })
            const data = await res.json()
            if(data.error){
                throw new Error(data.error)
            } 
            //console.log(data.msg,'in sender');
            dispatch(Conversation_action_send_message(data.msg))
            return data
        } catch (error) {
            return error.message
        }finally{
            setloading(false)
        }
    }
    return [loading,SendMessage]
}

export default useSendMessage