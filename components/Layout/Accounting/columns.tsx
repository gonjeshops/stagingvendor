import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AccountingType = {
  transactionId: string;
  invoiceId: string;
  orderId: string;
  purchaseName: string;
  amount: number;
  createdDate: string;
  paymentMethod: string;
};
export const columns: ColumnDef<AccountingType>[] = [
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
  },
  {
    accessorKey: "invoiceId",
    header: "Invoice ID",
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "purchaseName",
    header: "Purchase Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "createdDate",
    header: "Created Date",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
];
