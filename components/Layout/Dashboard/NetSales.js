import Image from "next/image";
import { ProductsSvg, RevenueSvg, SalesSvg } from "../../../assets";

const NetSales = ({ userData, dashboardDetail }) => {
  return (
    <div className="welcome ">
      <div className="content mb-auto">
        <h2>Welcome {userData.name} </h2>
        {/* <p>You are the member of Gonje group now</p> */}
      </div>
      <div className="flex gap-6 items-center">
        <Image src={SalesSvg} />
        <div className="net-sale">
          <strong>${Number(dashboardDetail?.totalSales)?.toLocaleString('en-US')}</strong>
          <p>Net Sales</p>
        </div>
        
      </div>
    </div>
  );
};

export default NetSales;
