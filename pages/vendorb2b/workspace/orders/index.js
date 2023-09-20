import Order from "@/componentsB2b/Order/Order"
import Workspace from "@/componentsB2b/Workspace/Workspace"


const Orders = () => {


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

  return (
    <div className="section-padding">
        <Workspace>
            <Order orders={orders}/>
        </Workspace>
    </div>
  )    
}

export default Orders