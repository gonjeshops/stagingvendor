import { fetchService, vendor_Logout } from ".";

export const logout_vendor = (values) => {
  return fetchService({
    method: "POST",
    url: vendor_Logout,
    body: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};
