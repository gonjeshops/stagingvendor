import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  addSignature,
  employeeTimesheet,
  updateDriverMilage,
  updateEmployeeTimesheet,
  uploadSignatureEmployee,
} from "../../../../redux/actions/employee";
import { b64toBlob } from "../../../../utils";
import Loader from "../../../common/Loader";
import DetailSection from "./DetailSection";
import Header from "./Header";
import TimeSheet from "./TimeSheet";

const EmplyeeSectionTimeSheetPage = ({
  getEmployeeTimesheet,
  timesheetData,
  updateEmployeeTimings,
  addEmployeeSignature,
  uploadSignature,
  updateMilage,
}) => {
  const [isLoading, setLoading] = useState(false);
  const route = useRouter();

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

  const updateTimings = (data) => {
    setLoading(true);
    updateEmployeeTimings(data).then((action) => {
      setLoading(false);
      if (action.payload.data.status === 1) {
        toast.success(action.payload.data.message);
        getEmployeeTimesheet({
          staff_id: route?.query?.id,
          shop_id: localStorage.getItem("shop_id"),
        });
      } else {
        toast.error(action.payload.data.message);
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

  const saveSignature = async (imageUrl) => {
    const formData = new FormData();
    const blobData = await b64toBlob(imageUrl);
    formData.append("attachment[]", blobData);
    addEmployeeSignature(formData).then((action) => {
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
          if (action?.payload?.data?.status === 1) {
            toast.success(action.payload.data.message);
            getEmployeeTimesheet({
              staff_id: route?.query?.id,
              shop_id: localStorage.getItem("shop_id"),
            });
          } else {
            toast.error(action.payload.data.message);
          }
        });
      }
    });
  };

  const addMilage = (data) => {
    const dataToSent = {
      ...data,
      time_sheet_id: timeSheet.id,
    };
    updateMilage(dataToSent).then((action) => {
      if (action.payload.data.status === 1) {
        toast.success(action.payload.data.message);
        getEmployeeTimesheet({
          staff_id: route?.query?.id,
          shop_id: localStorage.getItem("shop_id"),
        });
      }
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <Header
        creationDate={timeSheet?.emp_creationDate}
        onDateChange={handleDateChange}
        status={timeSheet?.status}
      />
      <DetailSection detail={timeSheet?.detail} />
      <TimeSheet
        listData={timeSheet?.listData}
        status={timeSheet?.status}
        total_hours={timeSheet?.total_hours}
        onUpdateTimings={updateTimings}
        onAccept={saveSignature}
        milageStatus={timeSheet?.milage_status}
        onAddMilage={addMilage}
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

    addEmployeeSignature: (data) => {
      return dispatch(addSignature(data));
    },

    uploadSignature: (data) => {
      return dispatch(uploadSignatureEmployee(data));
    },
    updateMilage: (data) => {
      return dispatch(updateDriverMilage(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmplyeeSectionTimeSheetPage);
