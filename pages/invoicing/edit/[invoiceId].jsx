import React, { useState } from "react";

const Edit = () => {
  return (
    <section className="min-h-screen">
      <section className="container bg-white py-8 rounded-md mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 mb-5 border-b py-4">
          <InputWithLabel label={`Vendor`} type={`text`} />
          <InputWithLabel label={`Invoice Number`} type={`text`} />
          <EmailDialog />
          <InputWithLabel label={`Ref Number`} type={`text`} />
          <InputWithLabel label={`From`} type={`text`} />
          <InputWithLabel label={`To`} type={`text`} />
        </div>
        <div>
          <InvoiceGenerator />
        </div>
        <div className="mt-4 flex justify-end">
          <Button className="bg-gonje-green text-white">Update Invoice</Button>
        </div>
      </section>
    </section>
  );
};

export default Edit;

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const InputWithLabel = ({ name, label, type }) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email" className="text-lg">
        {label}
      </Label>
      <Input type={type} id="email" className={`h-12`} name={name} />
    </div>
  );
};

const InvoiceGenerator = () => {
  const [invoiceData, setInvoiceData] = useState({
    item: "",
    quantity: 0,
    price: 0,
    amount: 0,
  });

  const [invoice, setInvoice] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const generateInvoice = () => {
    // Calculate total including VAT
    const total =
      invoiceData.quantity * invoiceData.unitPrice * (1 + invoiceData.vatRate);

    // Create the invoice object
    const generatedInvoice = {
      item: invoiceData.item,
      quantity: invoiceData.quantity,
      price: invoiceData.price,
      amount: invoiceData.amount,
      total: total.toFixed(2),
    };

    // Set the generated invoice
    setInvoice(generatedInvoice);
  };

  return (
    <div>
      <div className="bg-gonje p-4 my-4 rounded-md text-lg font-semibold grid grid-cols-1 md:grid-cols-5 gap-x-6">
        <h2>Items</h2>
        <h2>Quantity</h2>
        <h2>Price</h2>
        <h2>Amount</h2>
        <h2>Action</h2>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-5 gap-x-6">
        <div>
          <Input
            type={`text`}
            name="item"
            value={invoiceData.item}
            onChange={handleInputChange}
            className={`h-12`}
          />
        </div>
        <Input
          type={`text`}
          name="quantity"
          value={invoiceData.quantity}
          onChange={handleInputChange}
          className={`h-12`}
        />
        <Input
          type={`text`}
          name="price"
          value={invoiceData.price}
          onChange={handleInputChange}
          className={`h-12`}
        />
        <Input
          type={`number`}
          name="amount"
          value={invoiceData.amount}
          onChange={handleInputChange}
          className={`h-12`}
        />
        <button onClick={generateInvoice}>Add</button>
      </form>

      <div className="flex flex-col text-lg font-semibold space-y-4 divide-y-2  mt-5 text-right w-full">
        <p>Subtotal: {invoice ? invoice.item ?? "" : ""}</p>
        <p>Discount: {invoice ? invoice.quantity ?? "" : ""}</p>
        <p>Total: {invoice ? invoice.total ?? "" : ""}</p>
      </div>
    </div>
  );
};
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const EmailDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email" className="text-lg">
            Email
          </Label>
          <Button className="flex h-12 w-full rounded-md border border-input bg-transparent text-black text-left px-3 py-1">
            Email
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="mb-4">Add Emails Address</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex justify-around py-2 border text-lg">
            <h3 className="">Name</h3>
            <h3 className="">Email</h3>
          </div>
          <div className="border px-3 even:bg-slate-400 odd:bg-white">
            <div className="flex justify-around py-2 text-lg">
              <p> John Doe</p>
              <p> johndoe@gmail.com</p>
            </div>
            <div className="flex justify-around py-2 text-lg">
              <p> John Doe</p>
              <p> johndoe@gmail.com</p>
            </div>
            <div className="flex justify-around py-2 text-lg" >
            <p> John Doe</p>
            <p> johndoe@gmail.com</p>
          </div>   
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 py-4">
          <InputWithLabel label={`Name`} type={`text`} name={`name`} />
          <InputWithLabel label={`Email`} type={`email`} name={`eamil`} />
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-gonje-green">
            Add Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
