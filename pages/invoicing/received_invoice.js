import FetchDataAndRenderPageB2C from '@/components/FetchDataAndRenderPageB2C'
import TableLayout from '@/components/Layout/Expenses/TableLayout'
import InvoiceLayout from '@/components/Layout/Invoicing/InvoiceLayout'
import InvoiceSearchBar from '@/components/Layout/Invoicing/InvoiceSearchBar'
import InvoiceTableRow from '@/components/Layout/Invoicing/InvoiceTableRow'
import { fetchReceivedInvoices, fetchSentInvoices } from '@/componentsB2b/Api2'
import { useState } from 'react'

const  ReceivedInvoicePage = () => {

  const header = ['QUOTE ID', 'INVOICE ID', 'QUOTE NAME', 'SHOP NAME','BUYER NAME', 'ITEMS',  'AMOUNT', 'STATUS', 'DATE', 'ACTIONS']

  const [search, setSearch] = useState('')
  const [refresh, setRefresh] = useState(false)

    const renderReceivedInvoicesTable = (response, ) =>  (
        response?.data?.data?.quotes?.length ?
        <TableLayout header={header}>
          {console.log(response?.data?.data?.quotes)}
            <InvoiceTableRow type='received'  data={response?.data?.data?.quotes} setRefresh={setRefresh}/>
        </TableLayout>
        :
        <div className="absolute text-semibold inset-0 flex items-center justify-center text-center">
          <p>No Invoice found.</p>
        </div>
    )


  return (
    <InvoiceLayout 
      searchBar={<InvoiceSearchBar setSearch={setSearch}/>}
      >
      <FetchDataAndRenderPageB2C
          fetchDataFunction={fetchReceivedInvoices}
          renderComponent={renderReceivedInvoicesTable}
          pageLimit = {20}
          loadingTimeoutDuration = {8000}
          refresh={refresh}
          search={search}
      />
    </InvoiceLayout>
  )
}

export default ReceivedInvoicePage