import { useRouter } from "next/router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const transactionId = () => {
  const router = useRouter();
  return (
    <section>
      transactionId: {router.query.transactionId}
      <section className="container bg-white py-8 rounded-md">
        <section className="space-y-6">
          <div className="flex justify-between">
            <div className="flex flex-col gap-y-4">
              <div className="text-xl">
                <h4 className="font-semibold">Invoice From</h4>
                <div className="flex flex-col gap-y-1">
                  <p className="">Darren Elder</p>
                  <p>98-2 W 67th St</p>
                  <div className="flex-row">
                    <span>New York</span>,<span>NY 10023</span>
                  </div>
                </div>
              </div>
              <div className="text-xl">
                <h4 className="font-semibold">Payment Method</h4>
                <div className="flex flex-col gap-y-1">
                  <p className="">Debit Card</p>
                  <p>xxxx-xxxx-xxxx-0481</p>
                  <div className="">
                    <span>HCBC Bank</span>{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="text-xl">
                <p>
                  <span className="font-semibold">Order:</span> #04331
                </p>
                <p>
                  <span className="font-semibold">Issued:</span> #04331
                </p>
              </div>
              <div className="text-xl">
                <h4 className="font-semibold">Invoice To</h4>
                <div className="flex flex-col gap-y-1">
                  <p className="">Darren Elder</p>
                  <p>98-2 W 67th St</p>
                  <div className="flex-row">
                    <span>New York</span>,<span>NY 10023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {TableDemo()}
          <div>
            <div className="flex flex-col items-end text-xl mt-4 divide-y-2 space-y-3">
              <p>
                <span className="font-semibold">Subtotal:</span> $331
              </p>
              <p>
                <span className="font-semibold">Discount:</span> -10%
              </p>
              <p>
                <span className="font-semibold">Total:</span> $331
              </p>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default transactionId;

const invoices = [
  {
    description: "Sample Description 1",
    quantity: 3,
    vat: 0.2,
    total: 500,
  },
  {
    description: "Another Description",
    quantity: 1,
    vat: 0.1,
    total: 200,
  },
  {
    description: "Test Description",
    quantity: 5,
    vat: 0.15,
    total: 800,
  },
  {
    description: "Product X",
    quantity: 2,
    vat: 0.25,
    total: 700,
  },
  {
    description: "Service Y",
    quantity: 4,
    vat: 0.18,
    total: 1200,
  },
  {
    description: "New Item",
    quantity: 3,
    vat: 0.12,
    total: 550,
  },
];

export function TableDemo() {
  return (
    <Table className="text-lg border">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className="bg-gonje text-black rounded-md">
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>VAT</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white">
        {invoices.map((invoice, index) => (
          <TableRow key={index} className="border-b">
            <TableCell className="font-medium">{invoice.description}</TableCell>
            <TableCell>{invoice.quantity}</TableCell>
            <TableCell>{invoice.vat}</TableCell>
            <TableCell className="text-right">{invoice.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
