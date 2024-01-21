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

const OrderAndProfit = ({ orderData, setModalType, modal }) => {
  
  return (
      <div className="cards">
          <div className="flex gap-6 justify-between items-center">
            <h4 className="cardh4">Total orders per month</h4>
            <FaTable className="cursor-pointer text-gray-400 hover:text-gray-700 duration-300" size={16} onClick={()=>setModalType(modal)} />
        </div>
          <BarChart className="profit_bar" width={450} height={300} data={orderData} >
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

  );
};

export default OrderAndProfit;
