import React, { useState } from 'react'
///api/managefriend/acceptfriend/:id
function use_accept_request() {
    const [ accept_loading,setloading] = useState(false)
    const accept_req=async(id_to_accept)=>{
        setloading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/api/managefriend/acceptfriend/${id_to_accept}`,{
                method:"POST",
                headers:{'Content-Type':"application/json"},
                credentials:'include'
            })
            
            if(res.ok){
                return res
            }
            throw new Error(res.msg?res.msg:res)
        } catch (error) {
            return error.message?error.message:'failed to accept the request'
        }
        finally{
            setloading(false)
        }
    }
    return [accept_loading,accept_req]
}

export default use_accept_request