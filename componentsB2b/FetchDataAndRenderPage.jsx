import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Workspace from './Workspace/Workspace';
import Pagination from './Pagination';
import { PageLoading } from './Loader/Spinner/PageLoading';

const FetchDataAndRenderPage = ({
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
        const response = await fetchDataFunction(page, pageLimit);

        if (response.status === 200) {
          setData(response?.data?.data?.data);
          setTotalPages(response?.data?.data?.total_pages);
        } else {
          setError('Something went wrong. Try again');
        }

        setPageLoading(false);
        clearTimeout(timeoutId); // Clear the loading timeout
      } catch (error) {
        setError('Server is not available. Refer to developer');
        setPageLoading(false);
        clearTimeout(timeoutId); // Clear the loading timeout
        console.error('Catch error=', error);
      }
    };

    fetchData();

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [page, fetchDataFunction, pageLimit, loadingTimeoutDuration]);

  if (loadingTimeout) {
    return (
      <Workspace>
        <div className='absolute inset-0 flex flex-col gap-4 items-center justify-center text-center'>
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
        <div className="pb-28">
          {renderComponent(data)}
        </div>

        <div className="absolute bottom-0 bg-light100 pb-4 left-0 w-full">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </Workspace>
  );
};

export default FetchDataAndRenderPage;
