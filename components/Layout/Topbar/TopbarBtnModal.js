import React, { useState } from 'react'
import { FaCartArrowDown, FaRegBell, FaUser } from 'react-icons/fa'
import NotificationDropdown from '../Notifications/NotificationDropDown'

const TopbarBtnModal = () => {
  const [show, setShow] = useState('')
  
  return (
    <div className='relative flex gap-4 items-center '>
      {/* btns */}
      {/* <FaUser/> */}

      <div className=' relative'>
        <FaRegBell className='text-2xl' 
          onClick={()=>{
            if(show==='notification') {
              setShow('')
            } else {
              setShow('notification')
            }
          }}/>
        {show==='notification' && 
        <div className='absolute -right-44 z-50 mt-4 shadow-xl border border-gray-500 w-96 bg-red-500 rounded-md p-4 overflow-auto text-sm bg-white'>
          <NotificationDropdown/>
        </div>}
      </div>

      {/* <FaCartArrowDown/> */}
    </div>
  )
}

export default TopbarBtnModal