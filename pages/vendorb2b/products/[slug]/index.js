
import ProductDetails from '@/componentsB2b/Products/ProductDetails'
import Workspace from '@/componentsB2b/Workspace/Workspace';

const CourseLMSPage = ({ course }) => {
    
    const product = [
        {
            rating: 5,
            heading: `Onje Foods Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque veniam eaque exercitationem.`,
            bestseller: '#1 Best Seller',
            price: `$1345.99`,
            discount: `$1567.99`,
            off: `10%`,
            status: `In Stock`,
            offerEnds: `13:00:45 hours`,
            imgList: [1,2,3,4,5,6,7,8,9,10,11,]
        },
    ]

//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   if (!course || undefined) {
//     return <div>Course not found</div>;
//   }

  return (
        <Workspace>
            <ProductDetails product={product}/>
        </Workspace>
  )
};

// export async function getServerSideProps({ params, req }) {
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
//     // Fetch course data by slug
//     const course = await getCoursesBySlug(params.slug); // Implement your API fetch method

//     if (!course) {
//       return {
//         notFound: true, // Return a 404 response if course is not found
//       };
//     }

//     return { props: { course } };
//   } catch (error) {
//     // console.error(error);
//     return { props: { course: null } };
//   }
// }

export default CourseLMSPage;
