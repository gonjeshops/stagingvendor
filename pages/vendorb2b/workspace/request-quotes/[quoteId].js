
import { fetchQuoteDetails } from '@/componentsB2b/Api2';
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
  
  
    useEffect(() => {
      // Set a loading timeout of 8 seconds (8000 milliseconds)
      const timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
      }, 8000);
  
      const fetchData = async () => {
        try {
          const response = await fetchQuoteDetails(quoteId);
  
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
    }, [quoteId]);


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


    // =================================


    const quoteDetails = 
        {
            quoteId: quoteId,
            customerId: 2362847,
            product: [
                {
                    imageUrl: 1,
                    details: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam illum natus dolorem eius quaerat beatae eos consequuntur ipsum? Sed autem recusandae sunt magni nemo expedita omnis ducimus voluptates similique.`,
                    price: 0.60,
                    quantity: 2,
                },
                {
                    imageUrl: 2,
                    details: `Description2 Lorem ipsum dolor  similique.`,
                    price: 9.99,
                    quantity: 1,
                },
            ],
            itemsSubtotal: 11.19,
            billingDetails: [
                {title: 'Customer', value: `Shatron Meakalan`, icon: <FaUser/> },
                {title: 'Email', value: `gonje@email.com`, icon: <FaEnvelope/> },
                {title: 'Phone', value: `1234567890`, icon: <FaPhone/> },
                {title: 'Address', value: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, eligend`, icon: <FaMapMarkerAlt/> },
            ],
            shippingDetails: [
                {title: 'Email', value: `john@email.com`, icon: <FaEnvelope/> },
                {title: 'Phone', value: `1234567890`, icon: <FaPhone/> },
                {title: 'Shippping Date', value: `12 APril 2023`, icon: <FaCalendarAlt/> },
                {title: 'Address', value: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`, icon: <FaMapMarkerAlt/> },
            ],
            otherDetails: [
                {title: 'Gift Order', value: `Yes`, icon: <FaGift/> },
                {title: 'Wrapping', value: `Magic wrapper`, icon: <FaBox/> },
                {title: 'Shippping Date', value: `12 APril 2023`, icon: <FaCalendarAlt/> },
                {title: 'Gift Messsage', value: `Happy birthday message Shinya, Lots of love`,  icon: <FaComment/> },
            ],
            summary: [
                {
                    title: `Items Subtotal:`,
                    value: 691
                },
                {
                    title: `Discount:`,
                    value: 59
                },
                {
                    title: `Tax:`,
                    value: 126
                },
                {
                    title: `Subtotal:`,
                    value: 740
                },
                {
                    title: `Shipping Cost:`,
                    value: 30
                },
            ],
            status: ['Draft', '', '']
        }
    

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

//   if (!quote || undefined) {
//     return <div>Course not found</div>;
//   }

  return (

        <Workspace>
            <QuoteRequestDetails content={quoteDetails} data={quoteData}/>
        </Workspace>



  )
};

export async function getServerSideProps({params}) {
    try {
      const { quoteId} = params;
      
  
    //   if (!quoteId || isNaN(quoteId) ) {
    //     throw new Error("Invalid quoteId.");
    //   }
  
      return { props: { quoteId: parseInt(quoteId) } };
    } catch (error) {
      console.error("getServerSideProps error: ", error);
      return { props: { quoteId: null, } };
    }
  }



export default QuoteRequestDetailsPage;
