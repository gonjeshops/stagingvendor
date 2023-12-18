import React, { useState, useEffect, useRef } from 'react';
import NotificationCard from './NotificationCard';
import { BtnSpinner } from '@/componentsB2b/Loader/Spinner/BtnSpinner';
import { fetchb2cNotificications } from '@/componentsB2b/Api2';
import { vendorShopChannel } from '@/configs/pusherConfig';

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [pusherNotifications, setPusherNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  let [totalPages, setTotalpages] = useState(2);


  const modalRef = useRef();

  useEffect(() => {
    const channel = vendorShopChannel('5')
    channel.bind('eventType', function (data) {
      console.log('Event pusher notification======', data.message);
      setNotifications([...notifications, data.message])
      setPusherNotifications([data.message])
    });
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchb2cNotificications(page, 20, );
  console.log('notifica====', response)
        if (response?.status === 200) {
          const data = response?.data?.data;
          // Ensure that data.total_pages exists before updating total pages
          if (data.total_pages !== undefined) {
            setTotalpages(data.total_pages);
          }
        //   setNotifications(data.notifications);
          const newNotifications = data.notifications;
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            ...newNotifications,
          ]);
          setIsLoading(false);
          console.log('NOTIFICATION RESPONSE==== ', data);
        } else {
          console.log('NOTIFICATION ERROR RESPONSE==== ', response);
        }
      } catch (err) {
        console.log('NOTIFICATION CATCH ERROR RESPONSE==== ', err);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [page]);

  
  
  const handleScroll = () => {
    const modal = modalRef.current;
    if (modal) {
        if (modal.scrollTop === 0) {
            // User scrolled to the top, increase the page if not on the first page
            if (page > 1) {
              setPage((prevPage) => prevPage - 1);
            }
          } else if (modal.scrollTop + modal.clientHeight >= modal.scrollHeight - 10) {
            // User scrolled to the bottom, increase the page if not on the last page
            if (page < 4) {
              setPage((prevPage) => prevPage + 1);
            }
          }
          
    }
  };


  useEffect(() => {
    modalRef.current.addEventListener('scroll', handleScroll);
    return () => {
      modalRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={modalRef} className="notification-modal w-full h-[400px] overflow-y-scroll">
      <h1 className='pb-2 mb- border-b font-medium text-lg '>Notifications</h1>
      {error && <p>Error: {error.message}</p>}
      <ul className='space-y-'>
            {pusherNotifications?.map(({id, created_at, message, order_id, shop_id, status, title, updated_at, user_id}, index) => (
            //   <li className='pb-3' key={index}>{notification?.message}</li>
            <NotificationCard key={index} notifications={notifications} pusherNotifications={pusherNotifications} setNotifications={setNotifications} id={id} created_at={created_at} message={message} order_id={order_id} shop_id={shop_id} status={status} title={title} updated_at={updated_at} user_id={user_id}/>
              
            ))}
            {notifications?.map(({id, created_at, message, order_id, shop_id, status, title, updated_at, user_id}, index) => (
            //   <li className='pb-3' key={index}>{notification?.message}</li>
            <NotificationCard key={index} notifications={notifications} pusherNotifications={pusherNotifications} setNotifications={setNotifications} id={id} created_at={created_at} message={message} order_id={order_id} shop_id={shop_id} status={status} title={title} updated_at={updated_at} user_id={user_id}/>
        ))}
      </ul>
      {isLoading && <BtnSpinner/>}
    </div>
  );
};

export default NotificationDropdown;
