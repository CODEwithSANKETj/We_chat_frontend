import { useState } from "react";

function useSignin(){
    const [loading,setloading] = useState(false)
    const signin = async({username,password})=>{
        const result = validateinput(username,password)
        if(!result){
            return 'Input provide all details'
        }
        setloading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_API_URL}/api/auth/login`,{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({username,password}),
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
            return 'Interval server Error'
        }
        finally{
            setloading(false)
        }
    }
    return [loading,signin]
}
export default useSignin
function validateinput(username,password){
    if(!username ||!password){
        return false
    }
    return true
}