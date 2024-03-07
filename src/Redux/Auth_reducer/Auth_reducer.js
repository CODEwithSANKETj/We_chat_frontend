import { LOGIN, LOGOUT } from "./Auth_action_type";

const initial = {
    Auth:false,
    Mydetails:[]
}


export default function Auth_reducer(state=initial,action){
    switch(action.type){
        case LOGIN:
            return {...state,Auth:true,Mydetails:action.payload}

        case LOGOUT:
            return initial

        default:
            return state

    }
}