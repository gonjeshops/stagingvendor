import React, { useRef, useState } from 'react'
import { FaCartArrowDown, FaRegBell, FaUser } from 'react-icons/fa'
import NotificationDropdown from '../Notifications/NotificationDropDown'
import { useClickOutside } from '@/lib/useClickOutside'

const TopbarBtnModal = () => {
  const dropdownRef = useRef(null);
  const [show, setShow] = useState('')

  const handleToggleDropdown = (type) => {
    if(show===type) {
      setShow('')
    } else {
      setShow(type)
    }
  };

  const handleCloseDropdown = () => {
    setShow('');
  };

  useClickOutside(dropdownRef, handleCloseDropdown)
  
  return (
    <div className='relative flex gap-8 items-center z-50 '>
      {/* btns */}
      {/* <FaUser/> */}
      <div className=' relative z-50'>
        <FaCartArrowDown className=' text-2xl' 
          onClick={()=>handleToggleDropdown('user')}/>
       
        <div className='absolute w-5 h-5 flex justify-center items-centem text-[10px] bg-gonje-green rounded-full text-white -top-2 -right-3'>10</div>
        {show==='user' && 
        <div ref={dropdownRef} className='absolute -right-44 z-50 mt-4 shadow-xl border border-gray-500 w-96 h-96 bg-red-500 rounded-md p-4 overflow-auto text-sm bg-white'>
        </div>}
      </div>

      <div className=' relative z-50'>
        {/* <div className='p-2 rounded-full border-2 border-red-500'>

        <FaRegBell className='text-2xl' 
          onClick={()=>handleToggleDropdown('notification')}/>
        </div> */}
        <span className="relative flex h-10 w-10 flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full p-2 bg-sky-500">
            <FaRegBell className='text-2xl' 
              onClick={()=>handleToggleDropdown('notification')}/>
            </span>
          </span>

          <div className='absolute w-5 h-5 flex justify-center items-centem text-[10px] bg-red-500 rounded-full text-white -top-0 -right-0'>10</div>

          

        {show==='notification' && 
        <div ref={dropdownRef} className='absolute -right-44 z-50 mt-4 shadow-xl border border-gray-500 w-96 bg-red-500 rounded-md p-4 overflow-auto text-sm bg-white'>
          <NotificationDropdown/>
        </div>}
      </div>

      {/* <FaCartArrowDown/> */}
    </div>
  )
}

export default TopbarBtnModal