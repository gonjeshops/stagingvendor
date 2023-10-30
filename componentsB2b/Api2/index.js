import axios from "axios";
import authHeader from "../Api/auth-header";

let url = "https://backendapi.gonje.com/";

// Function to fetch suppliers with authentication headers
export const fetchSuppliersByPagination = (page, limit) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `suppliers/shops?page=${page}&limit=${limit}`,
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
        return error;
      });
  };

// Get Vendor quote requets with "PENDING" status. Only vendors can view
export const fetchQuotesWithPendingStatus = (page, limit) => {
  if (!page || !limit) {
    return Promise.reject(new Error("Invalid input data."));
  }
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `vendor/quotes?page=${page}&limit=${limit}`,
    })
      .then((response) =>  response)
      .catch((error) => {
        console.log("Error in fetchQuotesWithPendingStatus api", error);
        return error
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
        return error
      });
  };


  export const fetchSupplierQuoteDetails = (quoteId) => {
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `supplier/quote/${quoteId}`,
     
    })
      .then((response) => response)
      .catch((error) => {
        console.log("Error in fetchSupplierQuoteDetails api", error);
        return error
      });
  };



// Get quote request from vendors with "SENT" status  supplier/quotes
export const fetchQuotesWIthSentStatus = (page, limit) => {
  console.log('=====', page, limit)
  if (!page || !limit) {
    return Promise.reject(new Error("Invalid input data."));
  }
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `supplier/quotes?page=${page}&limit=${limit}`,
    })
      .then((response) => response)
      .catch((error) => {
        console.log("Error in fetchQuotesWIthSentStatus api", error)
        return error;
      });
  };

// Create quote request
export const createQuoteRequest = (values, method) => {
  console.log('values===', values)
    return axios({
      method: "post",
      headers: authHeader(),
      url: url + `create/quote/request`,
      data: {
        cart_items: values.cart,
        quote_name: values.quoteName,
        // subtotal: values.subtotalPrice,
        // quantity: values.totalquantity,
        // shop_name: values.shopName,
        // user_id: values.userId
      },
    })
      .then((response) => response)
      .catch((error) => {
        console.log("Error in createQuoteRequest api", error);
      });
    return values
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


//  ============= INVOICE ============
// Create quote request
export const fetchVendorInvoice = (page, limit) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `my/transactions?page=${page}&limit=${limit}`,
    // url: url + `my/transactions?page=${page}&limit=${limit}`,
  })
    .then((response) => response)
    .catch((error) => {
      console.log("Error in fetchVendorInvoice api", error, page, limit);
    });
};



// ======= // getNotification?limit=15 =====
export const fetchNotifications = (page, limit) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `my/notifications?page=${page}&limit=${limit}`,
    // url: url + `getNotification?limit=${limit}`,
  })
    .then((response) => {
      console.log('notification =====', response)
      return response})
    .catch((error) => {
      console.log("Error in fetchNotifications api", error,  limit);
    });
};
export const fetchNotificationDropdown = (limit) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `my/notifications?limit=${limit}`,
    // url: url + `getNotification?limit=${limit}`,
  })
    .then((response) => {
      console.log('notification =====', response)
      return response})
    .catch((error) => {
      console.log("Error in fetchNotifications api", error,  limit);
    });
};

// Add products
export const  createProduct = (values) => {
  // Validate inputs
  if (!values) {
    console.log('=======', values)
    return Promise.reject(new Error("Invalid input data."));
  }

  return axios({
    method: "post",
    headers: authHeader(),
    url: url + `add/supplier/product`,
    data: {
      name: values.name,
      slug: values.slug,
      description: values.description,
      category: values.category,
      price: values.price,
      shop_id: values.shop_id,
      sale_price: values.sale_price,
      sku: values.sku,
      quantity: values.quantity,
      // shipping_class_id: 1,
      status: values.status,
      product_type: values.product_type,
      unit: values.unit,
      // currency: "",
      height: values.height,
      width: values.width,
      length: values.length,
      image: values.image,
      gallery: values.gallery,
      max_price: values.max_price,
      min_price: values.min_price,
      nutritional_info: values.nutritional_info,
    },
  })
    .then((response) => {
      console.log("createProduct API successful:", response);
      return response
    })
    .catch((error) => {
      console.error("Error in createProduct API:", error);
      return Promise.reject(error); 
    });
};

// update/supplier/product/
// Add products
export const  updateProduct = (values) => {
  // Validate inputs
  if (!values) {
    console.log('=======', values)
    return Promise.reject(new Error("Invalid input data."));
  }

  return axios({
    method: "put",
    headers: authHeader(),
    url: url + `add/supplier/product`,
    data: {
      name: values.name,
      slug: values.slug,
      description: values.description,
      category: values.category,
      price: values.price,
      shop_id: values.shop_id,
      sale_price: values.sale_price,
      sku: values.sku,
      quantity: values.quantity,
      // shipping_class_id: 1,
      status: values.status,
      product_type: values.product_type,
      unit: values.unit,
      // currency: "",
      height: values.height,
      width: values.width,
      length: values.length,
      image: values.image,
      gallery: values.gallery,
      max_price: values.max_price,
      min_price: values.min_price,
      nutritional_info: values.nutritional_info,
    },
  })
    .then((response) => {
      console.log("updateProduct API successful:", response);
      return response
    })
    .catch((error) => {
      console.error("Error in updateProduct API:", error);
      return Promise.reject(error); 
    });
};


