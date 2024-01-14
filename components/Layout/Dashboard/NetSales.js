import Image from "next/image";
import { ProductsSvg, RevenueSvg, SalesSvg } from "../../../assets";

const NetSales = ({ userData, totalSales }) => {
  return (
    <div className="cards h-full flex-shrink-0">
      <h4 className="cardh4">Welcome {userData.name} </h4>
      <div className="flex gap-3 items-center">
        <Image src={SalesSvg} />
        <div className="">
          <strong>${totalSales}</strong>
          <p>Net Sales</p>
        </div>
      </div>
    </div>
  );
};

export default NetSales;
