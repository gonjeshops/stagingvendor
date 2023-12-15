import OrderDetails from "@/components/Layout/OrdersVendors/OrderDetails";
import FetchDataAndRenderPageB2C from '@/components/FetchDataAndRenderPageB2C'
import { fetchIncomingOrdersDetails, fetchOutgoingOrdersDetails, } from '@/componentsB2b/Api2'
import { useRouter } from 'next/router'
import  { useState } from 'react'

const OrderDetailsPage = ({orderId}) => {


  const [search, setSearch] = useState('')
  const [refresh, setRefresh] = useState(false)
  const { query}=useRouter()

    const renderOrder = (response, ) =>  (
        response?.data?.data ?
            <OrderDetails path={query.path}  data={response?.data?.data} setRefresh={setRefresh}/>
        :
        <div className="absolute text-semibold inset-0 flex items-center justify-center text-center">
          <p>No Order Details found.</p>
        </div>
    )
  
    return (
      <FetchDataAndRenderPageB2C
          fetchDataFunction={query?.path === 'incoming' ? fetchIncomingOrdersDetails : fetchOutgoingOrdersDetails }
          renderComponent={renderOrder}
          pageLimit = {20}
          loadingTimeoutDuration = {10000}
          refresh={refresh}
          search={search}
          id={orderId}
        />
    )
  }

  export default OrderDetailsPage

  export async function getServerSideProps({ params }) {
    
    try {
      const { orderId } = params;
      console.log('id======', orderId)
      return {
        props: {
          orderId: orderId || null
        }
      };
    } catch (error) {
      console.log('getserversider error', error)
      return {
        props: {
          orderId: null
        }
      };
    }
    
  }

  