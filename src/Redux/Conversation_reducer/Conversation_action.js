import { CHANGE_BELL_GLOW, CHANGE_CURRENT, CHANGE_CURRENT_RESET, CHANGE_PENDING_COUNT, CHANGE_PENDING_FLAG, FETCH_CHAT_HISTORY, SEND_MESSAGE } from "./Conversation_action_types"

export const Conversation_action=(current,data)=>{
    return {type:CHANGE_CURRENT,payload:current,data:data}
}
export const Conversation_action_reset=()=>{
    return {type:CHANGE_CURRENT_RESET}
}
export const Conversation_action_send_message=(message)=>{
    return {type:SEND_MESSAGE,payload:message}
}
export const Conversation_action_fetch_history=(messagearray)=>{
    return {type:FETCH_CHAT_HISTORY,payload:messagearray}
}
export const Change_accept_flag=()=>{
    return {type:CHANGE_PENDING_FLAG}
}
export const Change_bell_glow=(flag)=>{
    return {type:CHANGE_BELL_GLOW,payload:flag}
}
export const Change_pending_count=(value)=>{
    return {type:CHANGE_PENDING_COUNT,payload:value}
}