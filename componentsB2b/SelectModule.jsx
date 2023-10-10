import Link from "next/link";
// import backgroundImage from "./bg.png"; // Import your background image

const SelectModule = () => {
  return (
    <div
     
      style={{
        backgroundImage: `url(/bg.png)`, 
        backgroundSize: "cover", 
        backgroundPosition: "center",
      }}
    >
      <div  className="section-padding h-screen w-screen text-center flex justify-center items-center">
      <div className="w-full gap-8 grid justify-center">
        <h3 className="text-4xl font-semibold ">Select a vendor module</h3>
        <div className="md:flex gap-8 grid">
          <Link
            href={"/dashboard"}
            className="w-full md:w-80 rounded-xl bg-green-600 text-white h-80 flex flex-col gap-2 items-center justify-center font-semibold text-4xl hover:bg-green-800 duration-300"
            >
              <h5>B2C</h5>
              <p className="text-sm px-6"> Business To Customer Module</p>
          </Link>
          <Link
            href={"/vendorb2b"}
            className="w-full md:w-80 rounded-xl bg-green-600 text-white h-80 flex flex-col gap-2 items-center justify-center font-semibold text-4xl hover:bg-green-800 duration-300"
          >
            <h5>B2B</h5>
            <p className="text-sm px-6"> Business To Business Module</p>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SelectModule;