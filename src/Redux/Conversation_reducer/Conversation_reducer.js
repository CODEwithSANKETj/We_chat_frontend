import { CHANGE_BELL_GLOW, CHANGE_CURRENT, CHANGE_CURRENT_RESET, CHANGE_PENDING_COUNT, CHANGE_PENDING_FLAG, FETCH_CHAT_HISTORY, SEND_MESSAGE } from "./Conversation_action_types";

const initial = {
    Current:null,
    Person:null,
    Messages:[],
    accept_pending:false,
    bell:false,
    Pending_count:0
}

export default function Conversation_reducer(state=initial,action){
    switch(action.type){
        case CHANGE_CURRENT:
            return {...state,Current:action.payload,Person:action.data,Messages:[]}
        case CHANGE_CURRENT_RESET:
            return initial
        case SEND_MESSAGE:
            return {...state,Messages:[...state.Messages,action.payload]}
        case FETCH_CHAT_HISTORY:
            return {...state,Messages:action.payload}
        case CHANGE_PENDING_FLAG:
            return {...state,accept_pending:!state.accept_pending}
        case CHANGE_BELL_GLOW:
            return {...state,bell:action.payload}
        case CHANGE_PENDING_COUNT:
            return {...state,Pending_count:action.payload}
        default:
            return state
    }
}