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
