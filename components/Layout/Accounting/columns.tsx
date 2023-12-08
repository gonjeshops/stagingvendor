import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// {
//   "id": 27,
//   "user_id": null,
//   "payment_method": "Stripe",
//   "amount": "8000.00",
//   "currency": "aud",
//   "transaction_date": "2023-10-23 15:24:16",
//   "customer_name": "Gonje Use",
//   "customer_email": "demolashops@gmail.com",
//   "transaction_status": "Success",
//   "trx_reference": null,
//   "stripe_charge_id": "ch_3O4NB2CQ7rc17Wei0NXKiAcd",
//   "paypal_transaction_id": null,
//   "mastercard_transaction_id": null,
//   "bank_transfer_details": null,
//   "created_at": "2023-10-23 15:24:16",
//   "updated_at": "2023-11-02 06:27:17"
// }
export type AccountingType = {
  transactionId: string;
  // invoiceId: string;
  // orderId: string;
  customer_name: string;
  amount: number;
  transaction_date: string;
  payment_method: string;
};
export const columns: ColumnDef<AccountingType>[] = [
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
  },
  // {
  //   accessorKey: "invoiceId",
  //   header: "Invoice ID",
  // },
  // {
  //   accessorKey: "orderId",
  //   header: "Order ID",
  // },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "transaction_date",
    header: "Transaction Date",
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
  }
];
