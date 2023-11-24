import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { RequestModal } from "./ExpensesModals";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductType = {
  image: string;
  productName: string;
  group: string;
  productType: string;
  price: number;
  salePrice: number;
  quantity: number;
  inStock: number;
  status: string;
  receivedQuoteAction: string;
};

export const productColumns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "group",
    header: "Group",
  },
  {
    accessorKey: "productType",
    header: "Product Type",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "salePrice",
    header: "Sale Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "inStock",
    header: "In Stock",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "receivedQuoteAction",
    header: "Received Quote Action",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { productName } = row.original;
      return (
        <div>
          <RequestModal/>
        </div>
      );
    },
  },
];
