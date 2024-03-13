     
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { GonjeLogo, SignUpLogo } from "../../../assets";
import { logout } from "../../../redux/actions/auth";
import { getUserDetail } from "../../../redux/actions/userDetail";
import Alert from "@/components/ui/Alert";
import { alert, fetchService } from "@/api";

const TopBar = ({
  toggleSidebar,
  userDetail,
  fetchUserDetail,
  logoutVendor,
}) => {
  const route = useRouter();
  const [isOpenProfile, setOpenProfile] = useState(false);
  const [alertUpdate, setAlertUpdate] = useState('');

  useEffect(() => {
    fetchUserDetail();
    const alertStatus = async () => {
      const fetchData = await fetchService({method: 'GET', url: alert,})
      if (fetchData?.data) {
        setAlertUpdate(fetchData?.data)
      }
      console.log('===alertUpdate', fetchData?.data, alertUpdate)
    }
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
      <div className="px-6 2xl:px-16 flex gap-20 h-full bg-white items-center justify-between w-full">

        <div className="flex gap-3 items-center lg:hidden flex-shrink-0">
          <button id="menu-toggle" onClick={toggleSidebar} className="pt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
            </svg>
          </button>
          <Image onClick={`/dashboard`} src={GonjeLogo} alt="gonje-logo" width={100} height={85}/>
        </div>

        <div className=" flex w-full justify-end sm:justify-between gap-8 items-center">
          <div className="hidden sm:block">
            {alertUpdate?.status ? <Alert children={'You have pending task.'}/> : null}
          </div>
          {/* <TopbarBtnModal alertUpdate={alertUpdate} userData={userData} logoutVendor={logoutVendor}/> */}
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
