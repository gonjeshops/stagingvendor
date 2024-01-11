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
import { useGlobalState } from "@/context/GlobalStateContext";
import ProjectedRevenue from "./ProjectedRenue";
import ProductsoldPerDay from "./ProductsoldperDay";
import TopSalesofDay from "./TopSalesofDay";
import SalesByCity from "./SalesByCity";
import TopSellingProducts from "./TopSellingProducts";
import Fake from "./Fake";

const DashboardPage = ({ userDetail, getDashboardDetail, dashboardDetail }) => {
  const [isLoading, setLoading] = useState(false);
  const {user} = useGlobalState()
console.log(userDetail,   dashboardDetail)
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
      totalCustomerOrders: Number(dashboardDetail?.$totalCustomerOrders)?.toLocaleString('en-US'),
      averageOrderValue: Number(dashboardDetail?.averageOrderValue)?.toLocaleString('en-US'),
      totalReceivedInvoices: Number(dashboardDetail?.totalReceivedInvoices)?.toLocaleString('en-US'),
      totalReceivedQuoteRequests: Number(dashboardDetail?.totalReceivedQuoteRequests)?.toLocaleString('en-US'),
      totalSales: Number(dashboardDetail?.totalSales)?.toLocaleString('en-US'),
      userTotalRevenue: Number(dashboardDetail?.userTotalRevenue)?.toLocaleString('en-US'),
      totalOrdersPerMonth: dashboardDetail?.totalOrdersPerMonth
    };
  }, [dashboardDetail]);

  return (
    <>
      {isLoading && <Loader />}
      <div class="approval">
        <div>
          <p>You have new 10 products for approval</p>
          <div>
            <Image src={ProcessSvg} alt="" />
            <span>1:00:03</span>
          </div>
        </div>
      </div>

      <div className="row ">
        <div className="col-xl-2 grid h-full ">
          <NetSales userData={userData} dashboardDetail={dashboardDetail} />
        </div>
        <div className="col-xl-10">
          <Statistics dashboardData={dashboardData} />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="profit row d-flex ">
            <OrderAndProfit dashboardData={dashboardData} />
            <div className="col-xl-4 col-sm-6">
              <Earnings topProductsForPieChart={dashboardDetail?.topProductsForPieChart}/>
            </div>
            <div className="flex gap-6 items-start flex-wrap">  
              <ProjectedRevenue revenueData={dashboardDetail?.projectedRevenue}/>
              <ProductsoldPerDay productSold={dashboardDetail?.productsSoldPerDay} />
              <SalesByCity salesData={dashboardDetail?.topCities}/>
            </div>
            <div className="flex gap-6 items-start flex-wrap">
            <TopSellingProducts topSellingProducts={dashboardDetail?.topSellingProducts}/>
              <TopSalesofDay topSales={dashboardDetail?.topSalesOfDay} />
              </div>
          </div>
        </div>

        <div className="c">
          <RevenueReport transactionsForLast12Months={dashboardDetail?.transactionsForLast12Months}/>
        </div>
        {/* <div className="col-xl-12">
          <Fake monthlyRevenue={dashboardDetail?.transactionsForLast12Months} monthlyOrders={dashboardDetail?.totalOrdersPerMonth}/>
        </div> */}
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


let e= {
  // "totalSales": "162262.00",
  // "$totalCustomerOrders": 252,
  // "averageOrderValue": "643.90",
  // "topSellingProducts": [
  //     {
  //         "product_id": 468,
  //         "name": "Wonderful Pomegranate Juice, 300 ml",
  //         "image": {
  //             "id": "491",
  //             "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/490/Juice5_bz8od4.jpg",
  //             "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/490/conversions/Juice5_bz8od4-thumbnail.jpg"
  //         },
  //         "total_quantity": 29899
  //     },
  //     {
  //         "product_id": 102,
  //         "name": "Armani Leather Purse",
  //         "image": {
  //             "id": "103",
  //             "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/103/Armani_leather_purse.jpg",
  //             "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/103/conversions/Armani_leather_purse-thumbnail.jpg"
  //         },
  //         "total_quantity": 1776
  //     },
  //     {
  //         "product_id": 470,
  //         "name": "Sun Tropics Organic Mango Nectar,250ml",
  //         "image": {
  //             "id": "493",
  //             "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/492/Juice-1_lx8xnf.jpg",
  //             "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/492/conversions/Juice-1_lx8xnf-thumbnail.jpg"
  //         },
  //         "total_quantity": 130
  //     },
  //     {
  //         "product_id": 531,
  //         "name": "Traditional Corn Special Bread 1lb",
  //         "image": {
  //             "id": "555",
  //             "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/554/Toast_vkkror.jpg",
  //             "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/554/conversions/Toast_vkkror-thumbnail.jpg"
  //         },
  //         "total_quantity": 10
  //     }
  // ],
  // "topSalesOfDay": [
  //     {
  //         "product_id": 468,
  //         "name": "Wonderful Pomegranate Juice, 300 ml",
  //         "image": {
  //             "id": "491",
  //             "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/490/Juice5_bz8od4.jpg",
  //             "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/490/conversions/Juice5_bz8od4-thumbnail.jpg"
  //         },
  //         "total_quantity": 610
  //     },
  //     {
  //         "product_id": 102,
  //         "name": "Armani Leather Purse",
  //         "image": {
  //             "id": "103",
  //             "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/103/Armani_leather_purse.jpg",
  //             "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/103/conversions/Armani_leather_purse-thumbnail.jpg"
  //         },
  //         "total_quantity": 40
  //     }
  // ],
  // "userTotalRevenue": "180.70",
  "topProductsForPieChart": [
      {
          "product_id": 468,
          "name": "Wonderful Pomegranate Juice, 300 ml",
          "total_sold": 29899
      },
      {
          "product_id": 102,
          "name": "Armani Leather Purse",
          "total_sold": 1776
      },
      {
          "product_id": 470,
          "name": "Sun Tropics Organic Mango Nectar,250ml",
          "total_sold": 130
      },
      {
          "product_id": 471,
          "name": "Pressed Juicery Super Citrus Plus, 200ml",
          "total_sold": 9
      }
  ],
  // "productsSoldPerDay": [
  //     {
  //         "day": "2024-01-10",
  //         "total_sold": 650
  //     }
  // ],
  // "topCities": [
  //     {
  //         "city": "Docnds",
  //         "total_sold": 13520
  //     },
  //     {
  //         "city": null,
  //         "total_sold": 141
  //     },
  //     {
  //         "city": "test",
  //         "total_sold": 14
  //     }
  // ],
  // "totalReceivedQuoteRequests": 21,
  // "projectedRevenue": {
  //     "102": 106560,
  //     "468": 89697,
  //     "470": 292.5,
  //     "531": 17.5
  // },
  // "totalOrdersPerMonth": [
  //     {
  //         "month": -10,
  //         "total_orders": 0
  //     },
  //     {
  //         "month": -9,
  //         "total_orders": 0
  //     },
  //     {
  //         "month": -8,
  //         "total_orders": 0
  //     },
  //     {
  //         "month": -7,
  //         "total_orders": 0
  //     },
  //     {
  //         "month": -6,
  //         "total_orders": 0
  //     },
  //     {
  //         "month": -5,
  //         "total_orders": 0
  //     },
  //     {
  //         "month": -4,
  //         "total_orders": 0
  //     },
  //     {
  //         "month": -3,
  //         "total_orders": 0
  //     },
  //     {
  //         "month": -2,
  //         "total_orders": 0
  //     },
  //     {
  //         "month": -1,
  //         "total_orders": 0
  //     },
  //     {
  //         "month": 0,
  //         "total_orders": 0
  //     },
  //     {
  //         "month": 1,
  //         "total_orders": 5
  //     }
  // ],
  // "totalReceivedInvoices": 13,
  // "transactionsForLast12Months": [
  //     {
  //         "month": "2023-02",
  //         "total_revenue": 0
  //     },
  //     {
  //         "month": "2023-03",
  //         "total_revenue": 0
  //     },
  //     {
  //         "month": "2023-04",
  //         "total_revenue": 0
  //     },
  //     {
  //         "month": "2023-05",
  //         "total_revenue": 0
  //     },
  //     {
  //         "month": "2023-06",
  //         "total_revenue": 0
  //     },
  //     {
  //         "month": "2023-07",
  //         "total_revenue": 0
  //     },
  //     {
  //         "month": "2023-08",
  //         "total_revenue": 0
  //     },
  //     {
  //         "month": "2023-09",
  //         "total_revenue": 0
  //     },
  //     {
  //         "month": "2023-10",
  //         "total_revenue": 0
  //     },
  //     {
  //         "month": "2023-11",
  //         "total_revenue": 0
  //     },
  //     {
  //         "month": "2023-12",
  //         "total_revenue": 0
  //     },
  //     {
  //         "month": "2024-01",
  //         "total_revenue": 0
  //     }
  // ]
}
