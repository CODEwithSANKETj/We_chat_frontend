import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Person_card from './Person_card';
import '../Css/sidebar.css'
import { FaSearch } from "react-icons/fa";
import axios from 'axios'
import { Conversation_action } from '../Redux/Conversation_reducer/Conversation_action';
import use_get_pending from '../Hooks/use_get_pending';
import use_accept_request from '../Hooks/use_accept_request';
function Sidebar() {
    const [loading,setloading] = useState(false)
    const active_users = useSelector((Store)=>Store.Socket.onlineusers)
    const current_active = useSelector((Store)=>Store.Conversation.Current)
    const pending_accept_status = useSelector((Store)=>Store.Conversation.accept_pending)
    const dispatch = useDispatch()
    const [personarray,setpersonarray] = useState([])
    const theme = useSelector((Store)=>Store.theme.theme);
    const [search,setsearch] = useState('')
    const [original,setoriginal] = useState([])
    useEffect(()=>{
       async function getdata(){
            setloading(true)
            try {
                let res = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/user/get`,{
                    withCredentials:true
                })
                const filtered_data = res.data.friends.map((item)=>item.friendId)
                setpersonarray(filtered_data)
                setoriginal(filtered_data)
            } catch (error) {
                console.log(error.message);
            }
            finally{
                setloading(false)
            }
       }
       getdata()
    },[pending_accept_status])
    function handlecurrent(value,person){
        
      if(value!==current_active){
        dispatch(Conversation_action(value,person))
      }
        
    }
    function handlefilter(e){
        let value = e.target.value.toLowerCase()
        let filtered = original.filter((item)=>item.fullname.toLowerCase().includes(value))
        setpersonarray(filtered)
    }
    const personlist = `flex gap-1 flex-col border-gray-400 bg-${theme} w-1/3 max-h-screen overflow-auto`;
   
    return (
        <div id='Sidebar_container' className={personlist} >
           
            <div  className='flex text-2xl justify-center items-center gap-1 '>
                <FaSearch/>
                <input onChange={handlefilter} type="text" placeholder="Search here" className={`input bg-${theme} text-${theme=='white'?'black':'white'} input-bordered w-full max-w-xs`}/>
            </div>
            
            <div className='divider my-0 py-0 h-1'></div>
            <div id='card_list' >
                {loading&&
                    <div className="flex flex-col pl-3 gap-8 w-52">
                        <div className="flex gap-4 items-center">
                            <div className="skeleton w-12 h-12 rounded-full shrink-0">
                            </div>
                                <div className="flex flex-col gap-4">
                                    <div className="skeleton h-4 w-40"></div>
                                    <div className="skeleton h-4 w-48"></div>
                                </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="skeleton w-12 h-12 rounded-full shrink-0">
                            </div>
                                <div className="flex flex-col gap-4">
                                    <div className="skeleton h-4 w-40"></div>
                                    <div className="skeleton h-4 w-48"></div>
                                </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="skeleton w-12 h-12 rounded-full shrink-0">
                            </div>
                                <div className="flex flex-col gap-4">
                                    <div className="skeleton h-4 w-40"></div>
                                    <div className="skeleton h-4 w-48"></div>
                                </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="skeleton w-12 h-12 rounded-full shrink-0">
                            </div>
                                <div className="flex flex-col gap-4">
                                    <div className="skeleton h-4 w-40"></div>
                                    <div className="skeleton h-4 w-48"></div>
                                </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="skeleton w-12 h-12 rounded-full shrink-0">
                            </div>
                                <div className="flex flex-col gap-4">
                                    <div className="skeleton h-4 w-40"></div>
                                    <div className="skeleton h-4 w-48"></div>
                                </div>
                        </div>
                        
                      
                    </div>
                }
                {!loading&&personarray.length==0&&original.length==0&&<h1>Add friends to Chat</h1>}
                {!loading&&personarray.length==0&&original.length!==0&&<h1>No Results found</h1>}
                {!loading&&personarray.length!==0&& personarray.map((person,index)=>{
                    return <Person_card key={index} person={person} index={index} current_active={current_active} handlecurrent={handlecurrent} />
                    
                })
                }
            </div>
        </div>
    );
}

export default Sidebar;
