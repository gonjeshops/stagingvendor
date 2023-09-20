
import ManageQuoteDetails from '@/componentsB2b/Workspace/ManageQuotes';
import Workspace from '@/componentsB2b/Workspace/Workspace';
import { useRouter } from 'next/router';


const QuoteRequestDetailsPage = ({ quoteId }) => {


    const router = useRouter()
    const quoteDetails = {
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
            <ManageQuoteDetails content={quoteDetails}/>
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
