import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import { AcceptQuote, DeleteQuote } from "./ExpensesModals";
import ChangeQuoteStatusForm from "../Quotes/ChangeQuoteStatusForm";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type InvoicingType = {
  transactionId: string;
  invoiceId: string;
  orderId: string;
  purchaseName: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Sent" | "Overdue";
  PaidOn: string;
  paymentMethod: string;
};
export const ReceivedColumns: ColumnDef<InvoicingType>[] = [
  // {
  //   accessorKey: "transactionId",
  //   header: "Transaction ID",
  // },
  // {
  //   accessorKey: "invoiceId",
  //   header: "Invoice ID",
  // },
  {
    accessorKey: "quote_number",
    header: "Quote Number",
  },
  {
    accessorKey: "quote_name",
    header: "Quote Name",
  },
  {
    accessorKey: "cart_items",
    header: "Item",
    cell: ({ row }) => {
      const item = row.original;
      console.log('========', JSON.parse(item?.cart_items)[0].product?.image?.thumbnail)
      return (
        <div className="flex gap-2 text-[10px] items-center">
           <div className="h-10 w-10 shrink-0  overflow-hidden border rounded">
            <img src={JSON.parse(item?.cart_items)[0].product?.image?.thumbnail} alt={item?.id} className="object-cover w-full h-full"/>
           </div>
           <p className="text-sm">{JSON.parse(item?.cart_items)[0].product?.name}</p>
        </div>
      );
    }, 
  },
  {
    accessorKey: "subtotal",
    header: "Amount",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="">
          AUD {(item?.subtotal)}
        </div>
      );
    }, 
  },
  {
    accessorKey: "created_at",
    header: "Issued Date",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="">
          {new Date(item?.created_at).toLocaleString()}
        </div>
      );
    }, 
  },
  {
    accessorKey: "",
    header: "Due Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  // {
  //   accessorKey: "PaidOn",
  //   header: "Paid On",
  // },
  // {
  //   accessorKey: "paymentMethod",
  //   header: "Payment Method",
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex gap-2 shrink-0 w-fuul">
          <ChangeQuoteStatusForm item={item}/>
          {/* <Button className="p-3  bg-gonje-green text-white capitalize" asChild>
            <Link href={`/invoicing/${transactionId}`}>View</Link>
          </Button> */}
          {/* <AcceptQuote item={item} />
          <DeleteQuote item={item} /> */}
        </div>
      );
    },
  },
];
