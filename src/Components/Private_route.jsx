import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function Private_route({children}) {
    const Auth = useSelector((Store)=>Store.Auth.Auth)
    if(Auth==false){
        return <Navigate to={'/'}/>

    }

  return (
    <div>{children}</div>
  )
}

export default Private_route