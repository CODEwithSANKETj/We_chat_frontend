import { TOGGLE_THEME } from "./Theme_action_types"

const Initial_Theme = {
    theme:'white'
}

const Theme_Reducer = (state=Initial_Theme,action)=>{

    
    switch (action.type){
        case TOGGLE_THEME:
            return {...state,theme:state.theme=='white'?'black':'white'}
        
        default:
            return state

        }
}

export default Theme_Reducer