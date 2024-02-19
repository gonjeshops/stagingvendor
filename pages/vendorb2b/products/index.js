import ProductsCatalogue from "@/componentsB2b/Products/ProductsCatalogue"
import  { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Workspace from '@/componentsB2b/Workspace/Workspace';
import { fetchProductsCatalogue, fetchSuppliersByPagination } from '@/componentsB2b/Api2';
import Pagination from '@/componentsB2b/Pagination';
import { PageLoading } from '@/componentsB2b/Loader/Spinner/PageLoading';



const ProductsPage = () => {

    const router = useRouter();
    const limit = 12;
    const page = parseInt(router.query.page) || 1;
  
    const [productsData, setProductsData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState('');
    const [pageLoading, setPageLoading] = useState(true);
    const [loadingTimeout, setLoadingTimeout] = useState(false);
  
    const handlePageChange = (newPage) => {
      router.push(`/vendorb2b/products?page=${newPage}`);
    };
  
    useEffect(() => {
      
      const timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
      }, 8000);
   
  
      const fetchData = async () => {
        try {
          setPageLoading(true)
          const response = await fetchProductsCatalogue(page, limit);
          if (response.status === 200) {
            setProductsData(response?.data?.data?.products);
            setTotalPages(response?.data?.data?.total_pages);
            console.log('RESPONSE fetchProductsCatalogue==== ',response?.data?.data?.products)
          } else {
            setError(response?.error || 'Something went wrong. Try again');
          }
        } catch (error) {
          setError('Server is not available. Refer to developer');
          console.error('Catch error=', error);
        } finally {
          setPageLoading(false);
          clearTimeout(timeoutId);
        }
      };
      fetchData();
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
          <div className='absolute inset-0 flex items-center justify-center'>
          <PageLoading/>
          </div>
        </Workspace>
      );
    }
  
    if (error) {
      return (
        <Workspace>
          <div className='absolute inset-0 flex items-center justify-center'>Error: {error}</div>
        </Workspace>
      );
    }
  
    return (
      <Workspace>
        <div className="space-y-12 h-full">
          <div className="pb-28">
            <ProductsCatalogue productsList={productsData} />
          </div>
          <div className="absolute bottom-0 bg-light100 pb-4  left-0 w-full">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </Workspace>
    );
  };
  
export default ProductsPage