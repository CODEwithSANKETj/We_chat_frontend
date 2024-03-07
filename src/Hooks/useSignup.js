import React, { useState } from 'react';
import toast from 'react-hot-toast';

function useSignup(input) {
  const [loading, setLoading] = useState(false);

  const signup = async ({ fullname, password, gender, username, retype_pass }) => {
    const result = validatePassword(password, retype_pass);

    // if (!result) {
    //   toast.error('Both passwords should match', {
    //     position: 'bottom-center'
    //   });
    //   return;
    // }

    setLoading(true);

    try {
      if(!result){
        throw new Error('Both Password Should match')

      }
      const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, password, gender, username })
      });
      
      const data = await res.json();
      if(res.ok){
        return data;
      }
      else{
       
        return data.msg
      }
      
    } catch (error) {
      
      return error.message
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
}

export default useSignup;

function validatePassword(password, retype_pass) {
  return password === retype_pass;
}
