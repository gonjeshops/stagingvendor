import { contractListUrl, fetchService, signContractUrl } from ".";

export const contractList = () => {
  return fetchService({
    method: "GET",
    url: contractListUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export const signContract = (values) => {
  return fetchService({
    method: "POST",
    url: signContractUrl,
    body: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};
