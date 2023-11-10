import React from "react";

const Edit = () => {
  return (
    <section>
      <section className="container bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <InputWithLabel label={`Vendor`} type={`text`} />
          <InputWithLabel label={`Invoice Number`} type={`text`} />
          <InputWithLabel label={`Email`} type={`email`} />
          <InputWithLabel label={`Ref Number`} type={`text`} />
          <InputWithLabel label={`From`} type={`text`} />
          <InputWithLabel label={`To`} type={`Text`} />
        </div>
      </section>
    </section>
  );
};

export default Edit;

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const InputWithLabel = ({ name, label, type }) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">{label}</Label>
      <Input type={type} id="email" />
    </div>
  );
};
