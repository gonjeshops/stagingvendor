import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '@/componentsB2b/Pagination';
import { PageLoading } from '@/componentsB2b/Loader/Spinner/PageLoading';

const FetchDataAndRenderPageB2C = ({
  fetchDataFunction,
  fetchDataByIdFunction,
  renderComponent,
  pageLimit = 12,
  loadingTimeoutDuration = 8000,
  search,
  refresh,
  id,
}) => {
  const router = useRouter();
  const page = parseInt(router.query.page) || 1;

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const handlePageChange = (newPage) => {
    router.push(`?page=${newPage}`);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoadingTimeout(true);
    }, loadingTimeoutDuration);

    const fetchData = async () => {
      try {
        setPageLoading(true)
        if(id) {
          const response = await fetchDataFunction(id);
            console.log('Item details', response)
            if (response?.status === 200) {
              setData(response);
            } else {
              setError('Something went wrong. Try again');
            }
        } else {
            if(search.userId) {
              const response = await fetchDataByIdFunction(search?.userId, search?.shopId, page, pageLimit, '');
                console.log('fetch 1 shop products API RESPONSES', response)
                if (response?.status === 200) {
                  setData(response);
                  setTotalPages(response?.data?.data?.total_pages);
                } else {
                  setError('Something went wrong. Try again');
                }
            } else {
                const response = await fetchDataFunction(page, pageLimit, search);
                console.log('API RESPONSES', response)
                if (response?.status === 200) {
                  setData(response);
                  setTotalPages(response?.data?.data?.total_pages);
                } else {
                  setError('Something went wrong. Try again', response?.status);
                }
              }
        }
      } catch (error) {
        setError('Server is not available. Refer to developer');
        console.error('Catch error=', error);
      } finally {
        setPageLoading(false);
        clearTimeout(timeoutId);
      }
    };

    fetchData();
    return () => clearTimeout(timeoutId);
  }, [page,refresh, id, search, fetchDataFunction, pageLimit, loadingTimeoutDuration]);

  if (loadingTimeout) {
    return (
        <div className='absolute inset-0 flex flex-col gap-4 items-center justify-center text-center'>
          <p className="text-lg font-semibold">
            Server is not responding. Please choose an action:
          </p>
          <div className="flex items-center gap-4">
            <button className='hover-blue rounded py-2 px-4' onClick={() => router.back()}>Go Back</button>
            <button className='hover-blue rounded py-2 px-4' onClick={() => window.location.reload()}>Reload</button>
          </div>
        </div>
    );
  }

  if (pageLoading) {
    return (
        <div className='absolute inset-0 flex items-center justify-center'>
          <PageLoading/>
        </div>
    );
  }

  if (error) {
    return (
        <div className='absolute inset-0 flex items-center justify-center'>Error: {error}</div>
    );
  }

  return (
      <div className=" " >
        <div className="h-[90vh] overflow-auto relative ">
          {renderComponent(data)}
        </div>
        {!id && totalPages && <div className="  bg-light100 w-full">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>}
      </div>

  );
};

export default FetchDataAndRenderPageB2C;
