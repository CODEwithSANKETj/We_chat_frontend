import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'js-cookie';
function useSignout() {
  const [loading,setloading] = useState(false)
  const signout =async()=>{
    setloading(true)
    try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/auth/logout`)
        Cookies.remove('jwt')
        return res.data
    } catch (error) {
        return error.message
    }
    finally{
        setloading(true)
    }
  }
  return [loading,signout]
}

export default useSignout