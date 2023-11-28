import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

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

function getCreditCardLogo(name) {
  switch (name) {
    case "Klarna":
      return (
        <Image
          src="/credit-cards/klarna.png"
          alt="Klarna Logo"
          fill={true}
          className="object-contain"
        />
      );
    case "Stripe":
      return (
        <Image
          src="/credit-cards/stripe.png"
          alt="Stripe Logo"
          fill={true}
          className="object-contain"
        />
      );
    case "apple pay":
      return (
        <Image
          src="/credit-cards/applepay.png"
          alt="Apple Pay Logo"
          fill={true}
          className="object-contain"
        />
      );
    case "zip pay":
      return (
        <Image
          src="/credit-cards/zippay.png"
          alt="Zip Pay Logo"
          fill={true}
          className="object-contain"
        />
      );
    case "paypal":
      return (
        <Image
          src="/credit-cards/paypal.png"
          alt="PayPal Logo"
          fill={true}
          className="object-contain"
        />
      );
    case "afterpay":
      return (
        <Image
          src="/credit-cards/afterpay.png"
          alt="Afterpay Logo"
          fill={true}
          className="object-contain"
        />
      );
    case "google pay":
      return (
        <Image
          src="/credit-cards/googlepay.png"
          alt="Google Pay Logo"
          fill={true}
          className="object-contain"
        />
      );
    default:
      return null;
  }
}

export type AccountingType = {
  transaction_id: string;
  // invoiceId: string;
  // orderId: string;
  customer_name: string;
  amount: number;
  transaction_date: string;
  payment_method: string;
};
export const columns: ColumnDef<AccountingType>[] = [
  {
    accessorKey: "transaction_id",
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
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "aud",
      }).format(amount);
      return <p className="font-medium">{formatted}</p>;
    },
  },
  {
    accessorKey: "transaction_date",
    header: "Transaction Date",
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
    cell: ({ row }) => {
      const { payment_method } = row.original;
      return (
        <div className="flex items-center gap-x-4">
          <p className="font-medium">{payment_method}</p>
          <div className="w-12 h-12 relative">
            {getCreditCardLogo(payment_method)}
          </div>
        </div>
      );
    },
  },
];
