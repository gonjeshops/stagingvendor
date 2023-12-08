import axios from "axios";

let baseURL = "https://backendapi.gonje.com/";

export const fetcher = (url) => {
  return axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
    url: baseURL + url,
  }).then((response) => response.data);
};
