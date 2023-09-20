import React, { useState } from "react";
import AddBankDetails from "./AddBankDetail";
import AddCard from "./AddCard";
import Tabs from "./tabs";

const PaymentModule = () => {
  const [isCard, setIsCard] = useState(true);
  return (
    <div className="banking-form">
      <Tabs isCard={isCard} setIsCard={setIsCard} />
      <div className="tab-content" id="pills-tabContent">
        <div className="outer-wrap">
          {isCard ? <AddCard /> : <AddBankDetails />}
        </div>
      </div>
    </div>
  );
};

export default PaymentModule;
