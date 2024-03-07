import { LOGIN, LOGOUT } from "./Auth_action_type";

export function action_login(data){
    return {type:LOGIN,payload:data}
}
export function action_logout(){
    return {type:LOGOUT}
}