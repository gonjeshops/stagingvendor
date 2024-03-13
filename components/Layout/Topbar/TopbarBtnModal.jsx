import React, { useRef, useState } from 'react'
import { FaBell, FaCarAlt, FaCartArrowDown, FaRegBell, FaRegUserCircle, } from 'react-icons/fa'
import { useClickOutside } from '@/lib/useClickOutside'
import { useSession } from 'next-auth/react'
import { useGlobalState } from '@/context/GlobalStateProvider';
import Image from 'next/image';
import DropDownMenu from './DropDownMenu'

const TopbarBtnModal = () => {
  const {user, setModalType} = useGlobalState()
  const { data: session, status } = useSession()

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
    <div className='relative flex gap-4 items-center'>
      <div className=' relative '>
        <span className="relative flex h-10 w-10  items-center justify-center">
            <span className="relative inline-flex rounded-full p-2 ">
            <FaRegBell className='text-2xl cursor-pointer' 
              onClick={()=>handleToggleDropdown('notification')}/>
            </span>
          </span>

        {show==='notification' && 
        <div ref={dropdownRef} className='absolute -right-10 z-50 shadow-xl border border-gray-500 w-96 rounded-md p-4 overflow-auto text-sm bg-white'>
          {/* <NotificationDropdown setShow={setShow}/> */}
        </div>}
      </div>

      <div onClick={()=>setModalType('cart')} className='relative '>
        <FaCartArrowDown  size={24}/>
      </div>

      <div className=' relative '>
        <div className="flex gap-2 items-center">
            {session?.user?.picture ? 
              <div className="w-8 h-8 flex-shrink-0 overflow-hidden cursor-pointer rounded-full">
                <Image src={session?.user?.picture} alt='user' width={100} height={100}
                 onClick={()=>handleToggleDropdown('user')}/> 
              </div>
                :
              <FaRegUserCircle className='text-4xl text-gray-600 cursor-pointer'
              onClick={()=>handleToggleDropdown('user')}/>
            }
            <p className="max-w-28 text-wrap text-sm max-sm:hidden">{session?.user?.name}</p>
        </div> 

         
          <div ref={dropdownRef} className={`${show==='user' ? 'animate-dropdown' : 'animate-hide'}  absolute right-0  z-50 mt-2 shadow-xl w-60 border border-gray-100 rounded-xl p-4  overflow-auto text-sm bg-gray-50 `}>
            <DropDownMenu/>

          </div>
     
      </div>

    </div>
  )
}

export default TopbarBtnModal