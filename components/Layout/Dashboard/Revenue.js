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
  Line,
  ResponsiveContainer,
  Legend,
} from "recharts";
// const data = [
//   { month: "jan", expense: 400, earning: 320 },
//   { month: "feb", expense: 100, earning: 500 },
//   { month: "mar", expense: 200, earning: 100 },
//   { month: "may", expense: 100, earning: 200 },
//   { month: "jun", expense: 140, earning: 300 },
//   { month: "jul", expense: 100, earning: 400 },
//   { month: "aug", expense: 100, earning: 500 },
//   { month: "sep", expense: 210, earning: 600 },
//   { month: "oct", expense: 270, earning: 700 },
//   { month: "nov", expense: 320, earning: 800 },
//   { month: "dec", expense: 400, earning: 100 },
// ];
const RevenueReport = ({data, setModalType, modal}) => {
  return (
    <div className="cards">
      <div className="flex gap-6 justify-between items-center">
          <h4 className="cardh4">Monthly Revenue</h4>
          <FaTable className="cursor-pointer text-gray-400 hover:text-gray-700 duration-300" size={16} onClick={()=>setModalType(modal)} />
      </div>

     <div className="">
     <BarChart width={800} height={300} data={data} className="profit_bar">
        <XAxis dataKey="month" angle={-15} minTickGap={0} interval={0} />
        <YAxis />
        <Bar stackId="a" dataKey="total_revenue" fill="#8884d8" name="Total revenue" />
        {/* <Bar stackId="a" dataKey="earning" fill="#fbdda2" name="earning" /> */}
        <Legend layout="horizontal" verticalAlign="top" align="right" />
        <Tooltip />
      </BarChart>
     </div>
    </div>
  );
};

export default RevenueReport;
