import FetchDataAndRenderPageB2C from '@/components/FetchDataAndRenderPageB2C'
import InvoiceDetails from '@/components/Layout/Invoicing/InvoiceDetails'
import { fetchB2CQuoteDetails, fetchQuoteDetails, fetchReceivedInvoicesDetails, fetchSentInvoicesDetails } from '@/componentsB2b/Api2'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const InvoiceDetailsPage = ({invoiceId}) => {

  const [search, setSearch] = useState('')
  const [refresh, setRefresh] = useState(false)
  const { query}=useRouter()

    const renderInvoice = (response, ) =>  (
        response?.data?.data ?
            <InvoiceDetails path={query.path}  data={response?.data?.data} setRefresh={setRefresh}/>
        :
        <div className="absolute text-semibold inset-0 flex items-center justify-center text-center">
          <p>No Invoice found.</p>
        </div>
    )

  return (
    <FetchDataAndRenderPageB2C
          fetchDataFunction={query?.path === 'sent' ? fetchSentInvoicesDetails : fetchReceivedInvoicesDetails }
          renderComponent={renderInvoice}
          pageLimit = {20}
          loadingTimeoutDuration = {10000}
          refresh={refresh}
          search={search}
          id={invoiceId}
      />
  )
}

export default InvoiceDetailsPage

export async function getServerSideProps({ params }) {
    const { invoiceId } = params;
    return {
      props: {
      invoiceId
      }
    };
  }