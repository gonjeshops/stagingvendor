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
    <div className="relative">
          {/* fixed top-0 left-0 w-80 z-50*/}
          <Sidebar isShowSideBar={isShowSideBar} setShowSideBar={setShowSideBar} />
          {  isShowSideBar ? 
            <div className="absolute inset-0 z-40 bg-black bg-opacity-50" onClick={toggleSidebar}/> : null
          }
        <div className="fixed w-full top-0 z-30 h-24">
          <TopBar toggleSidebar={toggleSidebar} />
        </div>
        <div className="min-h-screen lg:ml-80 px-6 2xl:px-16 pt-32 pb-14 relative ">
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
