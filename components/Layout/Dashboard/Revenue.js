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
} from "recharts";
const data = [
  { month: "jan", expense: 400, earning: 320 },
  { month: "feb", expense: 100, earning: 500 },
  { month: "mar", expense: 200, earning: 100 },
  { month: "may", expense: 100, earning: 200 },
  { month: "jun", expense: 140, earning: 300 },
  { month: "jul", expense: 100, earning: 400 },
  { month: "aug", expense: 100, earning: 500 },
  { month: "sep", expense: 210, earning: 600 },
  { month: "oct", expense: 270, earning: 700 },
  { month: "nov", expense: 320, earning: 800 },
  { month: "dec", expense: 400, earning: 100 },
];
const RevenueReport = ({transactionsForLast12Months}) => {
  return (
    <div className="report revenue_graph">
      <h4>Monthly Revenue</h4>
      {/* <ResponsiveContainer> */}
     <div className="rev-barchart">
     <BarChart width={800} height={300} data={data} className="profit_bar">
        <XAxis dataKey="month" angle={-15} minTickGap={0} interval={0} />
        <YAxis />
        <Bar stackId="a" dataKey="expense" fill="#8884d8" name="expense" />
        <Bar stackId="a" dataKey="earning" fill="#fbdda2" name="earning" />
        <Legend layout="horizontal" verticalAlign="top" align="right" />
        <Tooltip />
      </BarChart>
     </div>
      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default RevenueReport;
