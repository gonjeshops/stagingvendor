import axios from "axios";
import authHeader from "../Api/auth-header";

let url = "https://backendapi.gonje.com/";

// Function to fetch suppliers with authentication headers
export const fetchSuppliersByPagination = (page, limit) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + "suppliers/shops",
    data: {
      page: 2,
      limit: 4,
    },
  })
    .then((response) =>{ 
      console.log('API SHOPS====', response)
      return response})
    .catch((error) => {
      console.log("Error in fetchSuppliersByPagination api", error);
    });
};



// View a supplier shop's products.  usage - /suppliers/[supplierId]
export const viewSupplierShopProducts = (userId, shopId) => {

    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `suppliers/${userId}/shop/${shopId}/products`,
    })
      .then((response) => { 
        console.log('API SHOP DETAILS====', response)
        return response})
      .catch((error) => {
        console.log("Error in viewSupplierShopProducts api", error);
      });
  };


// View Supplier Product Details
export const viewSupplierShopProductDetails = (userId, productId, shopId) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `suppliers/${userId}/${shopId}/product/${productId}`,
  })
    .then((response) => { 
      console.log('API PRODUCT DETAILS===', response,  'id=====', userId, shopId, productId)
      return response})
    .catch((error) => {
      console.log("Error in viewSupplierShopProducts api", error, 'id=====', userId, productId, shopId);
    });
};


  
// View supplier products
export const viewSupplierProducts = (userId) => {
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `supplier/${userId}/products`,

    })
      .then((response) => response)
      .catch((error) => {
        console.log("Error in viewSupplierProducts api", error);
      });
  };
  


// ========= Quotes ===============

// Get list of quote names for user to select existing quote or create new one. 
// usage: /create quote modal.
export const fetchQuoteNames = () => {
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + "quotnames/list",

    })
      .then((response) => response)
      .catch((error) => {
        console.log("Error in fetchQuoteNames api", error);
      });
  };

// Get Vendor quote requets with "PENDING" status. Only vendors can view
export const fetchQuotesWithPendingStatus = (page, limit) => {
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + "vendor/quotes",
      data: {
        page: page,
        limit: limit
      }
    })
      .then((response) => response)
      .catch((error) => {
        console.log("Error in fetchQuotesWithPendingStatus api", error);
      });
  };

// Get Vendor quote details
export const fetchQuoteDetails = (quoteId) => {
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `vendor/quote/${quoteId}`,
     
    })
      .then((response) => response)
      .catch((error) => {
        console.log("Error in fetchQuoteDetails api", error);
      });
  };

// Get quote request from vendors with "SENT" status
export const fetchQuotesWIthSentStatus = () => {
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `supplier/quotes`,

    })
      .then((response) => response)
      .catch((error) => {
        console.log("Error in fetchQuotesWIthSentStatus api", error);
      });
  };

// Create quote request
export const createQuoteRequest = (values) => {
    return axios({
      method: "post",
      headers: authHeader(),
      url: url + `create/quote/request`,
      data: {
        product_id: values.productId,
        quote_name: values.name,
        unit: values.unit,
        quantity: values.quantity,
        user_id: values.userId
      },
    })
      .then((response) => response)
      .catch((error) => {
        console.log("Error in createQuoteRequest api", error, values);
      });
  };

  // Update quote request
export const updateQuoteRequest = (values, quoteId) => {
  // Validate inputs
  if (!values || !quoteId) {
    return Promise.reject(new Error("Invalid input data."));
  }

  return axios({
    method: "put",
    headers: authHeader(),
    url: url + `update/quote/request/${quoteId}`,
    data: {
      status: values.status,
      quantity: values.quantity,
      reason: values.reason,
    },
  })
    .then((response) => {
      console.log("UpdateQuoteRequest API successful:", response);
      return response
    })
    .catch((error) => {
      console.error("Error in UpdateQuoteRequest API:", error);
      return Promise.reject(error); // Propagate the error.
    });
};

