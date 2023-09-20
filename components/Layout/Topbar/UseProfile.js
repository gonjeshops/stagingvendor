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

const UseProfile = ({
  userData,
  isOpenProfile,
  toggleProfile,
  logoutVendor,
}) => {
  const route = useRouter();
  return (
    <>
      <div className="profile">
        <div className="dropdown d-flex">
          <Image src={userData.profilePic || UserPng} alt="" />
          <a
            className={`btn btn-secondary user-icon dropdown-toggle ${
              isOpenProfile ? "show" : ""
            }`}
            onClick={toggleProfile}
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {userData.name || ""} <Image src={UserSvg} />
          </a>

          <ul
            className={`dropdown-menu ${isOpenProfile ? "show" : ""} `}
            aria-labelledby="dropdownMenuLink"
          >
            {/* <li>
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
          </li> */}
            {/* <li>
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
          </li> */}
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
          </li> */}
            {/* <li>
            <a className="dropdown-item">
              <Image
                className="me-2"
                src={ManageAccountSvg}
                alt=""
                height={15}
                width={40}
              />{" "}
              Manage Account
            </a>
          </li> */}
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
            {/* <li>
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
            <li>
              <a
                className="dropdown-item"
                onClick={() => {
                  logoutVendor().then(() => {
                    route.push("/login");
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
        </div>
      </div>
    </>
  );
};

export default UseProfile;
