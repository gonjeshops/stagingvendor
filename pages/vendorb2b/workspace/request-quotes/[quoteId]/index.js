
import ProductDetails from '@/components/Products/ProductDetails'
import QuoteRequestDetails from '@/components/Workspace/QuoteRequestDetails';
import Workspace from '@/components/Workspace/Workspace';
import { useRouter } from 'next/router';
import { FaAddressBook,FaMapMarkerAlt,FaGift, FaComment,FaBox, FaCalendarAlt, FaEnvelope,FaPhone, FaUser } from 'react-icons/fa';


const QuoteRequestDetailsPage = ({ quoteId }) => {

    const router = useRouter()
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
    <div className="section-padding">
        <Workspace>
            <QuoteRequestDetails content={quoteDetails}/>
        </Workspace>
    </div>


  )
};

export async function getServerSideProps({ params, req }) {
    const quoteId = params.quoteId
    return { props: {quoteId} };

  // const session = await getSession({ req });

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/auth/signin', // Redirect to login page if not authenticated
  //       permanent: false,
  //     },
  //   };
  // }

//   try {
//     // Fetch quote request data by slug
//     const quote = await getQuoteById(params.quoteId); // Implement your API fetch method

//     if (!quote) {
//       return {
//         notFound: true, // Return a 404 response if course is not found
//       };
//     }

    // return { props: { quote } };
//   } catch (error) {
//     // console.error(error);
//     return { props: { course: null } };
//   }
}

export default QuoteRequestDetailsPage;
