import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from './Redux/Store.js'
import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'
//<ToastContainer style={{left:'50%'}} className='absolute flex flex-row w-10 h-10 top-20 z-10' />
ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={Store}>
    <BrowserRouter>
    <App />
   </BrowserRouter>
 </Provider>
    
,
)
