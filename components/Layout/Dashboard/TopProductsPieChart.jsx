import React from "react";
import { AiOutlineTable, AiOutlineTablet } from "react-icons/ai";
import { FaTable, FaTabletAlt } from "react-icons/fa";
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
const TopProductsPieChart = ({topProductsForPieChart, setModalType}) => {
  return (
    <div className="cards">
      <div className="flex justify-between items-center">
        <div className="">
          <h2 className="cardh4">Top Products Comparison</h2>
          <p className="mt-2">This Month</p>
        </div>
        <FaTable className="cursor-pointer text-gray-400 hover:text-gray-700 duration-300" size={16} onClick={()=>setModalType('topProductsForPieChart')} />
      </div>
     
      <PieChart width={320} height={200} className="profit_bar">
        <Pie
          dataKey="total_sold"    
          startAngle={360}
          endAngle={0}
          data={topProductsForPieChart}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="red"
          name="name"
          label="total_sold"
          nameKey={'name'}
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

export default TopProductsPieChart;
