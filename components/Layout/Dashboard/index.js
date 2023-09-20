import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { ProcessSvg } from "../../../assets";
import { getUserDashboard } from "../../../redux/actions/userDetail";
import Loader from "../../common/Loader";
import Earnings from "./Earnings";
import NetSales from "./NetSales";
import OrderAndProfit from "./OrderAndProfit";
import RevenueReport from "./Revenue";
import Statistics from "./Statistics";

const DashboardPage = ({ userDetail, getDashboardDetail, dashboardDetail }) => {
  const [isLoading, setLoading] = useState(false);

  const userData = useMemo(() => {
    return {
      name: userDetail?.name,
    };
  }, [userDetail]);

  useEffect(() => {
    const shop_id = localStorage.getItem("shop_id");
    setLoading(true);
    getDashboardDetail({ shop_id: shop_id }).then(() => {
      setLoading(false);
    });
  }, []);

  const dashboardData = useMemo(() => {
    return {
      orders_count: dashboardDetail?.data?.productCount[0]?.orders_count,
      products_count: dashboardDetail?.data?.productCount[0]?.products_count,
      monthly_order: dashboardDetail?.data?.monthly_order,
    };
  }, [dashboardDetail]);

  return (
    <>
      {isLoading && <Loader />}
      {/* <div class="approval">
        <div>
          <p>You have new 10 products for approval</p>
          <div>
            <Image src={ProcessSvg} alt="" />
            <span>1:00:03</span>
          </div>
        </div>
      </div> */}

      <div className="row">
        <div className="col-xl-4">
          <NetSales userData={userData} />
        </div>
        <div className="col-xl-8">
          <Statistics dashboardData={dashboardData} />
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="profit row d-flex ">
            <OrderAndProfit dashboardData={dashboardData} />
            <div className="col-xl-4 col-sm-6">
              <Earnings />
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <RevenueReport />
        </div>
      </div>
    </>
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
