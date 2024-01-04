import React, { useRef, useState } from 'react'
import { FaCartArrowDown, FaRegBell, FaRegUserCircle, FaUser, FaUserAlt, FaUserCircle } from 'react-icons/fa'
import NotificationDropdown from '../Notifications/NotificationDropDown'
import { useGlobalState } from "@/context/GlobalStateContext";
import { useClickOutside } from '@/lib/useClickOutside'
import { useRouter } from "next/router";
import {
  UserPng,
  UserSvg,
  UpcomingDropdown,
  MyOrder,
  MyCart,
  ManageAccountSvg,
  NotificationSvg,
  WalletSvg,
  LogoutSvg,
} from "../../../assets";
import Image from 'next/image';
import ProfileDropdown from './ProfileDropdown';

const TopbarBtnModal = ({userData, logoutVendor}) => {
  const router = useRouter();
  const {user}=useGlobalState()

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
          onClick={()=>handleToggleDropdown('cart')}/>
       
        <div className='absolute w-5 h-5 flex justify-center items-centem text-[10px] bg-gonje-green rounded-full text-white -top-2 -right-3'>10</div>
        {show==='cart' && 
        <div ref={dropdownRef} className='absolute -right-44 z-50 mt-4 shadow-xl border border-gray-500 w-96 h-96 bg-background rounded-md p-4 overflow-auto text-sm '>
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


      <div className=' relative z-50'>
        <div onClick={()=>handleToggleDropdown('user')} className="flex gap-2 items-center">
            {user?.profilePic ? 
              <div className="w-16 h-16 overflow-hidden">
                <Image src={user?.profilePic} alt='user' width={100} height={100}/> 
              </div>
                :
              <FaRegUserCircle className='text-4xl text-gray-600'/>
            }
            <p className="">{user?.user_name}</p>
        </div>

        {show==='user' && 
          <div ref={dropdownRef} className='absolute right-0 z-50 mt-2 shadow-xl border border-gray-500 w-96 h-96 rounded-md p-4 overflow-auto text-sm bg-background'>
            <ProfileDropdown logoutVendor={logoutVendor}/>
          </div>
        }
      </div>

    </div>
  )
}

export default TopbarBtnModal