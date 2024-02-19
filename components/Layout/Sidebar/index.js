import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GonjeLogo,  } from "../../../assets";
import { SideTabs } from "./SideTabs";
import { useRouter } from "next/router";
import { FaAngleDown, FaAngleUp, FaTimes } from "react-icons/fa";

const Sidebar = ({ isShowSideBar, toggleSidebar }) => {
  const route = useRouter();
  const activePath = route.asPath;
  const [toggleHrm, setHRMToggle] = useState(false);
  const [dropdownName, setDropdownName] = useState("");
  const [sideTabs, setSideTabs] = useState(SideTabs.staff);
  const [isVendor, setVendor] = useState(false);

  const [activeNav, setActiveNav] = useState(activePath);

  useEffect(() => {
    const isLogin = localStorage.getItem("loginAs");
    if (isLogin === "store_owner") {
      setSideTabs(SideTabs.vendor);
      setVendor(true);
    }
    setActiveNav(activePath);
  }, [activePath]);

  return (
    <div
      className={`h-screen rounded-r-[32px] flex flex-col gap-4 overflow-hidden overflow-y-auto py-8 bg-gonje  text-white fixed w-80 top-0 left-0  z-50 transform transition-all duration-500
      ${isShowSideBar ? '' : 'max-md:-translate-x-full'}
      `}
     
    >
      <Link href={'/dashboard'}
        className="border-b pb-4 pl-8 w-full border-white"
      >
        <Image
          className="img-fluid logo"
          src={GonjeLogo}
          alt="logo"
          height={85}
          width={140}
        />
      </Link >

      <FaTimes size={20} onClick={toggleSidebar} className="absolute text-gray-700 hover:text-gray-950 duration-300 cursor-pointer top-8 right-8"/>

      <ul className="pl-8 text-lg grid gap-">
        {Object.keys(sideTabs).map((item) => {
          const Tab = sideTabs[item];
          return (
            <li className="" 
              
              key={`key_${Tab.name}`}>
              {Tab.isCollapsable ? (
                <>
                  <div
                    data-bs-toggle="collapse"
                    aria-expanded={toggleHrm}
                    onClick={() => {
                      setHRMToggle(!toggleHrm);
                      setDropdownName(Tab.name);
                    }}
                    className={`flex cursor-pointer  gap-6 items-center pl-6  py-3 hover:bg-white text-gray-700 duration-300 rounded-l-full w-full`}
                    aria-current="page"
                  >
                    <div className="flex items-center gap-2">
                      
                        {
                        Tab.name==='Vendo To Vendor' ?
                          <Image
                            src={Tab.image}
                            alt="v2v"
                            height={20}
                            width={20}
                          />
                        :
                          <Image
                            src={Tab.image}
                            alt="xsxcc"
                            height={20}
                            width={20}
                          /> 
                        }
                      
                      <span className="">{Tab.name}</span>
                    </div>

                    {   toggleHrm && dropdownName === Tab.name ? <FaAngleUp size={20} className="cursor-pointer" />
                    :
                    <FaAngleDown size={20} className="cursor-pointer" />
                    }
                  </div>

                  <div
                    id="collapseExample1"
                    className={`pl-5  ${
                      toggleHrm && dropdownName === Tab.name
                        ? "visible	"
                        : "hidden"
                    }`}
                  >
                    <div className="panel-body">
                      <ul className="nav navbar-nav">
                        {(Tab?.innerTabs || []).map((innerTab) => {
                          return innerTab.url !== "/timesheet" && isVendor ? (
                            <li key={`key_${innerTab.name}`}
                            onClick={toggleSidebar}>
                              <Link
                                href={innerTab.url}
                                passHref
                                  className={`nav-link  ${
                                    activeNav === innerTab.url
                                      ? "active"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {innerTab.name}
                       
                              </Link>
                            </li>
                          ) : route.asPath.includes(innerTab.url) ||
                            !isVendor ? (
                            <li key={`key_${innerTab.name}`}>
                              <Link
                                href={innerTab.url}
                                passHref
                                className={`nav-link  ${
                                  activeNav === innerTab.url
                                    ? "active"
                                    : "text-whitee"
                                }`}
                                >
                                  {innerTab.name}
                              </Link>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <Link href={Tab.url} 
                onClick={toggleSidebar}    
                passHref
                    className={`flex gap-2 items-center pl-6  py-3 hover:bg-white text-gray-700 duration-300 rounded-l-full w-full ${
                      activeNav === Tab.url ? "bg-white" : "text-whitee"
                    }`}
                    aria-current="page"
                  >
                    <div className="icon text-center">
                      <Image src={Tab.image} alt="" height={20} width={20} />
                    </div>
                    <span className="ms-2">{Tab.name}</span>
                 
                </Link>
              )}
            </li>
          );
        })}
        
      </ul>

      <hr className="mt-2" />
      {/* <div className="relative pb-14">
      <Link
          href={"/vendorb2b"}
          passHref
          className="nav-link rounded-l-full"
          style={{ color: "black", background: "white" }}
        >
          Switch to VendorB2B
        </Link>
      </div> */}
      
    </div>
  );
};

export default Sidebar;
