import {add_Card, fetchService, vender_SignUp} from './index'

export const registerVendor = (values)=>{
  return fetchService({
    method: "POST",
    url: vender_SignUp,
    body: {
      ...values,
      permission : "store_owner"
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const addCardDetails = (values)=>{
  return fetchService({
    method: "POST",
    url: add_Card,
    body: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
}