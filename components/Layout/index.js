import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";

const Layout = ({ children }) => {
  const [isShowSideBar, setShowSideBar] = useState(false);

  const toggleSidebar = () => {
    setShowSideBar(!isShowSideBar);
  };

  return (
    <>
      <Sidebar isShowSideBar={isShowSideBar} toggleSidebar={toggleSidebar} />
      <div className="side-body vender-side">
      {  isShowSideBar && <div className="main_overlay" onClick={toggleSidebar}/>}
        <TopBar toggleSidebar={toggleSidebar} />
        <div className="graphs">{children}</div>
      </div>
    </>
  );
};

export default Layout;
