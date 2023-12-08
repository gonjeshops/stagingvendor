import FetchDataAndRenderPageB2C from '@/components/FetchDataAndRenderPageB2C'
import FilterCollection from '@/components/Layout/Expenses/FilterCollection'
import ProductsSearchBarB2C from '@/components/Layout/Expenses/ProductsSearchBarB2C'
import ProductsTableRow from '@/components/Layout/Expenses/ProductsTableRow'
import QuotesLayout from '@/components/Layout/Expenses/QuotesLayout'
import TableLayout from '@/components/Layout/Expenses/TableLayout'
import { fetchProducts } from '@/componentsB2b/Api2'
import { useState } from 'react'

const products = () => {
    const header = ['Image',	'Product Name',	'Shop Name',	'Price',	'Discount',	'Sale Price',	'Quantity',	'Status',	'Actions']

  const [search, setSearch] = useState('')

    const renderRequestTable = (response) =>  (
        response?.data?.data?.products?.length ?
        <TableLayout header={header}>
            <ProductsTableRow  data={response?.data?.data?.products} />
        </TableLayout>
        :
        <div className="absolute text-semibold inset-0 flex items-center justify-center text-center">
        <p>No Products found.</p>
        </div>
    )

    return (
        <QuotesLayout>
            <div className="rounded-lg overflow-hidden bg-white  w-full mt-10 space-y-6">
                <div className='py-4 w-full px-4'>
                    <ProductsSearchBarB2C setSearch={setSearch} />
                </div>
                    <FetchDataAndRenderPageB2C
                        fetchDataFunction={fetchProducts}
                        renderComponent={renderRequestTable}
                        pageLimit = {20}
                        loadingTimeoutDuration = {8000}
                        search={search}
                    />
            </div>
        </QuotesLayout>
      )
    }

export default products