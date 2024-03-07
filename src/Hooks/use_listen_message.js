import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Conversation_action_send_message } from '../Redux/Conversation_reducer/Conversation_action'

function use_listen_message() {
    const current_socket = useSelector((Store)=>Store.Socket.socket)
    const current_messages = useSelector((Store)=>Store.Conversation.Messages)
    const dispatch = useDispatch()
    //const active_users = useSelector((Store)=>Store.Socket.onlineusers)
    useEffect(()=>{
            current_socket?.on('newmessage',(newmessagefromsocket)=>{
                dispatch(Conversation_action_send_message(newmessagefromsocket))
            })

            return ()=>current_socket?.off('newmessage')
    },[current_socket,current_messages])
}

export default use_listen_message