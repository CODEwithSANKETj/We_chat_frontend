import axios from 'axios'
import React, { useState } from 'react'

function usegetallusers() {
    const [fetchloading,setloading] = useState(false)
    const getallusers=async(search_text)=>{
      
        setloading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/user/getall?search=${String(search_text)}`,{
                withCredentials:true
            })
            if(res.data){
                return res.data
            }
            throw new Error('failed to fetch data')
        } catch (error) {
            return 'Something went wrong'
        }
        finally{
            setloading(false)
        }
    }
    return [fetchloading,getallusers]
}

export default usegetallusers