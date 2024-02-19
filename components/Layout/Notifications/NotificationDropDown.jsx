import React, { useState, useEffect, useRef } from 'react';
import NotificationCard from './NotificationCard';
import { BtnSpinner } from '@/componentsB2b/Loader/Spinner/BtnSpinner';
import { fetchb2cNotificications } from '@/componentsB2b/Api2';
// import { vendorShopChannel } from '@/configs/pusherConfig';
import { useGlobalState } from '@/context/GlobalStateContext';

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [pusherNotifications, setPusherNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  let [totalPages, setTotalpages] = useState(2);

  const {user}=useGlobalState()


  const modalRef = useRef();

  // useEffect(() => {
  //   const channel = vendorShopChannel(user?.shop_id)
  //   channel.bind('eventType', function (data) {
  //     console.log('Event pusher notification======', data.message);
  //     // setNotifications(prev=>[...prev, data.message])
  //     setPusherNotifications([data.message])
  //   });
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchb2cNotificications(page, 50, );
        if (response?.status === 200) {
          const data = response?.data?.data;
          if (data.total_pages !== undefined) {
            setTotalpages(data.total_pages);
          }
          setNotifications(data?.notifications);
          setIsLoading(false);
        } else {
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [page]);

  return (
    <div ref={modalRef} className="notification-modal z-50 w-full h-[300px] overflow-y-scroll relative">
      <h1 className='pb-2 mb- border-b font-medium text-lg '>Notifications</h1>
      {error && <p>Error: {error.message}</p>}
      <ul className='space-y '>
            {pusherNotifications?.map(({id, created_at, message, order_id, shop_id, status, title, updated_at, user_id}, index) => (
            <NotificationCard key={index} notifications={notifications} pusherNotifications={pusherNotifications} setNotifications={setNotifications} id={id} created_at={created_at} message={message} order_id={order_id} shop_id={shop_id} status={status} title={title} updated_at={updated_at} user_id={user_id}/>
              
            ))}
            {notifications?.map(({id, created_at, message, order_id, shop_id, status, title, updated_at, user_id}, index) => (
            <NotificationCard key={index} notifications={notifications} pusherNotifications={pusherNotifications} setNotifications={setNotifications} id={id} created_at={created_at} message={message} order_id={order_id} shop_id={shop_id} status={status} title={title} updated_at={updated_at} user_id={user_id}/>
        ))}
          {isLoading &&<div className="flex absolute inset-0 justify-center items-center"><BtnSpinner color={'green'}/></div>}
      </ul>
    </div>
  );
};

export default NotificationDropdown;
