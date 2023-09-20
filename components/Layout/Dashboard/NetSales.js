import React from "react";

const NetSales = ({ userData }) => {
  return (
    <div className="welcome">
      <div className="content mb-auto">
        <h2>Welcome {userData.name} </h2>
        <p>You are the member of Gonje group now</p>
      </div>
      <div className="net-sale">
        <strong>$50.0k</strong>
        <p>Net Sales</p>
      </div>
    </div>
  );
};

export default NetSales;
