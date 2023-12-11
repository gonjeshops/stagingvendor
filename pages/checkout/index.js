import Checkout from '@/components/Checkout'
import FetchDataAndRenderPageB2C from '@/components/FetchDataAndRenderPageB2C'
import InvoiceDetails from '@/components/Layout/Invoicing/InvoiceDetails'
import { fetchB2CQuoteDetails, fetchQuoteDetails } from '@/componentsB2b/Api2'
import { useRouter } from 'next/router'
import{ useState } from 'react'



const CheckoutPage = () =>  {
    const router = useRouter()
        const [search, setSearch] = useState('')
      const [refresh, setRefresh] = useState(false)
    
        const renderInvoice = (response, ) =>  (
            response?.data?.quote ?
                <Checkout  checkoutData={response?.data?.quote} setRefresh={setRefresh}/>
            :
            <div className="absolute text-semibold inset-0 flex items-center justify-center text-center">
              <p>No data found.</p>
            </div>
        )
    
      return (
        <FetchDataAndRenderPageB2C
              fetchDataFunction={fetchB2CQuoteDetails}
              renderComponent={renderInvoice}
              pageLimit = {20}
              loadingTimeoutDuration = {10000}
              refresh={refresh}
              search={search}
              id={router?.query?.invoiceId}
          />
      )
    }
    
    export default CheckoutPage
    
    // export async function getServerSideProps({ params }) {
    //     const { invoiceId } = params;
    //     return {
    //       props: {
    //       invoiceId
    //       }
    //     };
    //   }