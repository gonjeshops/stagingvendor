import Link from "next/link";
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
import { SalesTable } from "@/components/Layout/Sales/SalesTable";
import { discountColumns } from "@/components/Layout/Sales/SalesColumns";
import Dashboard from "@/components/Layout/Dashboard/Chart";
const Sales = () => {
  const data = [
    { month: "sun", products: 400, earning: 320 },
    { month: "mon", products: 100, earning: 500 },
    { month: "tues", products: 200, earning: 100 },
    { month: "wed", products: 100, earning: 200 },
  ];
  const data2 = [
    { month: "sun", products: 400, earning: 320 },
    { month: "mon", products: 100, earning: 500 },
    { month: "tues", products: 200, earning: 100 },
    { month: "wed", products: 100, earning: 200 },
    { month: "thurs", products: 500, earning: 200 },
    { month: "fri", products: 460, earning: 200 },
    { month: "sat", products: 700, earning: 200 },
  ];
  const discountData =[
    {
      image: {
        id: "1",
        original: "original_image_1.jpg",
        thumbnail: "thumbnail_image_1.jpg",
      },
      name: "Product 1",
      start_offer: "2023-11-01",
      end_offer: "2023-11-30",
      price: 50,
      discount: 10,
      offered_price: 45,
    },
    {
      image: {
        id: "2",
        original: "original_image_2.jpg",
        thumbnail: "thumbnail_image_2.jpg",
      },
      name: "Product 2",
      start_offer: "2023-11-05",
      end_offer: "2023-12-05",
      price: 80,
      discount: 15,
      offered_price: 68,
    },
    {
      image: {
        id: "3",
        original: "original_image_3.jpg",
        thumbnail: "thumbnail_image_3.jpg",
      },
      name: "Product 3",
      start_offer: "2023-11-10",
      end_offer: "2023-12-10",
      price: 65,
      discount: 20,
      offered_price: 52,
    },
    {
      image: {
        id: "4",
        original: "original_image_4.jpg",
        thumbnail: "thumbnail_image_4.jpg",
      },
      name: "Product 4",
      start_offer: "2023-11-15",
      end_offer: "2023-12-15",
      price: 90,
      discount: 25,
      offered_price: 67.5,
    },
    {
      image: {
        id: "5",
        original: "original_image_5.jpg",
        thumbnail: "thumbnail_image_5.jpg",
      },
      name: "Product 5",
      start_offer: "2023-11-20",
      end_offer: "2023-12-20",
      price: 75,
      discount: 30,
      offered_price: 52.5,
    },
  ];
  return (
    <section>
      <section className="container space-y-10">
        {/* <Dashboard/> */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-auto-rows-1/3 gap-x-8 gap-y-4 justify-between">
          <div className="bg-white xl:w-[410px] px-4 py-8 rounded-md">
            <div>
              <h2 className="font-semibold text-xl capitalize">
                Products Sold
              </h2>
              <p className="text-gray-400 font-medium">900 products</p>
            </div>
            <BarChart
              width={250}
              height={300}
              data={data}
              className="profit_bar"
            >
              <XAxis dataKey="month" angle={-15} minTickGap={0} interval={0} />
              <YAxis />
              <Bar
                stackId="a"
                dataKey="products"
                fill="#f7d594"
                name="products"
                className="rounded-md border-black border-4"
              />
              <Legend layout="horizontal" verticalAlign="top" align="right" />
              <Tooltip />
            </BarChart>
          </div>
          <TopSales />
          <TopProducts />
        </div>
        <div className="flex flex-wrap gap-y-4 justify-between">
          <NumberCards />
          <NumberCards />
          <NumberCards />
          <NumberCards />
        </div>
        <div className="flex flex-col xl:flex-row justify-between gap-x-6 gap-y-4">
          <div className="bg-white xl:w-[750px] px-4 py-8 rounded-md">
            <div>
              <h2 className="font-semibold text-xl capitalize">
                Products Sold
              </h2>
              <p className="text-gray-400 font-medium">900 products</p>
            </div>
            <BarChart
              width={550}
              height={300}
              data={data2}
              className="profit_bar"
            >
              <XAxis dataKey="month" angle={-15} minTickGap={0} interval={0} />
              <YAxis />
              <Bar
                stackId="a"
                dataKey="products"
                fill="#f7d594"
                name="products"
                className="rounded-md border-black border-4"
              />
              <Legend layout="horizontal" verticalAlign="top" align="right" />
              <Tooltip />
            </BarChart>
          </div>
          <div className="bg-white xl:w-[750px] px-4 py-8 rounded-md">
            <div>
              <h2 className="font-semibold text-xl capitalize mb-12">
                Top Countries by Sale
              </h2>
              {/* <p className="text-gray-400 font-medium">900 products</p> */}
            </div>
            <div className="space-y-4">
              <p className="text-lg font-medium">Australia</p>
              <p className="text-lg font-medium">United Kingdom</p>
              <p className="text-lg font-medium">United States of America</p>
              <p className="text-lg font-medium">France</p>
              <p className="text-lg font-medium">Italy</p>
            </div>
          </div>
        </div>
        <SalesTable columns={discountColumns} data={discountData}/>
      </section>
    </section>
  );
};

export default Sales;

const NumberCards = () => {
  return (
    <div className="w-[330px] md:w-[280px] px-10 py-12 bg-white shadow rounded-md">
      <div className="flex flex-col items-center justify-center text-lg font-semibold space-y-4">
        <h2>Projected Revenue</h2>
        <div className="bg-gonje rounded-full h-20 w-20 flex items-center justify-center">
          <p>2133</p>
        </div>
      </div>
    </div>
  );
};
const TopProducts = () => {
  return (
    <div className="bg-white xl:w-[410px] px-4 py-8 rounded-md">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-semibold text-xl capitalize">Top products</h2>
            <p className="text-gray-400 font-medium">900 products</p>
          </div>
          <div>
            <Link href="" className="underline text-gonje">
              View all
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          {Array.from(Array(4)).map((_, index) => (
            <div className="flex justify-between border-b-2 py-1" key={index}>
              <div className="flex gap-x-4">
                <div className="bg-red-500 rounded-md w-10 h-10" />
                <div>
                  <h2 className="text-xl">Rice</h2>
                  <h2 className="space-x-1">
                    <span className="text-gray-400"> Item:</span>
                    <strong>10</strong>
                  </h2>
                </div>
              </div>
              <p className="font-medium">$10k</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const TopSales = () => {
  return (
    <div className="bg-white xl:w-[410px] px-4 py-8 rounded-md min">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-semibold text-xl">Today's Sale</h2>
            <p className="text-gray-400 font-medium">900 products</p>
          </div>
          <div>
            <Link href="" className="underline text-gonje">
              View all
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          {Array.from(Array(2)).map((_, index) => (
            <div className="flex justify-between border-b-2 py-1" key={index}>
              <div className="flex gap-x-4">
                <div className="bg-red-500 rounded-md w-10 h-10" />
                <div>
                  <h2 className="text-xl">Rice</h2>
                  <h2 className="space-x-1">
                    <span className="text-gray-400"> Item:</span>
                    <strong>10</strong>
                  </h2>
                </div>
              </div>
              <p className="font-medium">$10k</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
