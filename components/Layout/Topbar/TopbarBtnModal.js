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
import CartNotificationDropdown from "./CartNotificationDropdown"

const TopbarBtnModal = ({userData,alertUpdate, logoutVendor}) => {
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
    <div className='relative flex gap-6 items-center'>

      {/* <div className=' relative z-50'>
        <FaCartArrowDown className=' text-2xl cursor-pointer' 
          onClick={()=>handleToggleDropdown('cart')}/>
        {show==='cart' && 
        <div ref={dropdownRef} className='absolute -right-44 z-50 mt-4 shadow-xl border border-gray-500 w-96 h-96 bg-background rounded-md p-4 overflow-auto text-sm '>
          <CartNotificationDropdown setShow={setShow}/>
        </div>}
      </div> */}

      <div className=' relative '>
        <span className="relative flex h-10 w-10  items-center justify-center">
            <span className="relative inline-flex rounded-full p-2 ">
            <FaRegBell className='text-2xl cursor-pointer' 
              onClick={()=>handleToggleDropdown('notification')}/>
            </span>
          </span>

          {alertUpdate ? <><div className='absolute w-5 h-5 flex justify-center items-centem text-[10px] animate-ping bg-red-500 rounded-full text-white -top-0 -right-0'>
          </div>
          <div className='absolute w-5 h-5 flex justify-center items-centem text-[10px]  bg-red-500 rounded-full text-white -top-0 -right-0'></div>  </>  : ''}

        {show==='notification' && 
        <div ref={dropdownRef} className='absolute -right-44 z-50 mt-4 shadow-xl border border-gray-500 w-96 rounded-md p-4 overflow-auto text-sm bg-white'>
          <NotificationDropdown setShow={setShow}/>
        </div>}
      </div>


      <div className=' relative '>
        <div className="flex gap-2 items-center">
            {user?.profilePic ? 
              <div className="w-16 h-16 overflow-hidden cursor-pointer">
                <Image src={user?.profilePic} alt='user' width={100} height={100}
                 onClick={()=>handleToggleDropdown('user')}/> 
              </div>
                :
              <FaRegUserCircle className='text-4xl text-gray-600 cursor-pointer'
              onClick={()=>handleToggleDropdown('user')}/>
            }
            <p className="">{user?.user_name}</p>
        </div>

        {show==='user' && 
          <div ref={dropdownRef} className='absolute right-0  z-50 mt-2 shadow-xl border border-gray-500 w-96  rounded-md p-4 overflow-auto text-sm bg-background'>
            <ProfileDropdown logoutVendor={logoutVendor} setShow={setShow}/>
          </div>
        }
      </div>

    </div>
  )
}

export default TopbarBtnModal