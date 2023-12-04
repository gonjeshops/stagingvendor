import Checkout from '@/componentsB2b/Checkout/Checkout'
import { fetchQuoteDetails } from '@/componentsB2b/Api2';
import LoadingTimeout from '@/componentsB2b/Loader/LoadingTimeout';
import { PageLoading } from '@/componentsB2b/Loader/Spinner/PageLoading';
import Workspace from '@/componentsB2b/Workspace/Workspace';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CheckoutPage = () => {
  const router = useRouter();
console.log('query', router?.query?.invoiceId)
    const [quoteData, setQuoteData] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [loadingTimeout, setLoadingTimeout] = useState(false);
    const [loading, setLoading] = useState(false);
    
  
    useEffect(() => {
      // Set a loading timeout of 8 seconds (8000 milliseconds)
      const timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
      }, 8000);
  
      const fetchData = async () => {
        try {
          setLoading(true)
          // if (!router?.query?.invoiceId) return

          const response = await fetchQuoteDetails(parseInt(router?.query?.invoiceId, 10));
  
          if (response?.status === 200) {
            console.log("API response:", response);
            setQuoteData(response?.data?.quote);
          } else {
            setApiError(response?.error || "Referenced data was not found.");
          }
        } catch (error) {
          console.error("Catch error:", error);
          setApiError("Server is not available. Try again or consult a developer.");
        } finally {
          setLoading(false)
          clearTimeout(timeoutId); // Clear the loading timeout
        }
      };
  
      fetchData();
  
      // Cleanup the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }, [router?.query?.invoiveId]);




      if (loadingTimeout) {
        return (
          <Workspace>
                <LoadingTimeout/>
          </Workspace>
        );
      }

      if (apiError) {
        return (
          <Workspace>
            <div className='absolute inset-0 flex flex-col gap-4 justify-center items-center '>
              <p>{apiError}</p>
              <div className="flex justify-center">
                <button className='hover-blue rounded p-3' onClick={()=>router.push(`/vendorb2b/workspace/invoices`)}>Back to Invoice</button>
              </div>
            </div>          
          </Workspace>
        );
      } 

        // If the data is not yet available (during static generation), return loading state
      if (router.isFallback) {
        return <div className='inset-0 flex justify-center items-center'><PageLoading/></div>;
      }



  return (
  
      <Workspace>
        { loading ? <div className='absolute inset-0 flex items-center justify-center'><PageLoading/></div>  :
        <Checkout  checkoutData={quoteData} /> }
    </Workspace>

    
  )
}

export default CheckoutPage