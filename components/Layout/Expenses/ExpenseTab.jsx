import useSWR from 'swr'


///////////////
import {fetcher} from '@/fetcher'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestTable } from "./RequestTable";
import { productColumns } from "./columns";
import { ReceivedTable } from "./ReceivedTable";
import { ReceivedColumns } from "./RecievedColumns";
import FetchDataAndRenderPageB2C from '@/components/FetchDataAndRenderPageB2C';
import { fetchB2cQuotes, fetchB2cReceivedQuotes, fetchB2cSentQuotes, fetchProducts } from '@/componentsB2b/Api2';

const ExpenseTabs = () => {
  const dummyProducts = [
    {
      image: "product1.jpg",
      productName: "Product 1",
      group: "Group A",
      productType: "Type X",
      price: 50.0,
      salePrice: 45.0,
      quantity: 100,
      inStock: 80,
      status: "Active",
      receivedQuoteAction: "Action 1",
    },
    {
      image: "product2.jpg",
      productName: "Product 2",
      group: "Group B",
      productType: "Type Y",
      price: 75.0,
      salePrice: 70.0,
      quantity: 150,
      inStock: 120,
      status: "Inactive",
      receivedQuoteAction: "Action 2",
    },
    {
      image: "product3.jpg",
      productName: "Product 3",
      group: "Group C",
      productType: "Type Z",
      price: 100.0,
      salePrice: 90.0,
      quantity: 200,
      inStock: 160,
      status: "Active",
      receivedQuoteAction: "Action 3",
    },
    {
      image: "product4.jpg",
      productName: "Product 4",
      group: "Group A",
      productType: "Type X",
      price: 60.0,
      salePrice: 55.0,
      quantity: 120,
      inStock: 100,
      status: "Active",
      receivedQuoteAction: "Action 4",
    },
    {
      image: "product5.jpg",
      productName: "Product 5",
      group: "Group B",
      productType: "Type Y",
      price: 90.0,
      salePrice: 80.0,
      quantity: 180,
      inStock: 140,
      status: "Inactive",
      receivedQuoteAction: "Action 5",
    },
  ];
  const InvoicingData = [
    {
      transactionId: "trx001",
      invoiceId: "inv001",
      orderId: "order001",
      purchaseName: "Product A",
      amount: 100,
      dueDate: "2023-11-15",
      status: "Paid",
      PaidOn: "2023-11-10",
      paymentMethod: "Credit Card",
    },
    {
      transactionId: "trx002",
      invoiceId: "inv002",
      orderId: "order002",
      purchaseName: "Product B",
      amount: 75,
      dueDate: "2023-11-20",
      status: "Sent",
      PaidOn: "2023-11-18",
      paymentMethod: "PayPal",
    },
    {
      transactionId: "trx003",
      invoiceId: "inv003",
      orderId: "order003",
      purchaseName: "Product C",
      amount: 50,
      dueDate: "2023-11-25",
      status: "Overdue",
      PaidOn: "2023-11-24",
      paymentMethod: "Bank Transfer",
    },
    {
      transactionId: "trx004",
      invoiceId: "inv004",
      orderId: "order004",
      purchaseName: "Product D",
      amount: 120,
      dueDate: "2023-11-30",
      status: "Sent",
      PaidOn: "2023-11-27",
      paymentMethod: "Cryptocurrency",
    },
    {
      transactionId: "trx005",
      invoiceId: "inv005",
      orderId: "order005",
      purchaseName: "Product E",
      amount: 90,
      dueDate: "2023-12-05",
      status: "Paid",
      PaidOn: "2023-12-02",
      paymentMethod: "Debit Card",
    },
  ];


const renderRequestTable = (response) =>  (
    response?.data?.data?.products?.length ?
    <RequestTable columns={productColumns} data={response?.data?.data?.products} />
    :
    <div className="absolute text-semibold inset-0 flex items-center justify-center text-center">
      <p>No Products found.</p>
    </div>
)

const renderReceivedTable = (response) =>  (
  response?.data?.data?.quotes?.length ?
  <ReceivedTable columns={ReceivedColumns} data={response?.data?.data?.quotes} />
  :
  <div className="absolute text-semibold inset-0 flex items-center justify-center text-center">
    <p>No Products found.</p>
  </div>
)

const renderSentRequestTable = (response) =>  (
  response?.data?.data?.quotes?.length ?
  <ReceivedTable columns={ReceivedColumns} data={response?.data?.data?.quotes} />
  :
  <div className="absolute text-semibold inset-0 flex items-center justify-center text-center">
    <p>No Products found.</p>
  </div>
)


  return (
    <Tabs defaultValue="request" className="">

      <TabsList className="grid max-w-3xl grid-cols-3 bg-white rounded- px-3 h-16 mx-auto">
        <TabsTrigger value="request" className="py-2">
          Request for Quote
        </TabsTrigger>
        <TabsTrigger value="receivedRequest" className="py-2">
          Received Request
        </TabsTrigger>
        <TabsTrigger value="sentRequest" className="py-2">
          Sent Request
        </TabsTrigger>
      </TabsList>

      <div className="relative h-[90vh] overflow-auto">
      <TabsContent value="request">
        {/* <RequestTable columns={productColumns} data={RequestData.data.products} /> */}
        <FetchDataAndRenderPageB2C
          fetchDataFunction={fetchProducts}
          renderComponent={renderRequestTable}
          pageLimit = {8}
          loadingTimeoutDuration = {8000}
          />
      </TabsContent>

      <TabsContent value="receivedRequest">
        {/* <ReceivedTable columns={ReceivedColumns} data={InvoicingData} /> */}
        <FetchDataAndRenderPageB2C
          fetchDataFunction={fetchB2cReceivedQuotes}
          renderComponent={renderReceivedTable}
          pageLimit = {8}
          loadingTimeoutDuration = {8000}
          />
      </TabsContent>

      <TabsContent value="sentRequest">
        {/* <ReceivedTable columns={ReceivedColumns} data={InvoicingData} /> */}
        <FetchDataAndRenderPageB2C
          fetchDataFunction={fetchB2cSentQuotes}
          renderComponent={renderSentRequestTable}
          pageLimit = {8}
          loadingTimeoutDuration = {8000}
          />
      </TabsContent>
      </div>
    </Tabs>
  );
};
export default ExpenseTabs;
