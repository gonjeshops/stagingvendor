import { fetchQuoteDetails } from '@/componentsB2b/Api2';
import { PageLoading } from '@/componentsB2b/Loader/Spinner/PageLoading';
import Pagination from '@/componentsB2b/Pagination';
import QuoteRequestDetails from '@/componentsB2b/Workspace/QuoteRequestDetails';
import Workspace from '@/componentsB2b/Workspace/Workspace';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaAddressBook,FaMapMarkerAlt,FaGift, FaComment,FaBox, FaCalendarAlt, FaEnvelope,FaPhone, FaUser } from 'react-icons/fa';


const QuoteRequestDetailsPage = ({ quoteId , error }) => {


console.log(error)
    const router = useRouter();

    const [quoteData, setQuoteData] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [loadingTimeout, setLoadingTimeout] = useState(false);
    const [loading, setLoading] = useState(false)
  
    const [refresh, setRefresh] = useState(null)
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
      }, 8000);
      setLoading(true)
  
      const fetchData = async () => {
        try {
          const response = await fetchQuoteDetails(quoteId);
          if (response.status === 200) {
            setQuoteData(response?.data);
          } else {
            setApiError("Something went wrong. Try again or consult a developer.");
          }
        } catch (error) {
          console.error("Catch error:", error);
          setApiError("Server is not available. Try again or consult a developer.");
        } finally{
          clearTimeout(timeoutId);
          setLoading(false)
        }
      };
  
      fetchData();
  
      return () => clearTimeout(timeoutId);
    }, [quoteId, refresh]);


    if (!quoteId) {
        return (
          <Workspace>
            <div className="absolute inset-0 flex items-center justify-center">
              Error: There's an error feedback from the server. Refresh the page or consult the developer.
            </div>
          </Workspace>
        );
      }
    
      if (apiError) {
        return (
          <Workspace>
            <div className="absolute inset-0 flex items-center justify-center">{apiError}</div>
          </Workspace>
        );
      }
    
      if (!quoteId || isNaN(quoteId)) {
        return (
          <Workspace>
            <div className="absolute inset-0 flex items-center justify-center">
              Error: The URL should contain a valid shop Id and a valid user Id.
            </div>
          </Workspace>
        );
      }

  if (router.isFallback) {
    return <div><PageLoading/></div>;
  }

  return (
        <Workspace>
            {!loading ? 
              <QuoteRequestDetails data={quoteData} setRefresh={setRefresh}/> : 
              <div className="absolute inset-0 flex items-center justify-center">
                  <PageLoading/>
              </div>
            }
        </Workspace>
  )
};

export async function getServerSideProps({params}) {
    try {
      const { quoteId} = params;

  
      return { props: { quoteId: parseInt(quoteId) } };
    } catch (error) {
      console.error("getServerSideProps error: ", error);
      return { props: { quoteId: null, } };
    }
  }



export default QuoteRequestDetailsPage;
