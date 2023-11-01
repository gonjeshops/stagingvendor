import { fetchQuotesWithPendingStatus, fetchVendorInvoice } from "@/componentsB2b/Api2";
import Invoices from "@/componentsB2b/Invoices/Invoices"
import LoadingTimeout from "@/componentsB2b/Loader/LoadingTimeout";
import { PageLoading } from "@/componentsB2b/Loader/Spinner/PageLoading";
import Order from "@/componentsB2b/Order/Order"
import Pagination from "@/componentsB2b/Pagination";
import Workspace from "@/componentsB2b/Workspace/Workspace"
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { useState } from "react";
import { toast } from 'react-toastify';


const Invoice = () => {

  const router = useRouter();
  if (router.query?.stripe_status === 'success') {
    // toast.success('Stripe payment was successful');
  } else if (router.query?.stripe_status === 'cancelled') {
    toast.error('Stripe payment was cancelled');
  }


  const limit = 104;
  const page = parseInt(router.query?.page) || 1;

  const [invoices, setInvoices] = useState([])
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const handlePageChange = (newPage) => {
    router.push(`/vendorb2b/workspace/invoices?page=${newPage}`);
  }


  useEffect(() => {
    const timeoutId = setTimeout(() => {
    setLoadingTimeout(true);
  }, 8000);

  const fetchData = async () => {
    try {
      const response = await fetchQuotesWithPendingStatus(page, limit);
      // const response = await fetchVendorInvoice(page, limit);

      if (response.status === 200) {
          // setInvoices(response?.data?.data?.transactions);
          // setInvoices(response?.data?.data?.quotes);
          setInvoices(response?.data?.data?.quotes.filter(item => !['PENDING', 'SENT', 'REJECTED', 'CANCELLED'].includes(item.status)));
          setTotalPages(response?.data?.data?.total_pages);

          toast.success(response?.data?.message)
    console.log('Fetch all invoices response=== ',response?.data?.data?.quotes)
    // console.log('Fetch all invoices response=== ',response?.data?.data?.transactions)

      } else {
        setError('Something went wrong. Refresh page');
    console.log('Fetch all invoices ERROR=== ',response)
      }
      setLoading(false);
      clearTimeout(timeoutId); // Clear the loading timeout
    } catch (error) {
      setError('Server is not available. Try again');
      setLoading(false);
      clearTimeout(timeoutId); // Clear the loading timeout
      console.error('Fetch all invoices Catch error=', error);
    }
  };

  fetchData();

  return () => clearTimeout(timeoutId);
}, [page]);

 
  const invoice = {

    // page: 'Invoices',
    // tableHeader: ['TRANSACTION ID', 'INVOICE ID', 'ORDER ID', 'AMOUNT', 'BUYER NAME', 'PAYMENT STATUS', 'PAYMENT METHOD', 'DATE'],
    // category: [
    //   {title: 'All', value: '187'},
    //   {title: 'Pending payment', value: '67'},
    //   {title: 'Unfufilled', value: '87'},
    //   {title: 'Completed', value: '56'},
    //   {title: 'Refunded', value: '109'},
    //   {title: 'Failed', value: '6'},
    // ],

    page: 'Invoices',
    tableHeader: ['QUOTE ID', 'INVOICE ID', 'QUOTE NAME', 'SHOP NAME','BUYER NAME', 'ITEMS',  'AMOUNT', 'STATUS', 'DATE'],
    category: [
      {title: 'All', value: '187'},
      {title: 'Pending payment', value: '67'},
      {title: 'Unfufilled', value: '87'},
      {title: 'Completed', value: '56'},
      {title: 'Refunded', value: '109'},
      {title: 'Failed', value: '6'},
    ],


    invoiceData: [
        { id: 1, transactionId: '#2453', date: '2023-08-17', amount: '$87', buyerImgUrl: '/profile1.webp', buyerName: 'Eze Anna', paymentStatus: 'complete', paymentMethod: 'stripe', orderId: '34234', invoiceId: '2534'  },
        { id: 2, transactionId: '#2453', date: '2023-08-17', amount: '$87', buyerImgUrl: '', buyerName: 'Obi Anna', paymentStatus: 'complete', paymentMethod: 'stripe', orderId: '34234', invoiceId: '2534'  },
        { id: 3, transactionId: '#2453', date: '2023-08-17', amount: '$87', buyerImgUrl: '/profile2.webp', buyerName: 'Joe Anna', paymentStatus: 'complete', paymentMethod: 'stripe', orderId: '34234', invoiceId: '2534'  },
        { id: 4, transactionId: '#2453', date: '2023-08-17', amount: '$87', buyerImgUrl: '/profile3.webp', buyerName: 'Bill Anna', paymentStatus: 'complete', paymentMethod: 'stripe', orderId: '34234', invoiceId: '2534'  },
        { id: 5, transactionId: '#2453', date: '2023-08-17', amount: '$87', buyerImgUrl: '', buyerName: 'Amaka Anna', paymentStatus: 'complete', paymentMethod: 'Paypal', orderId: '34234', invoiceId: '2534'  },
        { id: 6, transactionId: '#2453', date: '2023-08-17', amount: '$87', buyerImgUrl: '', buyerName: 'Doga Anna', paymentStatus: 'complete', paymentMethod: 'Card', orderId: '34234', invoiceId: '2534'  },
        { id: 8, transactionId: '#2453', date: '2023-08-17', amount: '$87', buyerImgUrl: '/profile1.webp', buyerName: 'Ray Anna', paymentStatus: 'complete', paymentMethod: 'stripe', orderId: '34234', invoiceId: '2534'  },
        { id: 7, transactionId: '#2453', date: '2023-08-17', amount: '$87', buyerImgUrl: '', buyerName: 'Ife Anna', paymentStatus: 'complete', paymentMethod: 'Paystack', orderId: '34234', invoiceId: '2534'  },
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
            <Invoices invoices={invoice} invoicess={invoices}/>
        </div>

        <div className="absolute bottom-0 bg-light100 pb-4  left-0 w-full">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    </Workspace>
  )    
}

export default Invoice