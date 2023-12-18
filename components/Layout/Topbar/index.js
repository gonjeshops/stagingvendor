import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { logout_vendor } from "../../../api/logout";
import { SignUpLogo } from "../../../assets";
import { logout } from "../../../redux/actions/auth";
import { getUserDetail } from "../../../redux/actions/userDetail";
import Notification from "./Notification";
import UseProfile from "./UseProfile";
import TopbarBtnModal from "./TopbarBtnModal";
const TopBar = ({
  toggleSidebar,
  userDetail,
  fetchUserDetail,
  logoutVendor,
}) => {
  const route = useRouter();
  const [isOpenProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const userData = useMemo(() => {
    return {
      name: userDetail?.name,
      profilePic: userDetail?.profile?.avtar,
    };
  }, [userDetail]);

  const toggleProfile = () => {
    setOpenProfile(!isOpenProfile);
  };

  return (
    <>
      <div className="top-head home d-block vendor-top-head">
        {isOpenProfile && (
          <div className="profile_dropdown_overlay" onClick={toggleProfile} />
        )}
        <div className="menu">
          <div className="sm-logo">
            <Image src={SignUpLogo} alt="" />
          </div>
          <button id="menu-toggle" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
            </svg>
          </button>
        </div>
        <div className="wrapper d-flex justify-content-end">
          <div className="d-flex align-items-center">
            <TopbarBtnModal/>
            {/* <Notification /> */}
            {/* <div className="choose-lang">
               <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>EN</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>  */}
            <UseProfile
              userData={userData}
              isOpenProfile={isOpenProfile}
              logoutVendor={logoutVendor}
              toggleProfile={toggleProfile}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    userDetail: state.user.userDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserDetail: (data) => {
      return dispatch(getUserDetail(data));
    },
    logoutVendor: (data) => {
      return dispatch(logout(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
