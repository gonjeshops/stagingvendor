// import AppConfig from "../../configs/AppConfig";
import authHeader from "./auth-header";
import axios from "axios";
// let url = AppConfig.base_url;
// let url = "https://gonje.iapplabz.co.in/api";
let url = "https://backendapi.gonje.com/"

export const verifyPostCode = (values) => {
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + "zip",
    data: {
      code: values.postcode,
      email: values.email,
    },
  })
    .then((response) => response)
    .catch((error) => {
      console.log("error in api", error);
    });
};
export const register = (values) => {
  // console.log('API VALUES', values)
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + "register",
    data: {
      ...values
    },
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log("error in api", error);
      return error.response.data;
    });
};

export const login = (values) => {
  // debugger
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + "token",
    data: {
      email: values.email,
      password: values.password,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log("error in api", error);
    });
};

export const newsletter = (values) => {
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + "newsletter",
    data: {
      email: values.email,
      code: values.postcode,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log("error in api", error);
    });
};

export const contactUs = (values) => {
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + "contactUs",
    data: {
      ...values,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log("contactUs api error", error);
    });
};
export const saveCard = (values) => {
  const user_detail = localStorage.getItem("user_detail");
  const user_detail_obj = JSON.parse(user_detail);
  var data = new FormData();

  data.append("type", values.type);
  data.append("card", values.card);
  data.append("cvv", values.cvv);
  data.append("zip", values.zipcode);
  data.append("customer_id", user_detail_obj.user_id);
  return fetch(url + "registercard/", {
    method: "post",
    body: data,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("error in api", error);
    });
};

export const phonenumberLogin = (values) => {
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + "send-otp-code",
    data: {
      phone_number: values,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log("error in api", error);
    });
};

// TODO: confirm location of "opt_verify"
export const verifyOtp = (values) => {
  const opt_verify = localStorage.getItem("opt_verify");
  const opt_verify_obj = JSON.parse(opt_verify);
  const user_detail = localStorage.getItem("user_detail");
  const user_detail_obj = JSON.parse(user_detail);
  var data = new FormData();
  const code =
    values.first +
    values.second +
    values.third +
    values.fourth +
    values.fifth +
    values.sixth;
  data.append("otp_id", opt_verify_obj.id);
  data.append("phone_number", opt_verify_obj.phone_number);
  data.append("code", code);
  console.log("data to verify=", data);

  if (!user_detail_obj) {
    return fetch(url + "otp-login/", {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("error in api", error);
      });
  } else {
    data.append("user_id", user_detail_obj.user_id);
    return fetch(url + "update-contact/", {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("error in api", error);
      });
  }
};

export const ShippingAddress = (values) => {
  const user_detail = localStorage.getItem("user_detail");
  const user_detail_obj = JSON.parse(user_detail);
  localStorage.setItem("user_detail_postcode", values.postcode);
  const requestData = {
    customer_id: user_detail_obj.user_id,
    type: "shipping",
    address: {
      city: values.city || "",
      state: values.province || "",
      phone: values.phonenumber || "",
      apt: values.apt || "",
      address: values.address || "",
      postcode: values.postcode || "",
    },
    latitude: values.latitude,
    longitude: values.longitude,
  };
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + "storeaddress",
    data: requestData,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log("error in api", error);
    });
};
export const facebooklogin = (values) => {
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + "social-login-token",
    data: {
      provider: "facebook",
      access_token: values.accessToken,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log("error in api", error);
    });
};
export const googlelogin = (values) => {
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + "social-login-token",
    data: {
      provider: "google",
      access_token: values.accessToken,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log("error in api", error);
    });
};

export const shoplist = () => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + "all-shop",
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log("error in api", error);
    });
};

export const fetchProductWithInCategory = () => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + "fetchProductWithCategory?limit=10&shop_id=6",
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log("error in api", error);
    });
};
export const fetchDeliveryData = (data) => {
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + "deliveryDate",
    data: {
      ...data,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log("error in api", error);
    });
};

export const addCard = (values) => {
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + "addCard",
    data: {
      source_id: values,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      return error.response.data;
      console.log("error in api", error);
    });
};

export const addSubscription = async (values) => {
  // console.log(values)
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + "userSubscription",
    data: {
      source: values.source,
      amount: values.amount,
      currency: values.currency,
      customerStripeId: values.customerStripeId,
      paymentGateway: values.paymentGateway,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log("error in api", error);
    });
};

export const addMoneyToWal = async (values) => {
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + "add-money-to-wallet",
    data: {
      ...values,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      return error.response.data;
      console.log("error in api", error);
    });
};

export const zipPayCheckout = async (id) => {
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + `zipPayCheckoutDetails/${id}`,
  })
    .then((response) => response.data)
    .catch((error) => {
      return error.response.data;
      console.log("error in api", error);
    });
};



