import React, { useState, useEffect, useRef } from 'react';
import { fetchNotificationDropdown, fetchNotifications } from '../Api2';
import NotificationCard from '../card/NotificationCard';

const NotificationComponent = ({ initialLimit }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(initialLimit);

  const modalRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchNotificationDropdown(8)
        
        if (response?.status === 200) {
            setNotifications(response?.data?.data?.notifications);
            setIsLoading(false);
            console.log('NOTIFICATION DROPDOWN==== ',response)
        } else {
            console.log('NOTIFICATION DROPDOWN ERROR RESPONSE==== ',response)
        }
        
      } catch (err) {
        console.log('NOTIFICATION DROPDOWN CATCH ERROR RESPONSE==== ', err)
        // setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [limit]);

  const handleScroll = () => {
    const modal = modalRef.current;
    if (modal) {
      if (modal.scrollTop === 0) {
        // User scrolled to the top, increase the limit
        setLimit((prevLimit) => prevLimit + 8);
      } else if (modal.scrollHeight - modal.clientHeight === modal.scrollTop) {
        // User scrolled to the bottom, decrease the limit
        setLimit((prevLimit) => Math.max(0, prevLimit - 8));
      }
    }
  };

  useEffect(() => {
    modalRef.current.addEventListener('scroll', handleScroll);
    return () => {
      modalRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={modalRef} className="notification-modal w-full ">
      <h1 className='pb-2 mb-4 border-b font-medium text-lg '>Notifications</h1>
      {error && <p>Error: {error.message}</p>}
      <ul className='space-y-3'>
        {notifications?.map((notification, index) => (
          <NotificationCard key={notification?.id} item={notification}/>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default NotificationComponent;
