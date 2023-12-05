import { DataTable } from "@/components/Layout/Accounting/DataTable";
import {
  columns,
  AccountingType,
} from "@/components/Layout/Accounting/columns";
import useSWR from 'swr'
import {fetcher} from '@/fetcher'
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
  const { data:AccountingData, error, isLoading } = useSWR(
    "my/transactions",
    fetcher
  );
  if (!AccountingData) return 'loading...'

  // console.log(AccountingData.data.transactions, error)
  return (
    <section>
      <DataTable columns={columns} data={AccountingData.data.transactions} />
    </section>
  );
};

export default Accounting;
