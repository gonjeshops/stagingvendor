import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '@/componentsB2b/Pagination';
import { PageLoading } from '@/componentsB2b/Loader/Spinner/PageLoading';

const FetchDataAndRenderPageB2C = ({
  fetchDataFunction,
  renderComponent,
  pageLimit = 8,
  loadingTimeoutDuration = 8000,
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
        const response = await fetchDataFunction(page, pageLimit);
console.log('API RESPONSES', response?.data?.data?.products)
        if (response.status === 200) {
          setData(response);
          setTotalPages(response?.data?.data?.total_pages);
        } else {
          setError('Something went wrong. Try again');
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
  }, [page, fetchDataFunction, pageLimit, loadingTimeoutDuration]);

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
 
      <div className="space-y-12 h-full">
        <div className="pb-28">
          {renderComponent(data)}
        </div>

        <div className="absolute -bottom-2 bg-light100 left-0 w-full">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>

  );
};

export default FetchDataAndRenderPageB2C;
