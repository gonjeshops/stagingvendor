import Image from "next/image";
import React from "react";
import { ProductsSvg, RevenueSvg, SalesSvg } from "../../../assets";
const Statistics = ({ dashboardData }) => {

  const {totalCustomerOrders,averageOrderValue,totalReceivedInvoices,totalReceivedQuoteRequests,totalSales,userTotalRevenue } = dashboardData
  
  return (
    <div className=" cards ">
      <div className="heading d-flex justify-content-between">
        <h2 className="cardh4">Statistics</h2>
        <span>Updated 1 month ago</span>
      </div>
      <div className="flex flex-wrap bg-background gap-8 items-center justify-even">
        <div className="flex gap-4 items-center">
          <Image src={SalesSvg} />
          <div className="">
            <h3 className="font-bold text-green-600">${totalSales}</h3>
            <p>Net sales</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Image src={ProductsSvg} />
          <div className="content">
            <h3 className="font-bold">{0}</h3>
            <p>Listed products</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Image src={RevenueSvg} />
          <div className="content">
          <h3 className="font-bold">${userTotalRevenue}</h3>
            <p>Total revenue</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Image src={ProductsSvg} />
          <div className="content">
          <h3 className="font-bold">{totalCustomerOrders}</h3>
            <p>Customer orders</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Image src={ProductsSvg} />
          <div className="content">
          <h3 className="font-bold">{averageOrderValue}</h3>
            <p>Average order</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Image src={ProductsSvg} />
          <div className="content">
          <h3 className="font-bold">{totalReceivedInvoices}</h3>
            <p>Received invoices</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Image src={ProductsSvg} />
          <div className="content">
          <h3 className="font-bold">{totalReceivedQuoteRequests}</h3>
            <p>Received quotes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
