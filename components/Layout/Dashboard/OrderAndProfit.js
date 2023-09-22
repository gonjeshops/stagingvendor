import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
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

// Sample Profit data
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

const OrderAndProfit = ({ dashboardData }) => {
  const monthlyData = dashboardData?.monthly_order;
  const data = RawData.map((el, index) => {
    return {
      ...el,
      totalorder: monthlyData ? monthlyData[index]?.totalorder : 0,
    };
  });
  return (
    <>
      <div className="col-xl-4 col-sm-6">
        <div className="order_graph">
          <h2>Order</h2>
          <strong>{dashboardData?.orders_count}</strong>
          <BarChart className="profit_bar" width={450} height={200} data={data} >
            <Bar
              dataKey="totalorder"
              fill="#8884d8"
              // className="profit_bar_color"
            />
            <XAxis dataKey="month" angle={-15} minTickGap={0} interval={0} />
            <YAxis />
            <Tooltip />
          </BarChart>
        </div>
      </div>
      <div className="col-xl-4 col-sm-6">
        <div className="order_graph">
          <h2>Profit</h2>
          <strong>6,24k</strong>
          <ResponsiveContainer
            className="profit_bar"
            width="100%"
            // width={240}
            height={200}
          >
            {/* <LineChart data={pdata}>
              <XAxis dataKey="month" interval={"preserveStartEnd"} />
              <YAxis></YAxis>

              <Tooltip />
              <Line dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart> */}

            <AreaChart
              data={pdata}
              // margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              {/* <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
              <ReferenceLine
                y={4000}
                label="Max"
                stroke="red"
                strokeDasharray="3 3"
              /> */}
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#8884d8"
                // stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default OrderAndProfit;