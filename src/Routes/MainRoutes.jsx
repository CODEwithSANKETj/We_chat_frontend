import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Dashboard from '../Pages/Dashboard'
import Private_route from '../Components/Private_route'

function MainRoutes() {
  return (
    <Routes>

        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={
          <Private_route>
              <Dashboard/>
          </Private_route>}/>
        <Route path='*' element={
          <div>
          <h1>404 - Page Not Found</h1>
          <p>The page you're looking for does not exist.</p>
        </div>
        }/>

    </Routes>
  )
}

export default MainRoutes