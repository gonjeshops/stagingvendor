import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import HeadB2c from "./HeadB2c";
import Breadcrumb from "@/componentsB2b/BreadCrumb";

const Layout = ({ children }) => {
  const [isShowSideBar, setShowSideBar] = useState(false);

  const toggleSidebar = () => {
    setShowSideBar(!isShowSideBar);
  };

  return (
    <>
      <HeadB2c/>
      <Sidebar isShowSideBar={isShowSideBar} toggleSidebar={toggleSidebar} />
      <div className="side-body vender-side">
      {  isShowSideBar && <div className="main_overlay" onClick={toggleSidebar}/>}
        <TopBar toggleSidebar={toggleSidebar} />
        <div className="graphs h-[97vh]  inset-0 overflow-auto relative max-sm:pt-10">
          <Breadcrumb/>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
