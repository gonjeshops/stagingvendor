import Image from "next/image";
import React from "react";
import { ProductsSvg, RevenueSvg, SalesSvg } from "../../../assets";
const Statistics = ({ dashboardData }) => {
  return (
    <div className="statics">
      <div className="heading d-flex justify-content-between">
        <h2>Statistics</h2>
        <span>Updated 1 month ago</span>
      </div>
      <div className="total d-flex justify-content-around">
        <div className="sales">
          <Image src={SalesSvg} />
          <div className="content">
            <h3>230K</h3>
            <p>Sales</p>
          </div>
        </div>
        <div className="sales">
          <Image src={ProductsSvg} />

          <div className="content">
            <h3>{dashboardData.products_count}</h3>
            <p>Products</p>
          </div>
        </div>
        <div className="sales">
          <Image src={RevenueSvg} />
          <div className="content">
            <h3>142k</h3>
            <p>Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
