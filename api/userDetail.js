import { dashboard, fetchService, userDetailUrl } from ".";

export const userDetail = () => {
  return fetchService({
    method: "GET",
    url: userDetailUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const userDashboard = (values) => {
  return fetchService({
    method: "GET",
    url: dashboard,
    params: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};
