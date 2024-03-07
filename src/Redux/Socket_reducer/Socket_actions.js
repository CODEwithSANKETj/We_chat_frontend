import { ADD_ONLINE_USER, CREATE_SOCKET, DISTORY_SOCKET } from "./Socket_action_types"

export const Add_socket_action=(socket)=>{
    return {type:CREATE_SOCKET,payload:socket}
}
export const Distory_socket_action=()=>{
    return {type:DISTORY_SOCKET}
}
export const ADD_Online_user_action=(user)=>{
    return {type:ADD_ONLINE_USER,payload:user}
}