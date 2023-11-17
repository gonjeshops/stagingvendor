import { fetchQuotesWithPendingStatus } from "@/componentsB2b/Api2"
import LoadingTimeout from "@/componentsB2b/Loader/LoadingTimeout"
import { PageLoading } from "@/componentsB2b/Loader/Spinner/PageLoading"
import Pagination from "@/componentsB2b/Pagination"
import RequestQuotes from "@/componentsB2b/Workspace/RequestQuotes"
import Workspace from "@/componentsB2b/Workspace/Workspace"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


import { toast } from 'react-toastify'


const ReQuestQuotes = () => {

  const router = useRouter();


  if (router?.query?.stripe_status === 'success') {
    toast.success('Stripe payment was successful');
  } else if (router?.query?.stripe_status === 'cancelled') {
    toast.error('Stripe payment was cancelled');
  }
  

  const limit = 84;
  const page = parseInt(router.query.page) || 1;

  const [quotes, setQuotes] = useState([])
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const handlePageChange = (newPage) => {
    router.push(`/vendorb2b/workspace/request-quotes?page=${newPage}`);
  };
  
  useEffect(() => {
        const timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
      }, 8000);
  
      const fetchData = async () => {
        try {
          const response = await fetchQuotesWithPendingStatus(page, limit);
  
          if (response.status === 200) {
            setQuotes(response?.data?.data?.quotes.filter(item => ['PENDING', ].includes(item.status)));
          // setQuotes(response?.data?.data?.quotes);
              setTotalPages(response?.data?.data?.total_pages);

              // toast.success('Updated quote requests')
        console.log('Fetch all quotes-request response=== ',response)
  
          } else {
            setError('Something went wrong. Try again');
        console.log('Fetch all quotes-request ERROR=== ',response)
          }
          setLoading(false);
          clearTimeout(timeoutId); // Clear the loading timeout
        } catch (error) {
          setError('Server is not available. Try again');
          setLoading(false);
          clearTimeout(timeoutId); // Clear the loading timeout
          console.error('Fetch all quotes-request Catch error=', error);
        }
      };
  
      fetchData();
  
      return () => clearTimeout(timeoutId);
    }, [page]);


    if (loadingTimeout) {
      return (
        <Workspace>
             <LoadingTimeout/>
        </Workspace>
      );
    }

    if (loading) {
      return (
        <Workspace>
          <div className='absolute inset-0 flex items-center justify-center'><PageLoading/></div>
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
            <div className="pb-28">
                <RequestQuotes quotes={quotes}/>
            </div>

        <div className="absolute bottom-0 bg-light100 pb-4  left-0 w-full">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
        </Workspace>

  )    
}

export default ReQuestQuotes