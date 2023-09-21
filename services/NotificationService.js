import axios from "axios";
import authHeader from "../components/Api/auth-header";
import AppConfig from "../configs/AppConfig";
let url = AppConfig.base_url;
export const getAllNotofications = ({ page }) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `getNotification?page=${page}`,
  });
};

export const updateNotification = () => {
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + `updateNotificationStatus`,
  });
};
