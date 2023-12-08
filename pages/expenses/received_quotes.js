import FetchDataAndRenderPageB2C from '@/components/FetchDataAndRenderPageB2C'
import ProductsSearchBarB2C from '@/components/Layout/Expenses/ProductsSearchBarB2C'
import QuotesLayout from '@/components/Layout/Expenses/QuotesLayout'
import QuotesTableRow from '@/components/Layout/Expenses/QuotesTableRow'
import TableLayout from '@/components/Layout/Expenses/TableLayout'
import { fetchB2cReceivedQuotes, fetchB2cSentQuotes } from '@/componentsB2b/Api2'
import { useState } from 'react'


const received_quotes = () => {
  
  const header = ['Quote Number',"Quote Name","Item","Amount", "Quantity", "Issued Date", "Due Date","Status","Actions" ]

  const [search, setSearch] = useState('')

    const renderSentRequestTable = (response) =>  (
        response?.data?.data?.quotes?.length ?
        <TableLayout header={header}>
            <QuotesTableRow type='received' data={response?.data?.data?.quotes} />
        </TableLayout>
        :
        <div className="absolute text-semibold inset-0 flex items-center justify-center text-center">
        <p>No Quotes found.</p>
        </div>
    )




  return (
    <QuotesLayout>
    <div className="rounded-lg overflow-hidden bg-white  w-full mt-10 space-y-6">
        <div className='py-4 w-full px-4'>
            <ProductsSearchBarB2C setSearch={setSearch} />
        </div>
            <FetchDataAndRenderPageB2C
                fetchDataFunction={fetchB2cReceivedQuotes}
                renderComponent={renderSentRequestTable}
                pageLimit = {20}
                loadingTimeoutDuration = {8000}
                search={search}
            />
    </div>
</QuotesLayout>
  )
}

export default received_quotes