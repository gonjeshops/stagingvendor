import Invoices from "@/componentsB2b/Invoices/Invoices"
import Order from "@/componentsB2b/Order/Order"
import Workspace from "@/componentsB2b/Workspace/Workspace"


const Invoice = () => {
 
  const invoice = {

    page: 'Invoices',
    tableHeader: ['TRANSACTION ID', 'INVOICE ID', 'ORDER ID', 'AMOUNT', 'BUYER NAME', 'PAYMENT STATUS', 'PAYMENT METHOD', 'DATE'],
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

  return (
    <div className="section-padding">
        <Workspace>
            <Invoices invoices={invoice}/>
        </Workspace>
    </div>
  )    
}

export default Invoice