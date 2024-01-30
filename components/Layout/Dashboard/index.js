import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { getUserDashboard } from "../../../redux/actions/userDetail";
import Loader from "../../common/Loader";
import TopProductsPieChart from "./TopProductsPieChart";
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
import V2VDashboard from "./V2VDashboard";

const DashboardPage = ({
  userDetail,
  getDashboardDetail,
  dashboardDetail,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [modalType, setModalType] = useState("");
  const [type, setType] = useState('v2c')
  const { user } = useGlobalState();
  console.log(dashboardDetail);

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
      transactionsForLast12Months: dashboardDetail?.transactionsForLast12Months,
      totalProducts: dashboardDetail?.totalProducts,

      // v2v
      topSellingB2CProducts: dashboardDetail?.topSellingB2CProducts,
      totalMonthlyB2CRevenue: dashboardDetail?.totalMonthlyB2CRevenue,
      totalMonthlyB2COrders: dashboardDetail?.totalMonthlyB2COrders,
    };
  }, [dashboardDetail]);

  return (
    <div className="h-full w-full space-y-8 ">
        {isLoading && <Loader />}
        <div className="cards">
            <div className="md:flex gap-4 items-center justify-between space-y-4">
              <h3 className="text-2xl font-semibold">
                {type === 'v2c'
                  ? 'Vendor to customer dashboard (V2C)'
                  : 'Vendor to vendor dashboard (V2V)'}
              </h3>
              <div className="flex flex-col items-end">
                <p className="pb-2">Switch dashboard</p>
                <div className="flex gap-4 items-center">
                  <button onClick={() => setType('v2c')} className={`${type === 'v2c' ? 'bg-gonje-green' : 'bg-gray-200'} hover:border-0 duration-300 px-4 py-2 rounded`}>
                    V2C
                  </button>
                  <button onClick={() => setType('v2v')} className={`${type === 'v2v' ? 'bg-gonje-green' : 'bg-gray-200'} hover:border-0 duration-300 px-4 py-2 rounded`}>
                    V2V
                  </button>
                </div>
              
              </div>
            </div>

            <h5 className="cardh4 ">Pending tasks</h5>
            <p className="">You have no pending task</p>
        </div>
        {
          type === 'v2c' ?
            <>
              <div className="flex gap-8 w-full ">
                <div className="w-full">
                  <Statistics dashboardData={dashboardData} />
                </div>
              </div>

              <div className="flex gap-8 max-md:grid w-full ">
                <OrderAndProfit
                  orderData={dashboardData?.totalOrdersPerMonth}
                  modal={'totalOrdersPerMonth'}
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
                  data={
                    dashboardDetail?.transactionsForLast12Months
                  }
                  setModalType={setModalType}
                  modal={'transactionsForLast12Months'}
                />
              </div>

              
            </>
            :
            <V2VDashboard dashboardData={dashboardData} setModalType={setModalType}/>
        }

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
