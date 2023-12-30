import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { AcceptDiscount,DeleteDiscount, UpdateDiscount } from "./DiscountModal";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DicountType = {
  image: {
    id: string;
    original: string;
    thumbnail: string;
  };
  name: string;
  start_offer: string;
  end_offer: string;
  price: number;
  discount: number;
  offered_price: number;
};

export const discountColumns: ColumnDef<DicountType>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'start_offer',
    header: 'Start Offer',
  },
  {
    accessorKey: 'end_offer',
    header: 'End Offer',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'discount',
    header: 'Discount',
  },
  {
    accessorKey: 'offered_price',
    header: 'Offered Price',
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      // const { name } = row.original;
      return (
        <div className="flex gap-x-2">
          <AcceptDiscount/>
          <UpdateDiscount item={row}/>
          <DeleteDiscount/>
        </div>
      );
    },
  },
];
