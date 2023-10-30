import React, { useState, useEffect, useRef } from 'react';

import Workspace from '@/componentsB2b/Workspace/Workspace';
import DashboardHeading from '@/componentsB2b/Workspace/DashboardHeading';
import { PageLoading } from '@/componentsB2b/Loader/Spinner/PageLoading';
import { fetchNotifications } from '@/componentsB2b/Api2';
import NotificationCard from '@/componentsB2b/card/NotificationCard';
import Pagination from '@/componentsB2b/Pagination';
import { useRouter } from 'next/router';

const NotificationPage = ({  }) => {
  const router = useRouter();
  const limit = 14;
  const page = parseInt(router.query.page) || 1;

  const [notifications, setNotifications] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const handlePageChange = (newPage) => {
    router.push(`/vendorb2b/notifications?page=${newPage}`);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoadingTimeout(true);
    }, 8000);
 

    const fetchData = async () => {
      try {
        const response = await fetchNotifications(page, limit)
        
        if (response?.status === 200) {
            setNotifications(response?.data?.data?.notifications);
            setTotalPages(response?.data?.data?.total_pages);

            console.log('NOTIFICATION RESPONSE==== ',response)
        } else {
            console.log('NOTIFICATION ERROR RESPONSE==== ',response)
            setError('Something went wrong. Try again');
        }
      } catch (err) {
        console.log('NOTIFICATION CATCH ERROR RESPONSE==== ', err)
        setError('Server is not available. Refer to developer');
      } finally {
        setPageLoading(false);
        clearTimeout(timeoutId);
      }
    };

    fetchData();
    return () => clearTimeout(timeoutId);
  }, [page]);

  if (loadingTimeout) {
    return (
      <Workspace>
            <div className='absolute inset-0 flex flex-col gap-4 items-center justify-center text-center'>
              { console.log('loadingTimeout==', loadingTimeout)}
                <p className="text-lg font-semibold">
                Server is not responding. Please choose an action:
                </p>
                <div className="flex items-center gap-4">
                  <button className='hover-blue rounded py-2 px-4' onClick={() => router.back()}>Go Back</button>
                  <button className='hover-blue rounded py-2 px-4' onClick={() => window.location.reload()}>Reload</button>
                </div>
            </div>
      </Workspace>
    );
  }

  if (pageLoading) {
    return (
      <Workspace>
        <div className='absolute inset-0 flex items-center justify-center'>
        <PageLoading/>
        </div>
      </Workspace>
    );
  }

  if (error) {
    return (
      <Workspace>
        <div className='absolute inset-0 flex items-center justify-center'>Error: {error}</div>
      </Workspace>
    );
  }

 

  return (
    <Workspace>
       <div className="space-y-12 h-full">
      <div  className=" ">
        <DashboardHeading>
        Notifications
        </DashboardHeading>
      {error && <p className='absolute inset-0 flex items-center justify-center'>Error: {error.message}</p>}
      <ul className='space-y-3'>
        {notifications?.map((notification, index) => (
          <NotificationCard key={notification?.id} item={notification}/>
        ))}
      </ul>
    </div>
    <div className="absolute bottom-0 bg-light100 pb-4  left-0 w-full">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>

    </Workspace>
    
  );
};

export default NotificationPage;
