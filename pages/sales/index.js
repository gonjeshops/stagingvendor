import Link from "next/link";
import React from "react";

const Sales = () => {
  return (
    <section>
      <section className="container space-y-8">
        <div className="flex flex-col lg:flex-row justify-between">
        <TopProducts/>            

        <TopSales />
        <TopProducts/>            
        </div>

        <div className="flex flex-wrap gap-y-4 justify-between">
          <NumberCards />
          <NumberCards />
          <NumberCards />
          <NumberCards />
        </div>
      </section>
    </section>
  );
};

export default Sales;

const NumberCards = () => {
  return (
    <div className="w-[330px] md:w-[300px] px-10 py-12 bg-white shadow rounded-md">
      <div className="flex flex-col items-center justify-center text-xl font-semibold space-y-4">
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
    <div className="bg-white md:w-[425px] px-4 py-8 rounded-md">
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
    <div className="bg-white md:w-[425px] px-4 py-8 rounded-md min">
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
