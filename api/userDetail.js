

import authHeader from "@/componentsB2b/Api/auth-header";
import { dashboard, fetchService, userDetailUrl } from ".";

export const userDetail = () => {
  return fetchService({
    method: "GET",
    url: userDetailUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
  });
};

export const updateUserDetail = (body) => {
  return fetchService({
    method: "PUT",
    url: userDetailUrl,
    body: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
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
      Authorization: authHeader(),
    },
  });
};
