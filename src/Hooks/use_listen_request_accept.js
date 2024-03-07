import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Change_accept_flag } from '../Redux/Conversation_reducer/Conversation_action'

function use_listen_request_accept() {
    const current_user = useSelector((Store)=>Store.Auth.Auth)
    const current_socket = useSelector((Store)=>Store.Socket.socket)
    const dispatch = useDispatch()
    useEffect(() => {
        // Listen for 'Request Accepted' event on the socket
        if (current_socket&&current_user) {
          current_socket.on('Request Accepted', () => {
            // Handle the 'Request Accepted' event here, for example:
           
            dispatch(Change_accept_flag())
           
          });
    
          // Close socket and remove it from Redux store when component unmounts
          return () => {
            current_socket?.off('Request Accepted');
            
          };
        }
      }, [current_socket]);
}

export default use_listen_request_accept