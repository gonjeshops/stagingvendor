import { fetchService, vendor_Login } from ".";

export const login_vendor = (values)=>{
    return fetchService({
      method: "POST",
      url: vendor_Login,
      body: {
        ...values,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }