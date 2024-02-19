import Workspace from "@/componentsB2b/Workspace/Workspace";
import Dashboard from "@/componentsB2b/Workspace/Dashboard";
import { PageLoading } from "@/componentsB2b/Loader/Spinner/PageLoading";
import { fetchCounts } from "@/componentsB2b/Api2";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const router = useRouter()

  const [stats, setStats] = useState([]);
  const [error, setError] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoadingTimeout(true);
    }, 8000);
    const fetchData = async () => {
      try {
        const response = await fetchCounts(`vendor/my/stats`);
        if (response?.status === 200) {
          setStats(response?.data);
          // setTotalPages(response?.data?.data?.total_pages);
        // console.log('RESPONSE==== ',response)
        } else {
          setError('Something went wrong. Try again');
        }
      } catch (error) {
        setError('Server is not available. Refer to developer');
        console.log('Catch error===============', error);
      } finally {
        setPageLoading(false);
        clearTimeout(timeoutId); // Clear the loading timeout
      }
    };

    fetchData();
    return () => clearTimeout(timeoutId);
  }, []);

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
            <Dashboard stats={stats} />
        </Workspace>
  )    
}

export default DashboardPage;