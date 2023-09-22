import Workspace from "@/componentsB2b/Workspace/Workspace";
import Link from "next/link";



const SupplierDetailsPage = ({ supplier }) => {
    

//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   if (!course || undefined) {
//     return <div>Course not found</div>;
//   }

  return (
    <div className="section-padding">
      <Workspace>
    <div className="font-bold text-4xl text-center h-[600px] flex justify-center items-center">
        <div className="">
            <p>{supplier}</p>
            <p className='text-base pb-20'>No ui for supplier store details page</p>
            <Link className="text-base text-blue-800"  href={'/suppliers'}>{`<     Back to stores`}</Link>
        </div>
    </div>
    </Workspace>
    </div>
  )

    
};

export async function getServerSideProps({ params, req }) {
//   const session = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth/signin', // Redirect to login page if not authenticated
//         permanent: false,
//       },
//     };
//   }

  try {
    // Fetch course data by slug
    // const course = await getCoursesBySlug(params.slug); // Implement your API fetch method

    const supplier = params.slug


    // if (!course) {
    //   return {
    //     notFound: true, // Return a 404 response if course is not found
    //   };
    // }

    return { props: { supplier } };
  } catch (error) {
    // console.error(error);
    return { props: { supplier: null } };
  }
}

export default SupplierDetailsPage;
