import {
  fetchService,
  employeeListUrl,
  changeEmployeeStatusUrl,
  deleteEmployeeUrl,
  addEmployeeUrl,
  activitiesUrl,
  getSingleEmplyeeUrl,
  updateEmplyeeUrl,
  employeeTimeSheetUrl,
  updateEmployeeTimings,
  uploadVendorSignatureUrl,
  updateTimeSheetStatusUrl,
  uploadEmployeeSignatureUrl,
  updateMilageUrl,
} from "../..";

export const getEmployeeList = (values) => {
  return fetchService({
    method: "GET",
    url: employeeListUrl,
    params: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const changeEmployeeStatus = (emp_id) => {
  return fetchService({
    method: "POST",
    url: `${changeEmployeeStatusUrl}/${emp_id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const addEmployee = (values) => {
  return fetchService({
    method: "POST",
    url: `${addEmployeeUrl}`,
    body: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const deleteEmployee = (id) => {
  return fetchService({
    method: "POST",
    url: `${deleteEmployeeUrl}`,
    params: {
      id,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const getActivities = (values) => {
  return fetchService({
    method: "GET",
    url: `${activitiesUrl}`,
    params: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const getEmployee = (id) => {
  return fetchService({
    method: "GET",
    url: `${getSingleEmplyeeUrl}/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const updateEmployee = (values) => {
  return fetchService({
    method: "PUT",
    url: `${updateEmplyeeUrl}/${values.id}`,
    body: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

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

export const updateTimings = (values) => {
  return fetchService({
    method: "POST",
    url: updateEmployeeTimings,
    body: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const uploadVendorSignature = (values) => {
  return fetchService({
    method: "POST",
    url: uploadVendorSignatureUrl,
    body: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const uploadEmployeeSignature = (values) => {
  return fetchService({
    method: "POST",
    url: uploadEmployeeSignatureUrl,
    body: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const updateTimeSheetStatus = (values) => {
  return fetchService({
    method: "POST",
    url: updateTimeSheetStatusUrl,
    body: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const updateMilage = (values) => {
  return fetchService({
    method: "POST",
    url: updateMilageUrl,
    body: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};
