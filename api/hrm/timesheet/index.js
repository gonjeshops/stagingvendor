import { employeeTimeSheetUrl, fetchService } from "../..";

export const getEmployeeTimeSheet = (values) => {
  return fetchService({
    method: "GET",
    url: employeeTimeSheetUrl,
    params: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};
