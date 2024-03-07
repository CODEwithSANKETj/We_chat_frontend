import { ADD_ONLINE_USER, CREATE_SOCKET, DISTORY_SOCKET } from "./Socket_action_types"

const initial = {
    socket:null,
    onlineusers:[]
}
export default function Socket_reducer(state=initial,action){
    switch (action.type){
        case CREATE_SOCKET:
            return {...state,socket:action.payload,onlineusers:[]}

        case DISTORY_SOCKET:
            return initial 
        
        case ADD_ONLINE_USER:
            return {...state,onlineusers:action.payload}

        default:
            return state
    }
}