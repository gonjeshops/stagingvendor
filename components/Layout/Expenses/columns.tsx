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
    accessorKey: "name_of_shop",
    header: "Shop Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return (
        <p className="font-medium ">
          AUD {row.getValue("price")}
        </p>
      );
    },
  },
  {
    accessorKey: "discount",
    header: "Discount", 
    cell: ({ row }) => {
      return (
        <p className="font-medium ">
          {row.getValue("discount")}%
        </p>
      );
    },
  },
  {
    accessorKey: "sale_price",
    header: "Sale Price",
    cell: ({ row }) => {
      return (
        <p className="font-medium ">
          AUD {row.getValue("sale_price") || row.getValue("price")}
        </p>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
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
