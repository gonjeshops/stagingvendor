import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Logo, UpgradePro, Inventory, DropdownSvg } from "../../../assets";
import { SideTabs } from "./SideTabs";
import { useRouter } from "next/router";
import GlobalStateProvider from "@/context/GlobalStateProvider";

const Sidebar = ({ isShowSideBar, toggleSidebar }) => {
  const {user} = GlobalStateProvider()

  const route = useRouter();
  const activePath = route.asPath;
  const [toggleHrm, setHRMToggle] = useState(false);
  const [sideTabs, setSideTabs] = useState(SideTabs.staff);
  const [isVendor, setVendor] = useState(false);

  useEffect(() => {
    const isLogin = localStorage.getItem("loginAs");
    if (isLogin == "store_owner") {
      setSideTabs(SideTabs.vendor);
      setVendor(true);
    }
  }, []);

  // console.log("isVendor", isVendor);

  return (
    <div
      className={`aside vendor-dashboard flex-column vh-lg-100 flex-shrink-0 text-white ${
        isShowSideBar ? "aside-show" : ""
      }`}
      style={{ width: "235px" }}
    >
      <a
        onClick={() => route.back()}
        className="d-flex align-items-center mx-auto mb-3 mb-md-0  text-white text-decoration-none"
      >
        <Image
          className="p-3 img-fluid logo"
          src={Logo.src}
          alt="logo"
          height={85}
          width={140}
        />
      </a>

      <hr className="mt-2" />

      <ul className="nav nav-pills flex-column mb-auto">
        <a onClick={toggleSidebar} className="closebtn">
          &times;
        </a>

        {Object.keys(sideTabs).map((item) => {
          const Tab = sideTabs[item];
          return (
            <li className="nav-item" key={`key_${Tab.name}`}>
              {Tab.isCollapsable ? (
                <>
                  <a
                    data-bs-toggle="collapse"
                    aria-expanded={toggleHrm}
                    onClick={() => {
                      setHRMToggle(!toggleHrm);
                    }}
                    className={`d-flex togg justify-content-between nav-link text-whitee `}
                    aria-current="page"
                  >
                    <div className="d-flex">
                      <div className="icon text-center">
                        <Image src={Tab.image} alt="xsxcc" height={20} width={20} />
                      </div>
                      <span className="ms-2">{Tab.name}</span>
                    </div>

                    <Image
                      className="down"
                      src={DropdownSvg}
                      alt=""
                      height={10}
                      width={10}
                    />
                  </a>

                  <div
                    id="collapseExample1"
                    className={`panel-collapse collapse ${
                      toggleHrm ? "show" : ""
                    }`}
                  >
                    <div className="panel-body">
                      <ul className="nav navbar-nav">
                        {(Tab?.innerTabs || []).map((innerTab) => {
                          return innerTab.url !== "/timesheet" && isVendor ? (
                            <li key={`key_${innerTab.name}`}>
                              <Link href={innerTab.url}>
                                <a
                                  className={`nav-link  ${
                                    route.asPath.includes(innerTab.url)
                                      ? "active"
                                      : "text-whitee"
                                  }`}
                                >
                                  {innerTab.name}
                                </a>
                              </Link>
                            </li>
                          ) : route.asPath.includes(innerTab.url) ||
                            !isVendor ? (
                            <li key={`key_${innerTab.name}`}>
                              <a
                                className={`nav-link  ${
                                  route.asPath.includes(innerTab.url)
                                    ? "active"
                                    : "text-whitee"
                                }`}
                              >
                                {innerTab.name}
                              </a>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <Link href={Tab.url}>
                  <a
                    className={`d-flex nav-link ${
                      route.asPath.includes(Tab.url) ? "active" : "text-whitee"
                    }`}
                    aria-current="page"
                  >
                    <div className="icon text-center">
                      <Image src={Tab.image} alt="" height={20} width={20} />
                    </div>
                    <span className="ms-2">{Tab.name}</span>
                  </a>
                </Link>
              )}
            </li>

            
          );
        })}
        {user?.permissions?.includes('vendor_b2b') &&<Link href={'/vendorb2b'} className="nav-link rounded-l-full" style={{color: 'black', background: 'white'}}>
        Switch to VendorB2B
      </Link>}
      </ul>
      
    </div>
  );
};

export default Sidebar;
