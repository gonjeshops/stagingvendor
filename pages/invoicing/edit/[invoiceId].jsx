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
      </section>
    </section>
  );
};

export default Edit;

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const InputWithLabel = ({ name, label, type, onChange }) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email" className="text-lg">
        {label}
      </Label>
      <Input
        type={type}
        id="email"
        className={`h-12`}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

const InvoiceGenerator = () => {
  return (
    <div>
      <div className="bg-gonje p-4 my-4 rounded-md text-lg font-semibold grid grid-cols-1 md:grid-cols-4 gap-x-6">
        <h2>Items</h2>
        <h2>Quantity</h2>
        <h2>Price</h2>
        <h2>Amount</h2>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-4 gap-x-6">
        <div>
          <span className={`w-full rounded-md px-3 py-1`}>Phone</span>
        </div>
        <div>
          <span className={`w-full rounded-md px-3 py-1`}>5</span>
        </div>
        <div>
          <span className={`w-full rounded-md px-3 py-1`}>$500</span>
        </div>
        <div>
          <span className={`w-full rounded-md px-3 py-1`}>$2500</span>
        </div>
      </form>

      <div className="flex flex-col text-lg font-semibold space-y-4 divide-y-2  mt-5 text-right w-full">
        <p>Subtotal:</p>
        <p>Discount: </p>
        <p>Total: </p>
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
  const [users, setUsers] = useState([
    { name: "John Doe", email: "johndoe@gmail.com" },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([
      ...users,
      {
        name: formData.name,
        email: formData.email,
      },
    ]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
          <div className="flex justify-around py-3 border text-lg">
            <h3 className="">Name</h3>
            <h3 className="">Email</h3>
          </div>
          <div className="border px-3 divide-y divide-slate-200 space-y-4">
            {users.map((user, index) => (
              <div key={index} className="flex justify-around py-2 text-lg">
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 py-4">
            <InputWithLabel
              label={`Name`}
              type={`text`}
              name={`name`}
              value={formData.name}
              onChange={handleChange}
            />
            <InputWithLabel
              label={`Email`}
              type={`email`}
              name={`email`}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="bg-gonje-green">
            Add Email
          </Button>
        </form>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
