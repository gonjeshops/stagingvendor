import FetchDataAndRenderPageB2C from '@/components/FetchDataAndRenderPageB2C'
import ProductsSearchBarB2C from '@/components/Layout/Expenses/ProductsSearchBarB2C'
import ProductsTableRow from '@/components/Layout/Expenses/ProductsTableRow'
import QuotesLayout from '@/components/Layout/Expenses/QuotesLayout'
import TableLayout from '@/components/Layout/Expenses/TableLayout'
import {  useState } from 'react'
import { fetchProducts, fetchShopDetailsAndProducts } from '../../componentsB2b/Api2'
import { Button } from '@/components/ui/button'

const Products = () => {
    const header = ['Image', 'Product Name', 'Shop Name', 'Price', 'Discount', 'Sale Price', 'Quantity', 'Status', 'Actions'];
  

  const [search, setSearch] = useState('');
    const [shop, setShop] = useState('');
   
    const renderProductTable = ({ data }) => {
      if (data?.data?.products?.length) {
        return (
          <TableLayout header={header}>
            <ProductsTableRow data={data?.data?.products} />
          </TableLayout>
        );
      } else {
        return (
          <div className="absolute text-semibold inset-0 flex items-center justify-center text-center">
            <p>No Products found.</p>
          </div>
        );
      }
    };
  
    return (
      <QuotesLayout>
        <div className="rounded-lg overflow-hidden bg-white w-full mt-10 space-y-6">
          <div className='py-4 w-full px-4'>
            <ProductsSearchBarB2C setSearch={setSearch} setShop={setShop}/>
            {
                search?.userId ? 
                <div className='pt-4 flex gap-4 items-center flext-wrap'>
                    <p>Products from '{shop}'</p>
                    <Button onClick={()=>setSearch('')}>View All Products</Button>
                </div> : search?.length ? 
                <div className='pt-4 flex gap-4 items-center flext-wrap'>
                    <p>Fitered products with '{search}'</p>
                    <Button onClick={()=>setSearch('')}>View All Products</Button>
                </div> : 
                <p className='pt-4 font-bold'>All Products</p>
            }
          </div>
          <FetchDataAndRenderPageB2C
            fetchDataFunction={fetchProducts}
            fetchDataByIdFunction={fetchShopDetailsAndProducts}
            renderComponent={renderProductTable}
            pageLimit={20}
            loadingTimeoutDuration={8000}
            search={search}

          />
        </div>
      </QuotesLayout>
    );
  };
  
  export default Products;
  