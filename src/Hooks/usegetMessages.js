import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Conversation_action_fetch_history } from '../Redux/Conversation_reducer/Conversation_action'

function usegetMessages() {
    const dispatch = useDispatch()
    const current_person = useSelector((Store)=>Store.Conversation.Person)
    const [loading,setloading] = useState(false)
    useEffect(()=>{
        const Fetch_message=async()=>{
            setloading(true)
            try {
                const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/api/message/get/${current_person?._id}`,{
                    method:"GET",
                    headers:{'Content-Type':"application/json"},
                    credentials:'include'
                })
                const data = await res.json()
                if(data.error){
                    throw new Error(data.error)
                }
                dispatch(Conversation_action_fetch_history(data.msg))
            
            } catch (error) {
                return error.message
            }finally{
                setloading(false)
            }
        }
        if(current_person?._id) Fetch_message()
    },[current_person?._id])
    return [loading]
}

export default usegetMessages