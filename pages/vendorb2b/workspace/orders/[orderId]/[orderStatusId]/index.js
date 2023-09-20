import OrderStatus from "@/componentsB2b/Order/OrderStatus";

// Simulated data fetching function
const fetchOrderStatus = async (orderStatusId) => {
  // Fetch order details from your API using orderStatusId
  const response = await fetch(`/api/orders/${orderStatusId}`);
  const orderStatus = await response.json();
  return orderStatus;
};

export async function getServerSideProps({ params }) {
  const { orderStatusId } = params;
//   const orderDetails = await fetchOrderDetails(orderStatusId);

  return {
    props: {
    //   orderDetails
    orderStatusId
    }
  };
}

const OrderDetailsPage = ({ orderStatusId }) => {

  return (
    <div className="section-padding">
        <OrderStatus orderStatusId={orderStatusId} />
    </div>
  );
};

export default OrderDetailsPage;
