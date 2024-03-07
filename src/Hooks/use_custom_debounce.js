import React, { useEffect, useRef } from 'react'

function use_custom_debounce(callback,delay) {
 const timeoutref = useRef(null)
 useEffect(()=>{
    return ()=>{
        clearTimeout(timeoutref.current)
    }
 },[])
 const debouncefunction=(...args)=>{
            if(timeoutref.current){
                clearTimeout(timeoutref.current)
            }
            timeoutref.current = setTimeout(()=>{
                callback(...args)
            },delay)
    }
    return debouncefunction
}

export default use_custom_debounce