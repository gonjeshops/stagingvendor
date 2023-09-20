import InvoiceDetails from '@/componentsB2b/Invoices/InvoiceDetails';

// Simulated data fetching function
const fetchOrderDetails = async (invoiceId) => {
  // Fetch order details from your API using invoiceId
  const response = await fetch(`/api/orders/${invoiceId}`);
  const orderDetails = await response.json();
  return orderDetails;
};

export async function getServerSideProps({ params }) {
  const { invoiceId } = params;
//   const orderDetails = await fetchOrderDetails(invoiceId);

  return {
    props: {
    //   orderDetails
    invoiceId
    }
  };
}

const InvoiceDetailsPage = ({ invoiceId }) => {

  return (
    <div className="max-w-7xl m-auto px-4">

        <InvoiceDetails invoice={invoiceId} fakeData={''}/>

    </div>
  );
};

export default InvoiceDetailsPage;
