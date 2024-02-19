import { fetchOrders } from "@/componentsB2b/Api2";
import LoadingTimeout from "@/componentsB2b/Loader/LoadingTimeout";
import { PageLoading } from "@/componentsB2b/Loader/Spinner/PageLoading";
import Order from "@/componentsB2b/Order/Order"
import Pagination from "@/componentsB2b/Pagination";
import Workspace from "@/componentsB2b/Workspace/Workspace"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const Orders = () => {

  const router = useRouter();


  const limit = 104;
  const page = parseInt(router.query?.page) || 1;

  const [orderlist, setOrderlist] = useState([])
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const handlePageChange = (newPage) => {
    router.push(`/vendorb2b/workspace/orders?page=${newPage}`);
  }


  useEffect(() => {
    const timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
      }, 8000);

    const fetchData = async () => {
      try {
        const response = await fetchOrders(page, limit);
        console.log('Fetch all response=== ',response)

        if (response.status === 200) {
          
            setOrderlist(response?.data?.data?.quotes.filter(item => !['PENDING', 'SENT', 'REJECTED', 'CANCELLED'].includes(item.status)));
            setTotalPages(response?.data?.data?.total_pages);

            console.log('Fetch all order response=== ', orderlist)
        } else {
          setError('Something went wrong. Refresh page');
          console.log('Fetch all orderlist ERROR=== ',response)
        }    
      } catch (error) {
        setError('Server is not available. Try again');
        console.error('Fetch all orderlist Catch error=', error);
      } finally {
        setLoading(false);
        clearTimeout(timeoutId); 
      }
    };

    fetchData();

    return () => clearTimeout(timeoutId);
  }, [page]);


  const orders = {
    category: [
      {title: 'All', value: '187'},
      {title: 'Pending payment', value: '67'},
      {title: 'Unfufilled', value: '87'},
      {title: 'Completed', value: '56'},
      {title: 'Refunded', value: '109'},
      {title: 'Failed', value: '6'},
    ],
    orderData: [
        { id: 1, orderId: '#2453', date: '2023-08-17', total: '$87', customerImgUrl: '/', customerName: 'Carry Anna', paymentStatus: 'complete', fulfillmentStatus: 'canceled', deliveryType: 'Cash on Delivery',  },
        { id: 2, orderId: '#2453', date: '2023-08-17', total: '$87', customerImgUrl: '/', customerName: 'Milind Miko', paymentStatus: 'failed', fulfillmentStatus: 'pending', deliveryType: 'Cash on Delivery',  },
        { id: 3, orderId: '#2453', date: '2023-08-17', total: '$87', customerImgUrl: '/', customerName: 'Stanly Obi', paymentStatus: 'canceled', fulfillmentStatus: 'ready to pickup', deliveryType: 'Cash on Delivery',  },
        { id: 4, orderId: '#2453', date: '2023-08-17', total: '$87', customerImgUrl: '/', customerName: 'Igor Borvis', paymentStatus: 'complete', fulfillmentStatus: 'partially fulfilled', deliveryType: 'Cash on Delivery',  },
        { id: 5, orderId: '#2453', date: '2023-08-17', total: '$87', customerImgUrl: '/', customerName: 'Carry Anna', paymentStatus: 'complete', fulfillmentStatus: 'canceled', deliveryType: 'Cash on Delivery',  },
        { id: 6, orderId: '#2453', date: '2023-08-17', total: '$87', customerImgUrl: '/', customerName: 'Carry Anna', paymentStatus: 'complete', fulfillmentStatus: 'canceled', deliveryType: 'Cash on Delivery',  },
        { id: 7, orderId: '#2453', date: '2023-08-17', total: '$87', customerImgUrl: '/', customerName: 'Carry Anna', paymentStatus: 'complete', fulfillmentStatus: 'canceled', deliveryType: 'Cash on Delivery',  },
        { id: 8, orderId: '#2453', date: '2023-08-17', tota: '$87', customerImgUrl: '/', customerName: 'Carry Anna', paymentStatus: 'complete', fulfillmentStatus: 'canceled', deliveryType: 'Cash on Delivery',  },
        { id: 9, orderId: '#2453', date: '2023-08-17', total: '$87', customerImgUrl: '/', customerName: 'Carry Anna', paymentStatus: 'complete', fulfillmentStatus: 'canceled', deliveryType: 'Cash on Delivery',  },
        { id: 10, orderId: '#2453', date: '2023-08-17', total: '$87', customerImgUrl: '/', customerName: 'Carry Anna', paymentStatus: 'complete', fulfillmentStatus: 'canceled', deliveryType: 'Cash on Delivery',  },
        { id: 11, orderId: '#2453', date: '2023-08-17', total: '$87', customerImgUrl: '/', customerName: 'Carry Anna', paymentStatus: 'complete', fulfillmentStatus: 'canceled', deliveryType: 'Cash on Delivery',  },
        { id: 12, orderId: '#2453', date: '2023-08-17', total: '$87', customerImgUrl: '/', customerName: 'Carry Anna', paymentStatus: 'complete', fulfillmentStatus: 'failed', deliveryType: 'Cash on Delivery',  },
    ]
  }



  if (loadingTimeout) {
    return (
      <Workspace>
           <LoadingTimeout/>
      </Workspace>
    );
  }

  if (loading) {
    return (
      <Workspace>
        <div className='absolute inset-0 flex items-center justify-center'><PageLoading/></div>
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
          <div className="pb-28">
            <Order orders={orders} orderlist={orderlist}/>
          </div>

          <div className="absolute bottom-0 bg-light100 pb-4  left-0 w-full">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </Workspace>


  )    
}

export default Orders