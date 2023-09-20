import { types } from "../types/employee";

export const employeeReducer = (state = {}, { type, payload }) => {
  switch (type) {
    //
    // GET EMployee List
    //
    case types.GET_EMPLOYEES_REQUEST:
      return {
        ...state,
      };
    case types.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employeeList: payload?.data,
      };

    case types.GET_EMPLOYEES_FAILURE:
      return {
        ...state,
      };

    //
    // GET Employee timesheet
    //
    case types.GET_EMPLOYEE_TIMESHEET_REQUEST:
      return {
        ...state,
      };
    case types.GET_EMPLOYEE_TIMESHEET_SUCCESS:
      return {
        ...state,
        timesheetData: payload.data,
      };

    //
    // update Employee timesheet
    //
    case types.UPDATE_EMPLOYEE_TIMESHEET_REQUEST:
      return {
        ...state,
      };
    case types.UPDATE_EMPLOYEE_TIMESHEET_SUCCESS:
      return {
        ...state,
        // timesheetData: payload.data,
      };

    case types.UPDATE_EMPLOYEE_TIMESHEET_FAILURE:
      return {
        ...state,
      };

    //
    // update  timesheet status
    //
    case types.UPDATE_TIMESHEET_STATUS_REQUEST:
      return {
        ...state,
      };
    case types.UPDATE_TIMESHEET_STATUS_SUCCESS:
      return {
        ...state,
      };

    case types.UPDATE_TIMESHEET_STATUS_FAILURE:
      return {
        ...state,
      };

    //
    // update  milage
    //
    case types.UPDATE_MILAGE_REQUEST:
      return {
        ...state,
      };
    case types.UPDATE_MILAGE_SUCCESS:
      return {
        ...state,
      };

    case types.UPDATE_MILAGE_FAILURE:
      return {
        ...state,
      };

    //
    // change employee status
    //
    case types.CHANGE_EMPLOYEE_STATUS_REQUEST:
      return {
        ...state,
      };
    case types.CHANGE_EMPLOYEE_STATUS_SUCCESS:
      return {
        ...state,
        // employeeList: payload.data,
      };

    case types.CHANGE_EMPLOYEE_STATUS_FAILURE:
      return {
        ...state,
      };

    //
    // delete employee
    //
    case types.DELETE_EMPLOYEE_REQUEST:
      return {
        ...state,
      };
    case types.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
      };

    case types.DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
      };

    //
    // add employee
    //
    case types.ADD_EMPLOYEE_REQUEST:
      return {
        ...state,
      };
    case types.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
      };

    case types.ADD_EMPLOYEE_FAILURE:
      return {
        ...state,
      };

    //
    // add vendor signature
    //
    case types.ADD_SIGNATURE_REQUEST:
      return {
        ...state,
      };
    case types.ADD_SIGNATURE_SUCCESS:
      return {
        ...state,
      };

    case types.ADD_SIGNATURE_FAILURE:
      return {
        ...state,
      };

    //
    // upload vendor signature
    //
    case types.UPLOAD_VENDOR_SIGNATURE_REQUEST:
      return {
        ...state,
      };
    case types.UPLOAD_VENDOR_SIGNATURE_SUCCESS:
      return {
        ...state,
      };

    case types.UPLOAD_VENDOR_SIGNATURE_FAILURE:
      return {
        ...state,
      };

    //
    // upload employee signature
    //
    case types.UPLOAD_EMPLOYEE_SIGNATURE_REQUEST:
      return {
        ...state,
      };
    case types.UPLOAD_EMPLOYEE_SIGNATURE_SUCCESS:
      return {
        ...state,
      };

    case types.UPLOAD_EMPLOYEE_SIGNATURE_FAILURE:
      return {
        ...state,
      };

    //
    // get single employee
    //
    case types.GET_EMPLOYEE_REQUEST:
      return {
        ...state,
      };
    case types.GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
      };

    case types.GET_EMPLOYEE_FAILURE:
      return {
        ...state,
      };

    //
    // edit single employee
    //
    case types.EDIT_EMPLOYEE_REQUEST:
      return {
        ...state,
      };
    case types.EDIT_EMPLOYEE_SUCCESS:
      return {
        ...state,
      };

    case types.EDIT_EMPLOYEE_FAILURE:
      return {
        ...state,
      };

    //
    //  get activities
    //
    case types.GET_ACTIVITIES_REQUEST:
      return {
        ...state,
      };
    case types.GET_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activities: payload.data.data,
      };

    case types.GET_ACTIVITIES_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};
