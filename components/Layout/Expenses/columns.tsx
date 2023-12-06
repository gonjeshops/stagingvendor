import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { RequestModal } from "./ExpensesModals";
import Image from "next/image";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductType = {
  image: {
    id: string;
    original: string;
    thumbnail: string;
  };
  name: string;
  product_type: string;
  shop_name: string;
  price: number;
  sale_price: number;
  quantity: number;
  in_stock: number;
  status: string;
  receivedQuoteAction: string;
};

export const productColumns: ColumnDef<ProductType>[] = [
  {
    id: "image",
    header: "Image",
    cell: ({ row }) => {
      const { image } = row.original;
      return (
        <div className="w-12 h-12 relative">
          <Image src={image.thumbnail} fill={true} alt="" />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "product_type",
    header: "Product Type",
  },
  {
    accessorKey: "shop_name",
    header: "Shop Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "sale_price",
    header: "Sale Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "in_stock",
    header: "In Stock",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <p className="font-medium text-gonje-green">
          {row.getValue("status")}
        </p>
      );
    },
  },
  {
    accessorKey: "receivedQuoteAction",
    header: "Received Quote Action",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original;
      // console.log('it', item)
      return (
        <div >
          <RequestModal item={item}/>
        </div>
      );
    },
  },
];
