import {
  addEmployee,
  changeEmployeeStatus,
  deleteEmployee,
  getActivities,
  getEmployee,
  getEmployeeList,
  getEmployeeTimeSheet,
  updateEmployee,
  updateMilage,
  updateTimeSheetStatus,
  updateTimings,
  uploadEmployeeSignature,
  uploadVendorSignature,
} from "../../api/hrm/employee";
import { addAttachments } from "../../api/inventory";
import { types } from "../types/employee";

export const employeeList = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_EMPLOYEES_REQUEST,
    });
    try {
      const res = await getEmployeeList(values);
      return dispatch({
        type: types.GET_EMPLOYEES_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      return dispatch({
        type: types.GET_EMPLOYEES_FAILURE,
        payload: error.response,
      });
    }
  };
};

export const employeeStatus = (id) => {
  return async (dispatch) => {
    dispatch({
      type: types.CHANGE_EMPLOYEE_STATUS_REQUEST,
    });
    try {
      const res = await changeEmployeeStatus(id);
      return dispatch({
        type: types.CHANGE_EMPLOYEE_STATUS_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      return dispatch({
        type: types.CHANGE_EMPLOYEE_STATUS_FAILURE,
        payload: error.response,
      });
    }
  };
};

export const removeEmployee = (id) => {
  return async (dispatch) => {
    dispatch({
      type: types.DELETE_EMPLOYEE_REQUEST,
    });
    try {
      const res = await deleteEmployee(id);
      return dispatch({
        type: types.DELETE_EMPLOYEE_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      return dispatch({
        type: types.DELETE_EMPLOYEE_FAILURE,
        payload: error.response,
      });
    }
  };
};

export const createEmployee = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.ADD_EMPLOYEE_REQUEST,
    });
    try {
      const res = await addEmployee(values);
      return dispatch({
        type: types.ADD_EMPLOYEE_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      return dispatch({
        type: types.ADD_EMPLOYEE_FAILURE,
        payload: error.response,
      });
    }
  };
};

export const getSingleEmployee = (id) => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_EMPLOYEE_REQUEST,
    });
    try {
      const res = await getEmployee(id);
      return dispatch({
        type: types.GET_EMPLOYEE_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      return dispatch({
        type: types.GET_EMPLOYEE_FAILURE,
        payload: error.response,
      });
    }
  };
};

export const activitiesList = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_ACTIVITIES_REQUEST,
    });
    try {
      const res = await getActivities(values);
      return dispatch({
        type: types.GET_ACTIVITIES_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      return dispatch({
        type: types.GET_ACTIVITIES_FAILURE,
        payload: error.response,
      });
    }
  };
};

export const updateEmployeeData = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.EDIT_EMPLOYEE_REQUEST,
    });
    try {
      const res = await updateEmployee(values);
      return dispatch({
        type: types.EDIT_EMPLOYEE_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      return dispatch({
        type: types.EDIT_EMPLOYEE_FAILURE,
        payload: error.response,
      });
    }
  };
};

export const employeeTimesheet = (data) => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_EMPLOYEE_TIMESHEET_REQUEST,
    });
    try {
      const res = await getEmployeeTimeSheet(data);
      return dispatch({
        type: types.GET_EMPLOYEE_TIMESHEET_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      return dispatch({
        type: types.GET_EMPLOYEE_TIMESHEET_FAILURE,
        payload: error.response,
      });
    }
  };
};

export const updateEmployeeTimesheet = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.UPDATE_EMPLOYEE_TIMESHEET_REQUEST,
    });
    try {
      const res = await updateTimings(values);
      return dispatch({
        type: types.UPDATE_EMPLOYEE_TIMESHEET_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      return dispatch({
        type: types.UPDATE_EMPLOYEE_TIMESHEET_FAILURE,
        payload: error.response,
      });
    }
  };
};

// add signature
export const addSignature = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.ADD_SIGNATURE_REQUEST,
    });
    try {
      const res = await addAttachments(values);
      return dispatch({
        type: types.ADD_SIGNATURE_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      console.log("errorerrorerror", error);
      return dispatch({
        type: types.ADD_SIGNATURE_FAILURE,
        // payload: error.response,
      });
    }
  };
};

// upload vendor signature
export const uploadSignatureVendor = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.UPLOAD_VENDOR_SIGNATURE_REQUEST,
    });
    try {
      const res = await uploadVendorSignature(values);
      return dispatch({
        type: types.UPLOAD_VENDOR_SIGNATURE_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      console.log("errorerrorerror", error);
      return dispatch({
        type: types.UPLOAD_VENDOR_SIGNATURE_FAILURE,
        payload: error.response,
      });
    }
  };
};

// upload employee signature
export const uploadSignatureEmployee = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.UPLOAD_EMPLOYEE_SIGNATURE_REQUEST,
    });
    try {
      const res = await uploadEmployeeSignature(values);
      return dispatch({
        type: types.UPLOAD_EMPLOYEE_SIGNATURE_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      console.log("errorerrorerror", error);
      return dispatch({
        type: types.UPLOAD_EMPLOYEE_SIGNATURE_FAILURE,
        payload: error.response,
      });
    }
  };
};

export const changeTimeSheetStatus = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.UPDATE_TIMESHEET_STATUS_REQUEST,
    });
    try {
      const res = await updateTimeSheetStatus(values);
      return dispatch({
        type: types.UPDATE_TIMESHEET_STATUS_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      console.log("errorerrorerror", error);
      return dispatch({
        type: types.UPDATE_TIMESHEET_STATUS_FAILURE,
        // payload: error.response,
      });
    }
  };
};
// update milage
export const updateDriverMilage = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.UPDATE_MILAGE_REQUEST,
    });
    try {
      const res = await updateMilage(values);
      return dispatch({
        type: types.UPDATE_MILAGE_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      console.log("errorerrorerror", error);
      return dispatch({
        type: types.UPDATE_MILAGE_FAILURE,
        // payload: error.response,
      });
    }
  };
};
