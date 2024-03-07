import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import Theme_Reducer from "./Theme_reducer/Theme_Reducer";
import Auth_reducer from "./Auth_reducer/Auth_reducer";
import Conversation_reducer from "./Conversation_reducer/Conversation_reducer";
import Socket_reducer from "./Socket_reducer/Socket_reducer";

const Rootreducer = combineReducers({
    theme:Theme_Reducer,
    Auth:Auth_reducer,
    Conversation:Conversation_reducer,
    Socket:Socket_reducer
})


const Store = legacy_createStore(Rootreducer,applyMiddleware(thunk))

export default Store