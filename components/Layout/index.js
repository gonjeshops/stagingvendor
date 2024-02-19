import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import HeadB2c from "./HeadB2c";
import Breadcrumb from "./BreadCrumbB2C";

// import Breadcrumb from "@/componentsB2b/BreadCrumb";

const Layout = ({ children }) => {
  const [isShowSideBar, setShowSideBar] = useState(false);

  const toggleSidebar = () => {
    setShowSideBar(!isShowSideBar);
  };

  return (
    <>
    <HeadB2c/>
    <div className="">
      
        <Sidebar isShowSideBar={isShowSideBar} toggleSidebar={toggleSidebar} />
     
      {/* {  isShowSideBar && <div className="main_overlay" onClick={toggleSidebar}/>} */}
      <div className="fixed w-full top-0 z-40">
        <TopBar toggleSidebar={toggleSidebar} />
      </div>
        <div className="h-screen md:pl-[22rem]  max-md:px-4 md:pr-8 mt-28 pb-14 overflow-auto relative ">
          <Breadcrumb/>
          {children}
        </div>
    </div>
    
    </>
    // <>
    //   <HeadB2c/>
    //   <Sidebar isShowSideBar={isShowSideBar} toggleSidebar={toggleSidebar} />
    //   <div className="side-body vender-side">
    //   {  isShowSideBar && <div className="main_overlay" onClick={toggleSidebar}/>}
    //     <TopBar toggleSidebar={toggleSidebar} />
    //     <div className="graphs h-[97vh]  inset-0 overflow-auto relative max-sm:pt-10">
    //       <Breadcrumb/>
    //       {children}
    //     </div>
    //   </div>
    // </>
  );
};

export default Layout;
