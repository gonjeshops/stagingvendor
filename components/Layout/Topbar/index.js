import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { SignUpLogo } from "../../../assets";
import { logout } from "../../../redux/actions/auth";
import { getUserDetail } from "../../../redux/actions/userDetail";
import TopbarBtnModal from "./TopbarBtnModal";
import Alert from "@/components/ui/Alert";

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
      <div className="px-4 flex gap-4 h-24 bg-white items-center justify-between ">
        {isOpenProfile && (
          <div className="profile_dropdown_overlay" onClick={toggleProfile} />
        )}

        <div className="menu sm:hidden">
          {/* <div className="sm-logo">
            <Image src={SignUpLogo} alt="a" />
          </div> */}
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

        <div className="wrapper flex w-full flex-1 justify-end sm:justify-between gap-8 items-center">
          <div className="hidden sm:block">
            <Alert children={'You have pending task.'}/>
          </div>
          <div className="d-flex align-items-center ">
            <TopbarBtnModal  userData={userData} logoutVendor={logoutVendor}/>
          </div>
        </div>
      </div>
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
