import axios from "axios";
import AppConfig from "../../configs/AppConfig";
import authHeader from "../Api/auth-header";

export default axios.create({
  baseURL: AppConfig.base_url,
  headers: authHeader(),
});
