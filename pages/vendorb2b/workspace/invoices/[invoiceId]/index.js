import { fetchQuoteDetails } from '@/componentsB2b/Api2';
import InvoiceDetails from '@/componentsB2b/Invoices/InvoiceDetails';
import Workspace from '@/componentsB2b/Workspace/Workspace';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';




const InvoiceDetailsPage = ({ invoiceId }) => {

  const router = useRouter();

    const [quoteData, setQuoteData] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [loadingTimeout, setLoadingTimeout] = useState(false);
    
  
    useEffect(() => {
      // Set a loading timeout of 8 seconds (8000 milliseconds)
      const timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
      }, 8000);
  
      const fetchData = async () => {
        try {
          const response = await fetchQuoteDetails(invoiceId);
  
          if (response.status === 200) {
            console.log("API response:", response);
            setQuoteData(response?.data);
          } else {
            setApiError("Something went wrong. Try again or consult a developer.");
          }
          clearTimeout(timeoutId); // Clear the loading timeout
  
        } catch (error) {
          console.error("Catch error:", error);
          setApiError("Server is not available. Try again or consult a developer.");
          clearTimeout(timeoutId); // Clear the loading timeout
        }
      };
  
      fetchData();
  
      // Cleanup the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }, [invoiceId]);


    if (!invoiceId) {
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
    
      if (!invoiceId || isNaN(invoiceId)) {
        return (
          <Workspace>
            <div className="absolute inset-0 flex items-center justify-center">
              Error: The URL should contain a valid shop Id and a valid user Id.
            </div>
          </Workspace>
        );
      }

      if (router.isFallback) {
        return <div>Loading...</div>;
      }

  return (
    <div className="max-w-6xl m-auto px-4">

        <InvoiceDetails invoiceId={invoiceId} fakeData={''} data={quoteData}/>

    </div>
  );
};

export default InvoiceDetailsPage;

export async function getServerSideProps({ params }) {
  const { invoiceId } = params;
//   const orderDetails = await fetchOrderDetails(invoiceId);

  return {
    props: {
    //   orderDetails
    invoiceId
    }
  };
}