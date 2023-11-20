import { useRouter } from 'next/router';
import ProductCard2 from '../card/productCard2'
import { useEffect, useState } from 'react';
import { viewSupplierShopProducts } from '../Api2';
import { PageLoading } from '../Loader/Spinner/PageLoading';
import { useGlobalState } from '@/context/GlobalStateContext';


const SimilarProducts = ({small}) => {
    const router = useRouter();
    const {supplierDetails} = useGlobalState()

    const [supplierProducts, setSupplierProducts] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [loadingTimeout, setLoadingTimeout] = useState(false);
    const [loading, setLoading] = useState(false);

    const userId = router?.query?.userId, shopId = router?.query?.shopId
 
  
    useEffect(() => {
      // Set a loading timeout of 8 seconds (8000 milliseconds)
      const timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
      }, 8000);

      const fetchData = async () => {

        try {
          setLoading(true)
          const response = await viewSupplierShopProducts(userId || supplierDetails?.owner_id, shopId || supplierDetails?.id);
  
          if (response?.status === 200) {
            console.log("API Similar products response:", );
            setSupplierProducts(response?.data?.data?.products);
          } else {
            setApiError("Something went wrong. Try again or consult a developer.")
          }
          clearTimeout(timeoutId); // Clear the loading timeout
  
        } catch (error) {
          console.error("Catch error:", error);
          setApiError("Server is not available. Try again or consult a developer.");
          clearTimeout(timeoutId); // Clear the loading timeout
        } finally {
          setLoading(false)
        }
      };
  
      fetchData();
  
      // Cleanup the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }, [userId, shopId]);
  
  
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
              loading ? <div className="inset-0 flex justify-center items-center"> <PageLoading/></div> :
              <>
                <h4 className='font-medium pb-2 text-xl'>Products From The Same Shop </h4>
                <div className={small ? 'w-full grid sm:grid-cols-2 h-[83vh] overflow-auto border rounded-lg p-2 2:grid-cols-3   gap-4' : ' min-h-96 w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4'}>
                    {
                      supplierProducts?.map((item, i)=>(
                        <div key={item?.id}>
                            <ProductCard2 product={item} userId={userId} shopId={shopId} targetId={'top'}/>
                        </div>
                        )) 
                    }

                </div>
              </>
            }
         </div>
  )
}

export default SimilarProducts