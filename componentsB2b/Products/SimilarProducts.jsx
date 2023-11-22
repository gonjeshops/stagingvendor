import { useRouter } from 'next/router';
import ProductCard2 from '../card/productCard2'
import { useEffect, useState } from 'react';
import { viewSupplierShopProducts } from '../Api2';
import { PageLoading } from '../Loader/Spinner/PageLoading';
import { useGlobalState } from '@/context/GlobalStateContext';
import Pagination from '../Pagination';



const SimilarProducts = ({small, }) => {
    const router = useRouter();
    const {supplierDetails, useB2Bcart:{shop} } = useGlobalState()

    const [supplierProducts, setSupplierProducts] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [loadingTimeout, setLoadingTimeout] = useState(false);
    const [loading, setLoading] = useState(false);


    const userId = router?.query?.userId, shopId = router?.query?.shopId

    let limit = 12;
    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(0);
 
    const handlePageChange = (newPage) => {
      setPage(newPage);
    };

  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
      }, 8000);

      const fetchData = async () => {
          try {
            setLoading(true)
            const response = await viewSupplierShopProducts(shop?.ownerId || userId, shop?.id || shopId,  page, limit);

            console.log('=s', shop?.ownerId, '=' ,shop?.id, '=',  page, '=', limit, '=', shop)
    
            if (response?.status === 200) {
              console.log("API Similar products response:", response?.data?.data?.products);

              setSupplierProducts(response?.data?.data?.products);

              setTotalPages(response?.data?.data?.total_pages)
            } else {
              setApiError("Something went wrong. Try again or consult a developer.")
              console.error("Something went wrong.", response );
            }
            clearTimeout(timeoutId); 
    
          } catch (error) {
            console.error("Catch error:", error);
            setApiError("Server is not available. Try again or consult a developer.");
            clearTimeout(timeoutId); 
          } finally {
            setLoading(false)
          }
        }
     
      fetchData();  
      return () => clearTimeout(timeoutId);
    }, [page, shop?.ownerId]);
  
  
    if (loadingTimeout) {
      return (

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

      );
    }
  
    // if (apiError) {
    //   return (

    //       <div className="absolute inset-0 flex items-center justify-center">{apiError}</div>

    //   );
    // }

  
    return (
         <div >
            {
               
              <>
                <h4 className='font-medium pb-2 text-xl'>Products From The Same Shop </h4>
                { !loading ?
                <div className={small ? 'w-full h-[83vh]  grid  overflow-hidden border gap-8 p-2' : ' min-h-96 w-full grid gap-8 overflow-hidden p-2 border'}>
                      {/* product listing */}
                      <div className={small ? 'w-full h-[100%] grid sm:grid-cols-2  overflow-auto  rounded-lg  2:grid-cols-3   gap-4' : ' h-[100%] w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4'}>
                        {
                          supplierProducts?.map((item, i)=>(
                            <div key={item?.id}>
                                <ProductCard2 product={item} userId={shop?.ownerId} shopId={shop?.id} targetId={'top'}/>
                            </div>
                            )) 
                        }

                    </div>

                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
                  :
                <div className="absolute inset-0 flex items-center justify-center">
                <PageLoading/>
              </div>
            }
              </>
            }
         </div>
  )
}

export default SimilarProducts