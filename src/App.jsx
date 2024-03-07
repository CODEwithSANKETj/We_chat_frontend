import Navbar from "./Components/Navbar"
import MainRoutes from "./Routes/MainRoutes"
import '../src/App.css'
import { useDispatch, useSelector } from "react-redux"
import io from 'socket.io-client'
import { ADD_Online_user_action, Add_socket_action, Distory_socket_action } from "./Redux/Socket_reducer/Socket_actions"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
function App() {
  const current_user = useSelector((Store)=>Store.Auth.Auth)
  const pending_accept_status = useSelector((Store)=>Store.Conversation.accept_pending)
  const current_user_details = useSelector((Store)=>Store.Auth.Mydetails)
  const current_socket = useSelector((Store)=>Store.Socket.socket)
  const active_users = useSelector((Store)=>Store.Socket.onlineusers)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(current_user){
      const socket = io(import.meta.env.VITE_REACT_API_URL,{
        query:{
          userid:current_user_details._id
        }

      })
      dispatch(Add_socket_action(socket))
      socket.on('notifyallusers',(users)=>{
        dispatch(ADD_Online_user_action(users))
      })

    }
    else{
      if(current_socket){
        current_socket.close()
        dispatch(Distory_socket_action())
      }
    }
    return ()=>{
      current_socket?.close()
      dispatch(Distory_socket_action())
    }
  },[current_user,pending_accept_status])

  return (
    <div  className="bg-white h-7 " >
    <Toaster/>
    <Navbar/>
    <MainRoutes/>
    
    </div>
  )
}

export default App
