import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Change_bell_glow } from '../Redux/Conversation_reducer/Conversation_action'
//
function use_listen_recived_request() {
    const current_user = useSelector((Store)=>Store.Auth.Auth)
    const current_socket = useSelector((Store)=>Store.Socket.socket)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(current_socket&&current_user){
            current_socket.on('Request Recived',()=>{
               
                dispatch(Change_bell_glow(true))
            })
        }
        return () => {
            current_socket?.off('Request Recived');
            
          };
    },[current_socket])
}

export default use_listen_recived_request