import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  addSignature,
  changeTimeSheetStatus,
  employeeTimesheet,
  updateEmployeeTimesheet,
  uploadSignatureVendor,
} from "../../../../redux/actions/employee";
import { b64toBlob } from "../../../../utils";
import Loader from "../../../common/Loader";
import Header from "./Header";
import List from "./List";
import TimeSheetDetail from "./TimeSheetDetail";

const TimeSheetPage = ({
  getEmployeeTimesheet,
  timesheetData,
  updateEmployeeTimings,
  rejectTimeSheet,
  addVendorSignature,
  uploadSignature,
}) => {
  const route = useRouter();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (route?.query?.id) {
      setLoading(true);
      getEmployeeTimesheet({
        staff_id: route?.query?.id,
        shop_id: localStorage.getItem("shop_id"),
      }).then(() => {
        setLoading(false);
      });
    }
  }, [route]);

  const timeSheet = useMemo(() => {
    if (timesheetData) {
      const user = timesheetData?.data?.user;
      const deatailObject = {
        vendor_name: user?.managed_shop?.owner?.name,
        staff_name: user?.name,
        shift_timings: user?.shift_timings, //string
        hourly_rate: user?.hourly_rate,
        activity: user?.activity?.name,
        store_name: user?.managed_shop?.name,
      };
      return {
        detail: deatailObject,
        listData: timesheetData?.data?.time_sheet?.days || [],
        status: timesheetData?.data?.time_sheet?.status,
        id: timesheetData?.data?.time_sheet?.id,
        total_hours: timesheetData?.data?.time_sheet?.total_hours,
        staff_id: user.id,
        emp_creationDate: user?.created_at,
        milage_status: user?.activity?.milage_status,
      };
    }
  }, [timesheetData]);

  const updateTimings = (data) => {
    setLoading(true);
    updateEmployeeTimings(data).then((action) => {
      if (action.payload.data.status === 1) {
        toast.success(action.payload.data.message);
        getEmployeeTimesheet({
          staff_id: route?.query?.id,
          shop_id: localStorage.getItem("shop_id"),
        }).then(() => {
          setLoading(false);
        });
      } else {
        toast.error(action.payload.data.message);
        setLoading(false);
      }
    });
  };

  const handleReject = () => {
    const data = {
      status: 3, // for reject or decline status is  3
      staff_id: route?.query?.id,
      timesheet_id: timeSheet.id,
      shop_id: localStorage.getItem("shop_id"),
    };
    setLoading(true);
    rejectTimeSheet(data).then((action) => {
      if (action.payload.data.status === 1) {
        toast.success(action.payload.data.message);
        getEmployeeTimesheet({
          staff_id: route?.query?.id,
          shop_id: localStorage.getItem("shop_id"),
        }).then(() => {
          setLoading(false);
        });
      }
    });
  };

  const saveSignature = async (imageUrl) => {
    const formData = new FormData();
    const blobData = await b64toBlob(imageUrl);
    formData.append("attachment[]", blobData);
    setLoading(true);
    addVendorSignature(formData).then((action) => {
      if (action.payload.data.status === 1) {
        /// upload vendor signature api call here
        const data = action.payload.data.data[0];
        const dataToSent = {
          timesheet_id: timeSheet.id,
          signature: {
            id: data.id,
            original: data.original,
            thumbnail: data.thumbnail,
          },
        };
        uploadSignature(dataToSent).then((action) => {
          if (action.payload.data.status === 1) {
            toast.success(action.payload.data.message);
            getEmployeeTimesheet({
              staff_id: route?.query?.id,
              shop_id: localStorage.getItem("shop_id"),
            }).then(() => {
              setLoading(false);
            });
          } else {
            toast.error(action.payload.data.message);
            setLoading(false);
          }
        });
      }
    });
  };

  const handleDateChange = (date) => {
    setLoading(true);
    getEmployeeTimesheet({
      staff_id: route?.query?.id,
      shop_id: localStorage.getItem("shop_id"),
      date: moment(date).format("YYYY-MM-DD"),
    }).then(() => {
      setLoading(false);
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <Header
        onDateChange={handleDateChange}
        creationDate={timeSheet?.emp_creationDate}
        status={timeSheet?.status}
      />
      <TimeSheetDetail detail={timeSheet?.detail} />
      <List
        listData={timeSheet?.listData}
        status={timeSheet?.status}
        total_hours={timeSheet?.total_hours}
        onUpdateTimings={updateTimings}
        timesheet_id={timeSheet?.id}
        staff_id={timeSheet?.staff_id}
        onReject={handleReject}
        onAccept={saveSignature}
        milageStatus={timeSheet?.milage_status}
        employeeCreationDate={timeSheet?.emp_creationDate}
      />
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    timesheetData: state.employee.timesheetData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployeeTimesheet: (data) => {
      return dispatch(employeeTimesheet(data));
    },
    updateEmployeeTimings: (data) => {
      return dispatch(updateEmployeeTimesheet(data));
    },
    rejectTimeSheet: (data) => {
      return dispatch(changeTimeSheetStatus(data));
    },
    addVendorSignature: (data) => {
      return dispatch(addSignature(data));
    },

    uploadSignature: (data) => {
      return dispatch(uploadSignatureVendor(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheetPage);
