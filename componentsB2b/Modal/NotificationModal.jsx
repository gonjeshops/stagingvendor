import { useGlobalState } from '@/context/GlobalStateContext';
import { useState, useRef } from 'react'
import { notificationList } from '@/data/notificationList';

import Link from 'next/link';
import NotificationDropdown from '../Notifications/NotificationDropDown';



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
                              <NotificationDropdown initialLimit={8}/>
 

                            <Link href={'/vendorb2b/notifications'} className=' pt-8 flex justify-center items-center text-blue '>
                                View All Notifications
                            </Link>

            </div>
            
            </div>
        </div>
      

  )
}

export default NotificationModal
