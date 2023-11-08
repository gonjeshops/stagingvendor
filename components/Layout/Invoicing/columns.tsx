import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type InvoicingType = {
  transactionId: string;
  invoiceId: string;
  orderId: string;
  purchaseName: string;
  amount: number;
  dueDate: string;
  status: 'Paid'|'Sent'|'Overdue';
  PaidOn: string;
  paymentMethod: string;
};
export const columns: ColumnDef<InvoicingType>[] = [
  {
    accessorKey: 'transactionId',
    header: 'Transaction ID',
  },
  {
    accessorKey: 'invoiceId',
    header: 'Invoice ID',
  },
  {
    accessorKey: 'orderId',
    header: 'Order ID',
  },
  {
    accessorKey: 'purchaseName',
    header: 'Purchase Name',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'PaidOn',
    header: 'Paid On',
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
  },
];
