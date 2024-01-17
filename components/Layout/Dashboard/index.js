import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { ProcessSvg } from "../../../assets";
import { getUserDashboard } from "../../../redux/actions/userDetail";
import Loader from "../../common/Loader";
import TopProductsPieChart from "./TopProductsPieChart";
import NetSales from "./NetSales";
import OrderAndProfit from "./OrderAndProfit";
import RevenueReport from "./Revenue";
import Statistics from "./Statistics";
import { useGlobalState } from "@/context/GlobalStateContext";
import ProjectedRevenue from "./ProjectedRenue";
import ProductsoldPerDay from "./ProductsoldperDay";
import TopSalesofDay from "./TopSalesofDay";
import SalesByCity from "./SalesByCity";
import TopSellingProducts from "./TopSellingProducts";
import DataTableModal from "./DataTableModal";

const DashboardPage = ({
  userDetail,
  getDashboardDetail,
  dashboardDetail,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [modalType, setModalType] = useState("");
  const { user } = useGlobalState();
  console.log(userDetail, dashboardDetail);
  const userData = useMemo(() => {
    return {
      name: userDetail?.name,
    };
  }, [userDetail]);

  useEffect(() => {
    const shop_id = user?.shop_id;
    setLoading(true);
    getDashboardDetail({ shop_id: shop_id }).then(() => {
      setLoading(false);
    });
  }, []);

  const dashboardData = useMemo(() => {
    return {
      totalCustomerOrders: Number(
        dashboardDetail?.$totalCustomerOrders
      )?.toLocaleString("en-US"),
      averageOrderValue: Number(
        dashboardDetail?.averageOrderValue
      )?.toLocaleString("en-US"),
      totalReceivedInvoices: Number(
        dashboardDetail?.totalReceivedInvoices
      )?.toLocaleString("en-US"),
      totalReceivedQuoteRequests: Number(
        dashboardDetail?.totalReceivedQuoteRequests
      )?.toLocaleString("en-US"),
      totalSales: Number(dashboardDetail?.totalSales)?.toLocaleString("en-US"),
      userTotalRevenue: Number(
        dashboardDetail?.userTotalRevenue
      )?.toLocaleString("en-US"),
      totalOrdersPerMonth: dashboardDetail?.totalOrdersPerMonth,
      productsSoldPerDay: dashboardDetail?.productsSoldPerDay,
      projectedRevenue: dashboardDetail?.projectedRevenue,
      topCities: dashboardDetail?.topCities,
      topProductsForPieChart: dashboardDetail?.topProductsForPieChart,
      topSalesOfDay: dashboardDetail?.topSalesOfDay,
      topSellingProducts: dashboardDetail?.topSellingProducts,
      totalOrdersPerMonth: dashboardDetail?.totalOrdersPerMonth,
      transactionsForLast12Months:
        dashboardDetail?.transactionsForLast12Months,
      totalProducts: dashboardDetail?.totalProducts,
    };
  }, [dashboardDetail]);

  return (
    <div className="h-full w-full space-y-8">
      {isLoading && <Loader />}
      <div className="cards">
        <div>
          <h4 className="cardh4 pb-8 ">Pending tasks</h4>
          <p className="">You have no pending task</p>
          <div className="">
            <Image src={ProcessSvg} alt="" />
          </div>
        </div>
      </div>

      <div className="flex gap-8 w-full ">
        <div className="w-full">
          <Statistics dashboardData={dashboardData} />
        </div>
      </div>

      <div className="flex gap-8 max-md:grid w-full ">
        <OrderAndProfit
          dashboardData={dashboardData}
          setModalType={setModalType}
        />

        <TopProductsPieChart
          topProductsForPieChart={dashboardDetail?.topProductsForPieChart}
          setModalType={setModalType}
        />
      </div>
      <div className="flex gap-8 w-full flex-wrap ">
        <ProjectedRevenue revenueData={dashboardDetail?.projectedRevenue} />
        <ProductsoldPerDay productSold={dashboardDetail?.productsSoldPerDay} />
        <SalesByCity salesData={dashboardDetail?.topCities} />
      </div>

      <div className="flex gap-8 w-full ">
        <TopSellingProducts
          topSellingProducts={dashboardDetail?.topSellingProducts}
        />
        <TopSalesofDay topSales={dashboardDetail?.topSalesOfDay} />
      </div>

      <div className="flex gap-8 w-full ">
        <RevenueReport
          transactionsForLast12Months={
            dashboardDetail?.transactionsForLast12Months
          }
          setModalType={setModalType}
        />
      </div>

      <DataTableModal
        dashboardData={dashboardData}
        modalType={modalType}
        setModalType={setModalType}
      />
    </div>
  );
};

const mapStateToProps = function (state) {
  return {
    userDetail: state.user.userDetail,
    dashboardDetail: state.user.dashboardDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDashboardDetail: (data) => {
      return dispatch(getUserDashboard(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
