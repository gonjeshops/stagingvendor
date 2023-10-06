import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Workspace from '@/componentsB2b/Workspace/Workspace';
import SuppliersCatalogue from '@/componentsB2b/Suppliers/SuppliersCatalogue';
import { fetchSuppliersByPagination } from '@/componentsB2b/Api2';
import Pagination from '@/componentsB2b/Pagination';


const Supplier = () => {
  const router = useRouter();
  const limit = 4;
  const page = parseInt(router.query.page) || 1;

  const [suppliersData, setSuppliersData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const handlePageChange = (newPage) => {
    router.push(`/vendorb2b/suppliers?page=${newPage}`);
  };

  useEffect(() => {
    
    // Set a loading timeout of 8 seconds (8000 milliseconds)
    const timeoutId = setTimeout(() => {
      setLoadingTimeout(true);
    }, 8000);
    console.log('page==== ',page)

    const fetchData = async () => {
      try {
        const response = await fetchSuppliersByPagination(page, limit);

        if (response.status === 200) {
          setSuppliersData(response?.data?.data?.data);
          setTotalPages(response?.data?.data?.total_pages);
      console.log('RESPONSE==== ',response)

        } else {
          setError('Something went wrong. Try again');
        }

        setPageLoading(false);
        clearTimeout(timeoutId); // Clear the loading timeout
      } catch (error) {
        setError('Server is not available. Refer to developer');
        setPageLoading(false);
        clearTimeout(timeoutId); // Clear the loading timeout
        console.error('Catch error=', error);
      }
    };

    fetchData();

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [page]);

  if (loadingTimeout) {
    return (
      <Workspace>
            <div className='absolute inset-0 flex flex-col gap-4 items-center justify-center text-center'>
              { console.log('loadingTimeout==', loadingTimeout)}
                <p className="text-lg font-semibold">
                Server is not responding. Please choose an action:
                </p>
                <div className="flex items-center gap-4">
                  <button className='hover-blue rounded py-2 px-4' onClick={() => router.back()}>Go Back</button>
                  <button className='hover-blue rounded py-2 px-4' onClick={() => window.location.reload()}>Reload</button>
                </div>
            </div>
      </Workspace>
    );
  }

  if (pageLoading) {
    return (
      <Workspace>
          { console.log('loading==', pageLoading)}

        <div className='absolute inset-0 flex items-center justify-center'>Loading...</div>
      </Workspace>
    );
  }

  if (error) {
    return (
      <Workspace>
          { console.log('error==', error)}

        <div className='absolute inset-0 flex items-center justify-center'>Error: {error}</div>
      </Workspace>
    );
  }

  return (
    <Workspace>
      <div className="space-y-12 h-full">
        <div className="pb-28">
        <SuppliersCatalogue suppliersData={suppliersData} />

        </div>

        <div className="absolute bottom-0 bg-light100 pb-4  left-0 w-full">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </Workspace>
  );
};

export default Supplier;


// import React, {  useState } from 'react';

// import Workspace from '@/componentsB2b/Workspace/Workspace';
// import SuppliersCatalogue from '@/componentsB2b/Suppliers/SuppliersCatalogue';
// import { fetchSuppliersByPagination } from '@/componentsB2b/Api2';
// import Pagination from '@/componentsB2b/Pagination';

// import TimeoutLoader from '@/componentsB2b/TimeoutLoader'; // Import the TimeoutLoader component

// const Supplier = () => {
//   const limit = 4;
//   const [suppliersData, setSuppliersData] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [error, setError] = useState('');
//   const [pageLoading, setPageLoading] = useState(true);

//   const handlePageChange = (newPage) => {
//     // Set loading state when changing pages
//     setPageLoading(true);
//     fetchData(newPage);
//   };

//   const fetchData = async (page) => {
//     try {
//       const response = await fetchSuppliersByPagination(page, limit);

//       if (response.status === 200) {
//         setSuppliersData(response?.data?.data?.data);
//         setTotalPages(response?.data?.data?.total_pages);
//       } else {
//         setError('Something went wrong. Try again');
//       }
//     } catch (error) {
//       setError('Server is not available. Refer to developer');
//       console.error('Catch error=', error);
//     } finally {
//       setPageLoading(false); // Clear loading state when data fetching is complete
//     }
//   };

//   return (
//     <Workspace>
//       <TimeoutLoader timeoutDuration={8000} onTimeout={() => setError('Server is not responding.')}>
//         {pageLoading ? (
//           <div className='absolute inset-0 flex items-center justify-center'>Loading...</div>
//         ) : error ? (
//           <div className='absolute inset-0 flex items-center justify-center'>Error: {error}</div>
//         ) : (
//           <div className="space-y-12 h-full">
//         <div className="pb-28">
//       <SuppliersCatalogue suppliersData={suppliersData} />

//        </div>

//         <div className="absolute bottom-0 bg-light100 pb-4  left-0 w-full">
//          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
//         </div>
//      </div>
//         )}
//       </TimeoutLoader>
//     </Workspace>
//   );
// };

// export default Supplier;
