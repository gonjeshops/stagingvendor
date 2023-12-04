import { fetchQuoteDetails } from '@/componentsB2b/Api2';
import LoadingTimeout from '@/componentsB2b/Loader/LoadingTimeout';
import { PageLoading } from '@/componentsB2b/Loader/Spinner/PageLoading';
import OrderDetails from '@/componentsB2b/Order/OrderDetails';
import Workspace from '@/componentsB2b/Workspace/Workspace';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


import { FaAddressBook,FaMapMarkerAlt,FaGift, FaComment,FaBox, FaCalendarAlt, FaEnvelope,FaPhone, FaUser } from 'react-icons/fa';


const OrderDetailsPage = ({ orderId }) => {
    const router = useRouter();

    const [orderData, setOrderData] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [loadingTimeout, setLoadingTimeout] = useState(false);
    const [loading, setLoading] = useState(false);
    
  
    useEffect(() => {

      const timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
      }, 8000);
  
      const fetchData = async () => {
        try {
        setLoading(true)

          const response = await fetchQuoteDetails(orderId);
  
          if (response?.status === 200) {
            console.log("API response:", response);
            setOrderData(response?.data);
          } else {
            setApiError("Something went wrong. Try again or consult a developer.");
          }
        } catch (error) {
          console.error("Catch error:", error);
          setApiError("Server is not available. Try again or consult a developer.");
        } finally {
          clearTimeout(timeoutId); 
          setLoading(false)
        }
      };
  
      fetchData();
  
      // Cleanup the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }, [orderId]);



    const quoteDetails = 
    {
        quoteId: orderId,
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
            <div className="absolute inset-0 flex items-center justify-center">{apiError}</div>
          </Workspace>
        );
      }
    
      if (!orderId || isNaN(orderId)) {
        return (
          <Workspace>
            <div className="absolute inset-0 flex items-center justify-center">
              Error: The URL should contain a valid order Id.
            </div>
          </Workspace>
        );
      }

   

        // If the data is not yet available (during static generation), return loading state
      if (router.isFallback) {
        return <div className='inset-0 flex justify-center items-center'><PageLoading/></div>;
      }

      // If orderData is not found, render a 404 page
      if (!orderData) {
        return <div className='inset-0 flex justify-center items-center'>Page not found</div>;
      }

  return (

    <Workspace>
         { loading ? <div className='absolute inset-0 flex items-center justify-center'><PageLoading/></div>  :
        <OrderDetails order={orderId} fakeData={quoteDetails} data={orderData} />}
    </Workspace>

  );
};

export default OrderDetailsPage;




export async function getServerSideProps({ params }) {
    const { orderId } = params;
  //   const orderDetails = await fetchOrderDetails(orderId);
  
    return {
      props: {
      //   orderDetails
      orderId
      }
    };
  }
  