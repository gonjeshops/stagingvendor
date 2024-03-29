import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  UserPng,
  UserSvg,
  UpcomingDropdown,
  MyOrder,
  MyCart,
  ManageAccountSvg,
  NotificationSvg,
  WalletSvg,
  LogoutSvg,
} from "../../../assets";
import { useGlobalState } from "@/context/GlobalStateContext";

const ProfileDropdown = ({
  setShow,
  userData,
  isOpenProfile,
  toggleProfile,
  logoutVendor,
}) => {
  const route = useRouter();
  return (
      <ul
        className={`w-full space-y-4`}
      >
        {/* <li onClick={()=>setShow('')}>
        <a className="dropdown-item">
          <Image
            className="me-2"
            src={UpcomingDropdown}
            alt=""
            height={15}
            width={40}
            layout="fixed"
          />
          Upcoming box
        </a>
      </li>  */}
      {/* <li onClick={()=>setShow('')}>
        <a className="dropdown-item">
          <Image
            className="me-2"
            src={MyOrder}
            alt=""
            height={15}
            width={40}
          />{" "}
          My order
        </a>
      </li>  */}
      {/* <li>
        <a className="dropdown-item">
          <Image
            className="me-2"
            src={MyCart}
            alt=""
            height={15}
            width={40}
          />
          My cart
        </a>
      </li>  */}
      <li onClick={()=>setShow('')}>
        <a className="dropdown-item"
        onClick={() => route.push("/manage_account")}>
          <Image
            className="me-2"
            src={ManageAccountSvg}
            alt=""
            height={15}
            width={40}
          />{" "}
          Manage Account
        </a>
      </li>
      {/* <li>
        <a className="dropdown-item">
          <Image
            className="me-2"
            src={NotificationSvg}
            alt=""
            height={15}
            width={40}
          />
          Notifications
        </a>
      </li> */}
      {/* <li onClick={()=>setShow('')}>
        <a className="dropdown-item">
          <Image
            className="me-2"
            src={WalletSvg}
            alt=""
            height={15}
            width={40}
          />
          Wallet
        </a>
      </li> */}
      <li onClick={()=>setShow('')}>
          <a
            className="dropdown-item"
            onClick={() => {
              logoutVendor().then(() => {
                route.push("/");
                localStorage.clear();
              });
            }}
          >
            <Image
              className="me-2"
              src={LogoutSvg}
              alt=""
              height={15}
              width={40}
            />
            Logout
          </a>
        </li>
      </ul>
  );
};

export default ProfileDropdown;
