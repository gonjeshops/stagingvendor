import { fetchQuotesWithPendingStatus } from "@/componentsB2b/Api2"
import RequestQuotes from "@/componentsB2b/Workspace/RequestQuotes"
import Workspace from "@/componentsB2b/Workspace/Workspace"
import { useEffect, useState } from "react"

import { toast } from 'react-toastify'


const ReQuestQuotes = () => {

  const [quotes, setQuotes] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  useEffect(() => {
  
      // Set a loading timeout of 8 seconds (8000 milliseconds)
      const timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
      }, 8000);
  
      const fetchData = async () => {
        try {
          const response = await fetchQuotesWithPendingStatus();
  
          if (response.status === 200) {
              setQuotes(response?.data?.data?.quotes);
              // toast('Updated quote requests')
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
  
      // Cleanup the timeout when the component unmounts
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

    if (loading) {
      return (
        <Workspace>
          <div className='absolute inset-0 flex items-center justify-center'>Loading...</div>
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
            <RequestQuotes quotes={quotes}/>
        </Workspace>

  )    
}

export default ReQuestQuotes