import OrderDetails from '@/componentsB2b/Order/OrderDetails';
import Workspace from '@/componentsB2b/Workspace/Workspace';


import { FaAddressBook,FaMapMarkerAlt,FaGift, FaComment,FaBox, FaCalendarAlt, FaEnvelope,FaPhone, FaUser } from 'react-icons/fa';


// Simulated data fetching function
const fetchOrderDetails = async (orderId) => {
  // Fetch order details from your API using orderId
  const response = await fetch(`/api/orders/${orderId}`);
  const orderDetails = await response.json();
  return orderDetails;
};

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

const OrderDetailsPage = ({ orderId }) => {

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

  return (
    <div className="section-padding">

    <Workspace>
        <OrderDetails order={orderId} fakeData={quoteDetails}/>
    </Workspace>
    </div>
  );
};

export default OrderDetailsPage;
