import FetchDataAndRenderPageB2C from '@/components/FetchDataAndRenderPageB2C'
import QuotesLayout from '@/components/Layout/Expenses/QuotesLayout'
import QuotesSearchBarB2c from '@/components/Layout/Expenses/QuotesSearchBarB2C'
import QuotesTableRow from '@/components/Layout/Expenses/QuotesTableRow'
import TableLayout from '@/components/Layout/Expenses/TableLayout'
import { fetchB2cSentQuotes } from '@/componentsB2b/Api2'
import { useState } from 'react'


const sent_quotes = () => {
  
  const header = ['Quote Number',"Quote Name","Item","Amount", "Quantity", "Issued Date", "Due Date","Status","Actions" ]
  
  const [search, setSearch] = useState('')
  const [refresh, setRefresh] = useState(false)

    const renderSentRequestTable = (response, ) =>  (
        response?.data?.data?.quotes?.length ?
        <TableLayout header={header}>
            <QuotesTableRow type='sent'  data={response?.data?.data?.quotes} setRefresh={setRefresh}/>
        </TableLayout>
        :
        <div className="absolute text-semibold inset-0 flex items-center justify-center text-center">
          <p>No Quotes found.</p>
        </div>
    )

  return (
    <QuotesLayout>
    <div className="rounded-lg overflow-hidden  w-full mt-10 space-y-6">
        <div className='py-4 w-full px-4 bg-white  rounded-lg'>
            <QuotesSearchBarB2c setSearch={setSearch} type='received'/>
        </div>
       <div className="rounded-lg mt-8 bg-white py-4">
       <FetchDataAndRenderPageB2C
                fetchDataFunction={fetchB2cSentQuotes}
                renderComponent={renderSentRequestTable}
                pageLimit = {20}
                loadingTimeoutDuration = {8000}
                search={search}
                refresh={refresh}
            />
       </div>
        
  
            
    </div>
</QuotesLayout>
  )
}

export default sent_quotes