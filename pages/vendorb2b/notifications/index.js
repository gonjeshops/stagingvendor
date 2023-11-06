import Workspace from "@/componentsB2b/Workspace/Workspace";
import Notifications from "@/componentsB2b/Notifications/Notifications";
import { fetchNotifications } from "@/componentsB2b/Api2";
import { PageLoading } from "@/componentsB2b/Loader/Spinner/PageLoading";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Pagination from "@/componentsB2b/Pagination";


const NotificationsPage = () => {

  const router = useRouter();
  const limit = 10;
  const page = parseInt(router.query.page) || 1;

  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(false);


  const handlePageChange = (newPage) => {
    router.push(`/notifications?page=${newPage}`);
  };

  useEffect(() => {
    
    const timeoutId = setTimeout(() => {
      setLoadingTimeout(true);
    }, 8000);
    console.log('page==== ',page)

    const fetchData = async () => {
      try {
        const response = await fetchNotifications(limit, page);

        if (response.status === 200) {
          setNotifications(response?.data?.data?.notifications);
          setTotalPages(response?.data?.data?.total_pages);
      console.log('NOTIFICATIONS RESPONSE==== ',response)

        } else {
          setError('Something went wrong. Try again');
        }
        setPageLoading(false);
        clearTimeout(timeoutId); 
      } catch (error) {
        setError('Server is not available. Refer to developer');
        setPageLoading(false);
        clearTimeout(timeoutId);
        console.error('Catch error=', error);
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
          { console.log('loading==', pageLoading)}

        <div className='absolute inset-0 flex items-center justify-center'>
          <PageLoading/>
        </div>
      </Workspace>
    );
  }

  if (error) {
    return (
      <Workspace>
          { console.log('error==', error)}

        <div className='absolute inset-0 flex items-center justify-center'>Error: {error}</div>
      </Workspace>
    );
  }

 return (
  <Workspace>
  <div className="space-y-12 h-full">
    <div className="pb-28">
      <Notifications notificationList={notifications} />

    </div>

    <div className="absolute bottom-0 bg-light100 pb-4  left-0 w-full">
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  </div>
</Workspace>
  )    
}

export default NotificationsPage;

