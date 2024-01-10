import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const data = [
  {
    month: "jan",
    earning: 40,
    color: "pink",
  },
  {
    month: "feb",
    earning: 120,
    color: "green",
  },

  {
    month: "mar",
    earning: 80,
    color: "yellow",
  },
  {
    month: "apr",
    earning: 60,
    color: "red",
  },
];
const Earnings = ({topProductsForPieChart}) => {
  return (
    <div className="order_graph mr-0">
      <div className="content">
        <h2>Top Products For PieChart</h2>
        <p className="mb-0 mt-2">This Month</p>
        {/* <strong>$4055.55</strong>
        <p>45.2% more then last month</p> */}
      </div>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <PieChart width={200} height={200} className="profit_bar">
        <Pie
          dataKey="total_sold"    
          startAngle={360}
          endAngle={0}
          data={topProductsForPieChart}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="red"
          label
        >
          {data.map((el, index) => {
            return <Cell key={`cell_${index}`} fill={el.color} />;
          })}
        </Pie>
        <Tooltip />
      </PieChart>
      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default Earnings;
