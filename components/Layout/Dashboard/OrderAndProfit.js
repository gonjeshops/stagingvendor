import React from "react";
import { FaTable } from "react-icons/fa";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,ReferenceLine,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const RawData = [
  { month: "jan", orders: 400 },
  { month: "feb", orders: 700 },
  { month: "mar", orders: 200 },
  { month: "may", orders: 1000 },
  { month: "jun", orders: 700 },
  { month: "jul", orders: 300 },
  { month: "aug", orders: 330 },
  { month: "sep", orders: 280 },
  { month: "oct", orders: 800 },
  { month: "nov", orders: 100 },
  { month: "dec", orders: 670 },
];

const pdata = [
  {
    month: "jan",
    profit: 0,
  },
  {
    month: "feb",
    profit: 120,
  },
  {
    month: "mar",
    profit: 80,
  },
  {
    month: "apr",
    profit: 30,
  },
  {
    month: "may",
    profit: 50,
  },
  {
    month: "jun",
    profit: 20,
  },
  {
    month: "jul",
    profit: 20,
  },
];

const OrderAndProfit = ({ dashboardData, setModalType }) => {
  const monthlyData = dashboardData?.monthly_order;
  const data = RawData.map((el, index) => {
    return {
      ...el,
      totalorder: monthlyData ? monthlyData[index]?.totalorder : 0,
    };
  });
  return (
      <div className="cards">
          <div className="flex gap-6 justify-between items-center">
            <h4 className="cardh4">Total orders per month</h4>
            <FaTable className="cursor-pointer text-gray-400 hover:text-gray-700 duration-300" size={16} onClick={()=>setModalType('totalOrdersPerMonth')} />
        </div>
          <BarChart className="profit_bar" width={450} height={300} data={dashboardData?.totalOrdersPerMonth} >
            <Bar
              dataKey="total_orders"
              fill="#8884d8"
              name="Total orders"
              className="profit_bar_color"
            />
            <XAxis dataKey="month" angle={-15} minTickGap={0} interval={0} />
            <YAxis />
            <Legend layout="horizontal" verticalAlign="top" align="right" />
            <Tooltip />
          </BarChart>
      </div>

      // <div className="col-xl-4 col-sm-6">
      //   <div className="order_graph">
      //     <h2>Total orders per month</h2>
      //     {/* <strong>6,24k</strong> */}
      //     <ResponsiveContainer
      //       className="profit_bar"
      //       width="100%"
      //       // width={240}
      //       height={260}
      //     >
      //       {/* <LineChart data={dashboardData?.totalOrdersPerMonth}>
      //         <XAxis dataKey="month" interval={"preserveStartEnd"} />
      //         <YAxis></YAxis>

      //         <Tooltip />
      //         <Line dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
      //       </LineChart> */}

      //       <AreaChart
      //         data={dashboardData?.totalOrdersPerMonth}
      //         margin={{ top: 30, right: 40, left: 0, bottom: 0 }}
      //       >
      //         <XAxis dataKey="month" />
      //         <YAxis />
      //         <CartesianGrid strokeDasharray="3 3" />
      //         <Tooltip />
      //         <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
      //         <ReferenceLine
      //           y={4000}
      //           label="Max"
      //           stroke="red"
      //           strokeDasharray="3 3"
      //         />
      //         <Area
      //           type="monotone"
      //           dataKey="total_orders"
      //           stroke="#8884d8"
      //           // stroke="#82ca9d"
      //           fill="#82ca9d"
      //         />
      //       </AreaChart>
      //     </ResponsiveContainer>
      //   </div>
      // </div>
  );
};

export default OrderAndProfit;
