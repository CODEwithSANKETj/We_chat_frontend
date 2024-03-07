import axios from 'axios'
import React, { useState } from 'react'

function usesendrequest() {
    const [reqLoading, setloading] = useState(false);
    //
    const sendRequest = async (requestTo) => {
    
      try {
        setloading(true);
        const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/api/managefriend/addfriend/${String(requestTo)}`,{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        })
        const data = await res.json()
       
        if(!res.ok){
            if(data && data.msg){
                return data.msg;
            }
            return 'Something went wrong'
        }
        
        return data
       
      } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
        return 'Internal Server Error'; // or handle error state in your component
      } finally {
        setloading(false);
      }
    };
  
    return [reqLoading, sendRequest];
}

export default usesendrequest