import { validateEmail } from "../../../../../utils";
import moment from "moment";
export const validateEmployeeFields = (data) => {
  var error = "";
  Object.keys(data).forEach((el) => {
    if (!data[el]) {
      error = "All fields are required.";
    }
  });
  if (data.bank_details) {
    const fields = data.bank_details;
    Object.keys(fields).forEach((el) => {
      if (!fields[el]) {
        error = "All fields are required.";
      }
    });
  }
  if (data.address.address) {
    const fields = data.address.address;
    Object.keys(fields).forEach((el) => {
      if (!fields[el]) {
        error = "All fields are required.";
      }
    });
  }
  if (!error) {
    if (data.email) {
      error = validateEmail(data.email);
    }
    if (data?.password?.length < 6) {
      error = "Password should be greater than or equal 6 characters";
    }
    if (data.shift_timings) {
      const beginningTime = moment(data.shift_timings.from, "h:mma");
      const endTime = moment(data.shift_timings.to, "h:mma");
      error = beginningTime.isBefore(endTime) ? error : "Wrong timings";
    }
  }
  return error;
};
