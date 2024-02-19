import { DataTable } from "@/components/Layout/Accounting/DataTable";
import {
  columns,
  AccountingType,
} from "@/components/Layout/Accounting/columns";
import useSWR from 'swr'
import {fetcher} from '@/fetcher'
import { BtnSpinner } from "@/componentsB2b/Loader/Spinner/BtnSpinner";
import { PageLoading } from "@/componentsB2b/Loader/Spinner/PageLoading";
import { useEffect } from "react";
import { fetchAccounting } from "@/componentsB2b/Api2";
import FetchDataAndRenderPageB2C from "@/components/FetchDataAndRenderPageB2C";

const Accounting = () => {
  const AccountingDataTest = [
    {
      transactionId: "1",
      invoiceId: "INV-001",
      orderId: "ORD-001",
      purchaseName: "Product A",
      amount: 100,
      createdDate: "2023-11-07",
      paymentMethod: "Credit Card",
    },
    {
      transactionId: "2",
      invoiceId: "INV-002",
      orderId: "ORD-002",
      purchaseName: "Product B",
      amount: 200,
      createdDate: "2023-11-06",
      paymentMethod: "PayPal",
    },
    {
      transactionId: "3",
      invoiceId: "INV-003",
      orderId: "ORD-003",
      purchaseName: "Product C",
      amount: 300,
      createdDate: "2023-11-05",
      paymentMethod: "Credit Card",
    },
  ];


  const renderTransactions = (response) =>  (
        response?.data?.data?.transactions?.length ?
        <section><DataTable columns={columns} data={response?.data?.data?.transactions} /> </section>
        :
        <div className="absolute text-semibold inset-0 flex items-center justify-center text-center">
          <p>No transactions found.</p>
        </div>
    )

  return(
    <FetchDataAndRenderPageB2C
    fetchDataFunction={fetchAccounting}
    renderComponent={renderTransactions}
    pageLimit = {8}
    loadingTimeoutDuration = {8000}
    search=''
    />
  )

};

export default Accounting;
