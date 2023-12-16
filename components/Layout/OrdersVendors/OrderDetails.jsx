
const OrderDetails = ({path, data}) => {

  return (
    <div>{path} OrderDetails id: {data?.id},  Assigned Delivery Company:  {data?.delivery_company_name} </div>
  )
}

export default OrderDetails