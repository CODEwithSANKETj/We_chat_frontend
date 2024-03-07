import axios from 'axios'
import React, { useState } from 'react'
///
function use_get_pending() {
    const [loading,setloading] = useState(false)
    const get_pending_req=async()=>{
        setloading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/user/get_all_pending_req`,{
                withCredentials:true
            })
            if(res.data){
                return res.data.msg
            }
            else{
                throw new Error(res?.data?.msg)
            }
            
        } catch (error) {
            return (error.message?error.message:'Interval server error')
        }
        finally{
            setloading(false)
        }
    }
    return [loading,get_pending_req]
}

export default use_get_pending