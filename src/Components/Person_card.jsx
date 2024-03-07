import React from 'react'
import { useSelector } from 'react-redux'
//
function Person_card({person,index,current_active,handlecurrent}) {
  const {fullname,profilePic} = person
  const active_users = useSelector((Store)=>Store.Socket.onlineusers)
  const res = active_users.includes(person._id)
  let main_card = `flex gap-2 ${index==current_active?'bg-blue-200':''} items-center rounded p-2 py-1 hover:cursor-pointer`
  return (
    <>
      <div className={main_card} onClick={()=>handlecurrent(index,person)}>
      <div className={`avatar ${res?'online':''}`}>
        <div className='w-12 rounded-full'>
          <img className="h-12 w-12 rounded-full" src={profilePic} alt="Person's Photo"/>
        </div>
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex gap-3 justify-between'>
          <p className='font-bold text-black-200'>{fullname}</p>
          <span className='text-xl'></span>
        </div>
      </div>
    </div>
    <div className='divider my-0 py-0 h-1'></div>
    </>

  )
}

export default Person_card