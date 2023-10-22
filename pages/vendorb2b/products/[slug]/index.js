
import { viewSupplierShopProductDetails } from '@/componentsB2b/Api2';
import { PageLoading } from '@/componentsB2b/Loader/Spinner/PageLoading';
import ProductDetails from '@/componentsB2b/Products/ProductDetails'
import Workspace from '@/componentsB2b/Workspace/Workspace';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProductDetailsPage = ({  userId, shopId, productId,  error}) => {

  const router = useRouter();

  const [productData, setProductData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [loadingTimeout, setLoadingTimeout] = useState(false);


  useEffect(() => {

    // Set a loading timeout of 8 seconds (8000 milliseconds)
    const timeoutId = setTimeout(() => {
      setLoadingTimeout(true);
    }, 80000);

    const fetchData = async () => {
      try {
        const response = await viewSupplierShopProductDetails(userId, productId, shopId);

        if (response?.status === 200) {
          console.log("API response:", response);
          setProductData(response?.data);
        } else {
          setApiError("Something went wrong. Try again or consult a developer.");
        }
        clearTimeout(timeoutId); // Clear the loading timeout

      } catch (error) {
        console.error("Catch error:", error);
        setApiError("Server is not available. Try again or consult a developer.");
        clearTimeout(timeoutId); // Clear the loading timeout

      } finally{
        clearTimeout(timeoutId); // Clear the loading timeout

      }
    };

    fetchData();

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [userId, productId, shopId]);

    
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
    
    if (error) {
      return (
        <Workspace>
          <div className="absolute inset-0 flex items-center justify-center">
            Error: There's an error feedback from the server. Try again or consult a developer.
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
  
    if (!userId || isNaN(userId) || !shopId || isNaN(shopId) || !productId || isNaN(productId)) {
      return (
        <Workspace>
          <div className="absolute inset-0 flex items-center justify-center">
            Error: The URL should contain a valid shop Id and a valid user Id.
          </div>
        </Workspace>
      );
    }

  return (
        <Workspace>
            {productData ? <ProductDetails product={productData} p={product}/> : <div className="absolute inset-0 flex items-center justify-center">
              <PageLoading/>  
            </div>}
        </Workspace>
  )
};

export async function getServerSideProps({ query }) {
  try {
    const { userId, shopId, productId } = query;

    if (!userId || isNaN(userId) || !shopId || isNaN(shopId) || !productId || isNaN(productId)) {
      throw new Error("Invalid userId or shopId in the query parameters.");
    }

    return { props: { userId: parseInt(userId), shopId: parseInt(shopId), productId: parseInt(productId) } };
  } catch (error) {
    console.error("getServerSideProps error:", error);
    return { props: { userId: null, shopId: null,  productId: null, error: error } };
  }
}

export default ProductDetailsPage;
