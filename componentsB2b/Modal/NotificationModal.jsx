import { useGlobalState } from '@/context/GlobalStateContext';
import { useState, useRef } from 'react'
import Notifications from '../Notifications/Notifications';
import { notificationList } from '@/data/notificationList';
import ImgCard from "../card/ImgCard"
import { FaClock, FaTrash, FaRegCircle, FaBook, FaCheckCircle } from "react-icons/fa"

import Link from 'next/link';
import NotificationComponent from '../Notification';



const NotificationModal = ({ stopPropagation }) => {

    const {modalType, closeModal} = useGlobalState()


    const [notifications, setNotifications] = useState(notificationList[2].items);

    const markAsRead = (notificationId) => {
      // Update the notification as read in the state (you may update this logic)
      const updatedNotifications = notifications.map((item) => {
        return {
            ...item,
            isRead: item.isRead ? false : true
        } })
      setNotifications(updatedNotifications);
    };
  
    const deleteNotification = (notificationId) => {
      // Remove the notification from the state (you may update this logic)
      const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
      setNotifications(updatedNotifications);
    };

  return (

        <div onClick={closeModal} className={`${modalType==='notification' ? 'opacity-100 scale-y-100' : 'opacity-50 scale-y-0' } transition-transform transform duration-500 absolute inset-0  z-50`}
        style={{transformOrigin:'50px 50px '}}
        > 

        <div className="section-padding absolute inset-0">
            <div onClick={stopPropagation} className="shadow-xl bg-light100 sm:w-[500px] rounded-lg px-4 py-8 absolute top-14 right-0"> 
{/* 
                            {
                                notifications?.map(({username, id, userImgUrl, isRead, time, date, message, }, idx)=>(
                                    <div key={idx} className="border-b  p-4 hover:bg-light300 duration-300 flex gap-4 ">
                                        <div className="h-12 w-12 overflow-hidden flex-shrink-0 rounded-full bg-zinc-300">
                                            <ImgCard src={'/profile1.webp'} alt={'user'}/>
                                        </div>

                                        <div className="w-full">
                                            <div className="flex gap-4 justify-between">
                                                <div className="pb-4 w-full">
                                                    <h6 className="font-medium">{username}</h6>
                                                    <p className="">{message}</p>
                                                </div>
                                                <div onClick={()=>markAsRead(id)} className="hover:scale-110 duration cursor-pointer text-lg  text-green-600">
                                                    {isRead ? <FaCheckCircle /> : <FaRegCircle />}
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                            <div className="flex items-center gap-2">
                                                <FaClock/>
                                                <p>{date},  {time}</p>
                                            </div>
                                            <div className="flex items-center justify-end gap-3 text-base">
                                                {/* <div className="hover:scale-110 duration cursor-pointer  text-blue-600"><FaBook/></div> */}
                                                
                                                {/* <div onClick={()=>deleteNotification(id)} className="hover:scale-110 duration cursor-pointer  text-red-600"><FaTrash/></div>
                                            </div>
                                            </div>

                                        </div> */}


{/* 
                            //         </div>
                            //     ))
                            // }

 */}

                    <NotificationComponent initialLimit={8}/>
 

                            <Link href={'/vendorb2b/notifications'} className=' pt-8 flex justify-center items-center text-blue '>
                                View All Notifications
                            </Link>

            </div>
            
            </div>
        </div>
      

  )
}

export default NotificationModal
