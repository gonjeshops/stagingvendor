import Image from "next/image";
import React from "react";
import { ProductsSvg, RevenueSvg, SalesSvg } from "../../../assets";
const Statistics = ({ dashboardData }) => {

  const {totalCustomerOrders,averageOrderValue,totalReceivedInvoices,totalReceivedQuoteRequests,totalSales,userTotalRevenue } = dashboardData
  // totalCustomerOrders: dashboardDetail?.totalCustomerOrders,
  //     averageOrderValue: dashboardDetail?.averageOrderValue,
  //     totalReceivedInvoices: dashboardDetail?.totalReceivedInvoices,
  //     totalReceivedQuoteRequests: dashboardDetail?.totalReceivedQuoteRequests,
  //     totalSales: dashboardDetail?.totalSales,
  //     userTotalRevenue: dashboardDetail?.userTotalRevenue,
  console.log('==', dashboardData)
  return (
    <div className=" py-8 px-4 bg-background  shadow my-4 ">
      <div className="heading d-flex justify-content-between">
        <h2 className="font-bold text-lg">Statistics</h2>
        <span>Updated 1 month ago</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 bg-background gap-6 items-center justify-between mt-12">
        <div className="flex gap-4 items-center">
          <Image src={SalesSvg} />
          <div className="">
            <h3 className="font-bold">{totalSales}</h3>
            <p>Total sales</p>
          </div>
        </div>
        {/* <div className="flex gap-4 items-center">
          <Image src={ProductsSvg} />
          <div className="content">
            <h3 className="font-bold">{null}</h3>
            <p>Listed products</p>
          </div>
        </div> */}
        <div className="flex gap-4 items-center">
          <Image src={RevenueSvg} />
          <div className="content">
          <h3 className="font-bold">{userTotalRevenue}</h3>
            <p>Total revenue</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Image src={RevenueSvg} />
          <div className="content">
          <h3 className="font-bold">{totalCustomerOrders}</h3>
            <p>Customer orders</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Image src={RevenueSvg} />
          <div className="content">
          <h3 className="font-bold">{averageOrderValue}</h3>
            <p>Average order</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Image src={RevenueSvg} />
          <div className="content">
          <h3 className="font-bold">{totalReceivedInvoices}</h3>
            <p>Received invoices</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Image src={RevenueSvg} />
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
