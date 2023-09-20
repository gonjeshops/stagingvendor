import { fetchService, orderListUrl, orderStatusUrl } from "..";

export const getOrders = (values) => {
  return fetchService({
    method: "GET",
    url: orderListUrl,
    params: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const getSingleOrders = (id) => {
  return fetchService({
    method: "GET",
    url: `${orderListUrl}/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const getOrderStatus = () => {
  return fetchService({
    method: "GET",
    url: `${orderStatusUrl}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const changeOrderStatus = (values) => {
  return fetchService({
    method: "PUT",
    url: `${orderListUrl}/${values.id}`,
    params: {
      status: values.status,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};
