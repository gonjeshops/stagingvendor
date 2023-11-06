import React, { useState, useEffect, useRef } from 'react';
import { fetchNotifications } from '../Api2';
import NotificationCard from './NotificationCard';
import { BtnSpinner } from '../Loader/Spinner/BtnSpinner';

const NotificationDropdown = ({ initialLimit }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(initialLimit);
  const [page, setPage] = useState(1);
  let [totalPages, setTotalpages] = useState(2);


  const modalRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchNotifications(limit, page);
  
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
    <div ref={modalRef} className="notification-modal w-full h-80 overflow-y-scroll">
      <h1 className='pb-2 mb-4 border-b font-medium text-lg '>Notifications</h1>
      {error && <p>Error: {error.message}</p>}
      <ul className='space-y-3'>
        {notifications?.map(({id, created_at, message, order_id, shop_id, status, title, updated_at, user_id}, index) => (
        //   <li className='pb-3' key={index}>{notification?.message}</li>
        <NotificationCard notifications={notifications} setNotifications={setNotifications} id={id} created_at={created_at} message={message} order_id={order_id} shop_id={shop_id} status={status} title={title} updated_at={updated_at} user_id={user_id}/>
          
        ))}
      </ul>
      {isLoading && <BtnSpinner/>}
    </div>
  );
};

export default NotificationDropdown;
