import React, { useEffect, useState } from 'react'
import use_get_pending from '../Hooks/use_get_pending'
import green_tick from '../images/green_tick.png'
import cross_tick from '../images/cross_tick.png'
import use_accept_request from '../Hooks/use_accept_request'
import { Toaster, toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { Change_accept_flag, Change_bell_glow, Change_pending_count } from '../Redux/Conversation_reducer/Conversation_action'
import use_listen_request_accept from '../Hooks/use_listen_request_accept'
function Pending_request({showpendingref}) {
    const current_socket = useSelector((Store)=>Store.Socket.socket)
    const bell_ring = useSelector((Store)=>Store.Conversation.bell)
    const pending_accept_status = useSelector((Store)=>Store.Conversation.accept_pending)
    const [accept_loading,accept_req] = use_accept_request()
    const [loading,get_pending_req] = use_get_pending()
    const [req_data,setreq_data] = useState([])
    const dispatch = useDispatch()
    use_listen_request_accept()
    useEffect(()=>{
        
        async function get_req(){
            try {
                const res = await get_pending_req()
                if(res){
                    
                    setreq_data(res?.length>=0?res:[])
                    dispatch(Change_pending_count(res?.length>=0?res.length:0))
                }
                else{
                    throw new Error(res?.data)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        get_req()
    },[pending_accept_status,bell_ring])
    async function handleclick(id){
       
            try {
                
                const res = await accept_req(String(id))
                if(res.ok){
                    let newreq_data = req_data.filter((item)=>item._id!==id)
                    //to inform sidebar to need to update the new added user
                    dispatch(Change_accept_flag())
                  
                    //////////////
                    setreq_data(newreq_data)
                    toast.success('Friend Request accepted')
                }
                else{
                    toast.error('Internal server error')
                }
                
            } catch (error) {
                toast.error('Internal server error')
            }
    }
    
  return (
    <div  ref={showpendingref} className='z-50    absolute flex flex-col justify-between rounded-md items-center' style={{top:'63px',display:'none',backgroundColor:'white',color:'black',width:'20%',right:'1px'}}>
        <Toaster/>
        
          {loading&&<span className="loading loading-dots loading-xs"></span>}
        {!loading&&req_data.length==0&&<p>No pending Request</p>}
        {!loading&&req_data?.length>0&&
        req_data.map((item,index)=>{
            return <div  key={index} className='flex p-1 border rounded-md justify-between hover:bg-slate-200 items-center w-full'>
                        <div className='flex justify-center items-center gap-2'>
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src={item.profilePic} />
                                </div>
                            </div>
                            <div className='flex justify-start flex-col'>
                                <h3>{item.fullname}</h3>
                                <h5 style={{fontSize:'12px'}}>{`(${item.username})`}</h5>
                            </div>
                        </div>
                        <div className='flex justify-between gap-3 mr-3'>
                            <img src={green_tick} onClick={()=>handleclick(item._id)} className='cursor-pointer' alt="" style={{ width: '25px', height: '25px' }} />
                            <img src={cross_tick} alt="" className='cursor-pointer' style={{ width: '25px', height: '25px' }} />
                        </div>


                    </div>
        })
        }
    </div>
  )
}

export default Pending_request