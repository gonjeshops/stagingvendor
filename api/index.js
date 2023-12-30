import authHeader from "@/componentsB2b/Api/auth-header";
import axios from "axios";

// const baseUrl =  process.env.GONJE_APP_BASE_URL
const baseUrl = "https://backendapi.gonje.com/";
// const baseUrl = "https://gonje.iapplabz.co.in/api/";
export const GOOGLE_MAP_KEY =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyCxMO0g5Vv0ZtSthhrrXMVOYVBcjf4G1hw";
// const baseUrl = "http://192.168.1.71:8000/";
export const vender_SignUp = baseUrl + "register";
export const add_Card = baseUrl + "addCard";
export const vendor_Login = baseUrl + "token";
export const vendor_Logout = baseUrl + "logout";
export const inventory_List = baseUrl + "products";
export const inventory_groupList = baseUrl + "types";
export const inventory_CategoryList = baseUrl + "categories";
export const attributes = baseUrl + "attributes";
export const attachments = baseUrl + "attachments";
export const addProductUrl = baseUrl + "products";
export const employeeListUrl = baseUrl + "staffs";
export const changeEmployeeStatusUrl = baseUrl + "users/staff-change-status";
export const deleteEmployeeUrl = baseUrl + "users/remove-staff";
export const addEmployeeUrl = baseUrl + "users/add-staff";
export const activitiesUrl = baseUrl + "activities";
export const getSingleEmplyeeUrl = baseUrl + "get-staff";
export const updateEmplyeeUrl = baseUrl + "users/update-staff";
export const employeeTimeSheetUrl = baseUrl + "timeSheet";
export const updateEmployeeTimings = baseUrl + "updateTime";
export const uploadVendorSignatureUrl = baseUrl + "uploadSignatureVendor";
export const uploadEmployeeSignatureUrl = baseUrl + "uploadSignature";
export const updateTimeSheetStatusUrl = baseUrl + "updateTimeSheetStatus";
export const updateMilageUrl = baseUrl + "updateMilage";
//orders api url
export const orderListUrl = baseUrl + "orders";
export const orderStatusUrl = baseUrl + "order_status";

// contract
export const contractListUrl = baseUrl + "display-contract";
export const signContractUrl = baseUrl + "signContract";
// user detail
export const userDetailUrl = baseUrl + "me";
// dashboard
export const dashboard = baseUrl + "vendorDashboard";

export const fetchService = async ({ method, url, body, headers, params }) =>
  await axios({
    url: url,
    method,
    params,
    // headers: { "Content-Type": "application/json", ...headers },
    headers: authHeader(),
    data: body,
  })
    .then((response) => {
      console.log('=api response=',response)
      if (response.status && response.status === 200) {
        return response;
      }
      throw response;
    })
    .catch((error) => {
      console.log("@fetchService error =>", { url, error }, 'values==', body);
      throw error;
    });
