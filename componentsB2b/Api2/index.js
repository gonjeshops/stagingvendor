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



export const uploadImagesFetch = (formData) => {
  return fetch(`${url}attachments`, {
    method: 'POST',
    body: formData,
    headers: authHeader()
  })
    .then(response => {
      if (!response.ok) {
        return response.clone().json().catch(() => {
          return response.clone().text().then(nonJSONResponse => {
            const error = new Error(`Network response was not ok. Status: ${response.status}. Non-JSON response received. Response body: ${nonJSONResponse}`);
            error.status = response.status;
            error.response = nonJSONResponse;
            throw error;
          });
        });
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        const error = new Error('Unexpected response type');
        error.status = response.status;
        throw error;
      }
    })
    .then(data => {
      console.log('API call successful:', data);
      return data; 
    })
    .catch(error => {
      console.error('Fetch error:', error);
      return Promise.reject(error); 
    });
}


export const viewSupplierShopProducts = async (userId, shopId, page, limit) => {
  try {
    // Validate inputs
    if (!userId || !shopId || !page || !limit) {
      console.error('Invalid input data. Please provide valid userId, shopId, page, and limit.');
      return Promise.reject(new Error('Invalid input data.'));
    }

    const response = await axios({
      method: 'get',
      headers: authHeader(),
      url: `${url}suppliers/${userId}/shop/${shopId}/products?page=${page}&limit=${limit}`,
    });

    if (response?.status === 200) {
      console.log("API Similar products response:", response?.data?.data?.products);
      return response;
    } else {
      console.error("API Error: Something went wrong.", response);
      throw new Error(`Something went wrong. Server responded with ${response?.status}`);
    }
  } catch (error) {
    console.error('Error in viewSupplierShopProducts API:', error);

    // Handle specific axios errors
    if (axios.isAxiosError(error)) {
      // Handle different axios error statuses
      if (error.response) {
        console.error('Server responded with:', error.response.status, error.response.data, '==', userId, '==', shopId);
        return Promise.reject(new Error(`Server responded with ${error.response.status}: ${error.response.data}`));
      } else if (error.request) {
        console.error('No response received from the server.');
        return Promise.reject(new Error('No response received from the server.'));
      } else {
        console.error('Error setting up the request:', error.message);
        return Promise.reject(new Error(`Error setting up the request: ${error.message}`));
      }
    }

    return Promise.reject(new Error('An unexpected error occurred.'));
  }
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
export const createQuoteRequest = (values, ) => {
  console.log('values===', values)
    return axios({
      method: "post",
      headers: authHeader(),
      url: url + `create/quote/request`,
      data: {
        "cart_items": values.cart_items,
        "quote_name": values.quote_name,
        "subtotal": values.subtotal,
        "quantity": values.quantity,
        "shop_name": values.shop_name,
        "user_name": values.user_name,
        "user_id": values.user_id,
      },
    })
      .then((response) => {
        console.log("createQuoteRequest api response", response,values);
      return response})
      .catch((error) => {
        console.log("Error in createQuoteRequest api", error, values, );
        return error
        
      });
  };

  // Create quote request with SEND status
export const createQuoteWithSendStatus = (values, ) => {
  try {
    // Validate inputs
    if (!values) {
      console.error('Invalid input data. Please provide valid values.');
      return Promise.reject(new Error('Invalid input data.'));
    }

    return axios({
      method: "post",
      headers: authHeader(),
      url: url + `send/quote/request`,
      data: {
        "cart_items": values.cart_items,
        "quote_name": values.quote_name,
        "subtotal": values.subtotal,
        "quantity": values.quantity,
        "shop_name": values.shop_name,
        "user_name": values.user_name,
        "user_id": values.user_id,
      },
    })
    .then((response) => {
      console.log('createQuoteWithSendStatus API successful:', response);
      return response;
    })
    .catch((error) => {
      console.error('Error in createQuoteWithSendStatus API:', error, '====values====', values);
      return error.response?.data || error.message || 'An unexpected error occurred.';
    });
} catch (error) {
  console.error('An unexpected error occurred:', error);
  throw 'An unexpected error occurred.';
}
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
      "status": values?.status,
      "reason": values?.reason,
      "cart_items": values?.cart_items,
      "quote_name": values?.quote_name,
      "subtotal": values?.subtotal,
      "quantity": values?.quantity,
      "shop_name": values?.shop_name,
      "user_name": values?.user_name,
      "user_id": values?.user_id,
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
  })
    .then((response) => response)
    .catch((error) => {
      console.log("Error in fetchVendorInvoice api", error, page, limit);
    });
};

// ======= // getNotification?limit=15 =====
export const fetchNotifications = (limit, page) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `my/notifications?limit=${limit}&page=${page}`,
    // url: url + `getNotification?limit=${limit}`,
  })
    .then((response) => {
      console.log('VENDOR notification =====', response, 'params===', limit, page)
      return response})
    .catch((error) => {
      console.log("VENDOR Error in fetchNotifications api", error,  'params==', limit, page);
    });
};

// =======  dashboard stats =====
export const fetchCounts = (type) => {

if (type===`vendor/my/stats`) {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `vendor/my/stats`,
  })
    .then((response) => {
      console.log('VENDOR dashboard stats =====', response, 'type==', type)
      return response})
    .catch((error) => {
      console.log("VENDOR Error in dashboard stats api", error,  'type==', type);
    });
}


// Not in use
  if (type===`vendor/quotes/count`) {
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `vendor/quotes/count`,
    })
      .then((response) => {
        console.log('VENDOR quote counts =====', response, 'type==', type)
        return response})
      .catch((error) => {
        console.log("VENDOR Error in vendor/quotes/count api", error,  'type==', type);
      });
  }

  if (type===`vendor/b2b/my/total/orders`) {
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `vendor/b2b/my/total/orders`,
    })
      .then((response) => {
        console.log('VENDOR orders counts =====', response, 'type==', type)
        return response})
      .catch((error) => {
        console.log("VENDOR Error in orders counts api", error,  'type==', type);
      });
  }

  if (type===`supplier/quotes/count`) {
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `supplier/quotes/count`,
    })
      .then((response) => {
        console.log('SUPPLIER quote counts =====', response, 'type==', type)
        return response})
      .catch((error) => {
        console.log("SUPPLIER Error in quotes counts api", error,  'type==', type);
      });
  }

  if (type===`supplier/product/total`) {
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `supplier/product/total`,
    })
      .then((response) => {
        console.log('SUPPLIER product counts =====', response, 'type==', type)
        return response})
      .catch((error) => {
        console.log("SUPPLIER Error in product counts api", error,  'type==', type);
      });
  }

  if (type===`supplier/shop/total`) {
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `supplier/shop/total`,
    })
      .then((response) => {
        console.log('SUPPLIER shop counts =====', response, 'type==', type)
        return response})
      .catch((error) => {
        console.log("SUPPLIER Error in shop counts api", error,  'type==', type);
      });
  }

  if (type===`transaction/total`) {
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `transaction/total`,
    })
      .then((response) => {
        console.log(' transaction counts =====', response, 'type==', type)
        return response})
      .catch((error) => {
        console.log(" Error in transaction counts api", error,  'type==', type);
      });
  }

  if (type===`wishlist/total`) {
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `wishlist/total`,
    })
      .then((response) => {
        console.log(' wishlist counts =====', response, 'type==', type)
        return response})
      .catch((error) => {
        console.log(" Error in wishlist counts api", error,  'type==', type);
      });
  }

};

  
// orders
// /vendor/b2b/my/orders
export const fetchOrders = (page, limit) => {
  try {
    // Validate inputs
    if (!page || !limit) {
      console.error('Invalid input data. Please provide valid values and productId.');
      return Promise.reject(new Error('Invalid input data.'));
    }
    
    return axios({
      method: 'get',
      headers: authHeader(),
      url: `${url}vendor/quotes?page=${page}&limit=${limit}`,
      // url: `${url}vendor/b2b/my/orders?page=${page}&limit=${limit}`,
    })
    .then((response) => {
      console.log('fetchOrders API successful:', response);
      return response;
    })
    .catch((error) => {
      console.error('Error in fetchOrders API:', error);
        // Handle specific axios errors
        if (axios.isAxiosError(error)) {
          // Handle different axios error statuses
          if (error.response) {
            console.error('Server responded with:', error.response.status, error.response.data);
          } else if (error.request) {
            console.error('No response received from the server.');
          } else {
            console.error('Error setting up the request:', error.message);
          }
          return Promise.reject(error);
        }
      return error.response?.data || error.message || 'An unexpected error occurred. ';
  
    });
  } catch (error) {
    console.error('An unexpected error occurred: catch', error);
    return Promise.reject(error);
  }
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


// Products catalogu
export const fetchProductsCatalogue = (page, limit) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `view/products/catalogue?page=${page}&limit=${limit}`,
  })
    .then((response) =>{ 
      console.log('API fetchProductsCatalogue====', response)
      return response})
    .catch((error) => {
      console.log("Error in fetchProductsCatalogue api", error);
    });
};



// ==========B2C============
export const fetchAccounting = (page, limit, search) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `my/transactions?page=${page}&limit=${limit}&search=${search}`,
  })
    .then((response) =>{ 
      console.log('API fetchAccounting response', response)
      return response})
    .catch((error) => {
      console.log("Error in fetchAccounting api", error);
    });
};


export const fetchProducts = ( page, limit, search) => {
  // Validate inputs
  // if (!search || !values || !quoteId) {
  //   return Promise.reject(new Error("Invalid input data."));
  // }
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `view/vendor/products?page=${page}&limit=${limit}&search=${search}`,
  })
    .then((response) =>{ 
      console.log('API fetchProducts response', response, search, page, limit)
      return response})
    .catch((error) => {
      console.log("Error in fetchProducts api", error, '==',  search, page, limit);
    });
};


// The ones are for the recieved request
//GET - https://backendapi.gonje.com/vendor/b2c/quote/{quoteId}
// GET -https://backendapi.gonje.com/vendor/b2c/quotes

// this one is for the invoice table
// GET -  https://backendapi.gonje.com/supplier/b2c/quotes
// GET - https://backendapi.gonje.com/supplier/b2c/quote/{quoteId}

// this one is for the request modal in the expense page
// PUT - https://backendapi.gonje.com/update/b2c/quote/request/{quoteId}
// POST - https://backendapi.gonje.com/create/b2c/quote/request 


// search products
// https://backendapi.gonje.com/view/vendor/products?search=ap

// Create quote request as PENDING
export const createB2cQuoteRequest = (values, ) => {
  console.log('values===', values)
    return axios({
      method: "post",
      headers: authHeader(),
      url: url + `create/b2c/quote/request`,
      data: {
        "cart_items": values?.cart_items,
        "quote_name": values?.quote_name,
        "subtotal": values.subtotal,
        "quantity": values?.quantity,
        "shop_name": values?.shop_name,
        "user_name": values?.user_name,
        "user_id": values?.user_id,
        "status": values?.status,
      },
    })
      .then((response) => {
        console.log("createB2cQuoteRequest api response", response,values);
      return response})
      .catch((error) => {
        console.log("Error in createB2cQuoteRequest api", error, values, );
        return error
      });
  }

  // http://backendapi.gonje.com/send/b2c/quote/request
  export const SendB2cQuoteRequest = (values, ) => {
    console.log('values===', values)
      return axios({
        method: "post",
        headers: authHeader(),
        url: url + `send/b2c/quote/request`,
        data: {
          "cart_items": values?.cart_items,
          "quote_name": values?.quote_name,
          "subtotal": values.subtotal,
          "quantity": values?.quantity,
          "shop_name": values?.shop_name,
          "user_name": values?.user_name,
          "user_id": values?.user_id,
        },
      })
        .then((response) => {
          console.log("SendB2cQuoteRequest api response", response,values);
        return response})
        .catch((error) => {
          console.log("Error in SendB2cQuoteRequest api", error, values, );
          return error
        });
    }

// fetch received quotes for b2c vendor/b2c/quotes
// https://backendapi.gonje.com/supplier/vendor/b2c/quote/{quoteId} - GET
export const fetchB2cSentQuotes = (page, limit, search) => {
  // if (!page || !limit) {
  //   return Promise.reject(new Error("Invalid input data."));
  // }
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `vendor/b2c/quotes?page=${page}&limit=${limit}&search=${search}`,
    })
    .then((response) => {
      console.log("fetchB2cSentQuotes api response", response, page, limit );
    return response})
      .catch((error) => {
        console.log("Error in fetchB2cSentQuotes api", error, page, limit);
        return error
      });
  };

// https://backendapi.gonje.com/vendor/b2c/quote/{quoteId}
export const fetchB2CQuoteDetails = (quoteId) => {
  if (!quoteId) {
    return Promise.reject(new Error("Invalid input data."));
  }
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `supplier/b2c/quote/${quoteId}`,
    })
    .then((response) => {
      console.log("fetchB2CQuoteDetails api response", response,  );
    return response})
      .catch((error) => {
        console.log("Error in fetchB2CQuoteDetails api", error,);
        return error
      });
  };

  // fetch sent quotes for b2c supplier/b2c/quotes
// https://backendapi.gonje.com/vendor/b2c/quote/{quoteId} - GET
export const fetchB2cReceivedQuotes = (page, limit, search) => {
  // if (!page || !limit) {
  //   return Promise.reject(new Error("Invalid input data."));
  // }
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `supplier/b2c/quotes?page=${page}&limit=${limit}&search=${search}`,
    })
    .then((response) => {
      console.log("fetchB2cReceivedQuotes api response", response);
    return response})
      .catch((error) => {
        console.log("Error in fetchB2cReceivedQuotes api", error);
        return error
      });
  };


    // Update quote request
export const updateB2cQuoteRequest = (values, quoteId) => {
  // Validate inputs
  if (!values || !quoteId) {
    return Promise.reject(new Error("Invalid input data."));
  }

  return axios({
    method: "put",
    headers: authHeader(),
    url: url + `update/b2c/quote/request/${quoteId}`,
    data: {
      "status": values?.status,
      "reason": values?.reason,
      "cart_items": values?.cart_items,
      "quote_name": values?.quote_name,
      "subtotal": values?.subtotal,
      "quantity": values?.quantity,
      "shop_name": values?.shop_name,
      "user_name": values?.user_name,
      "user_id": values?.user_id,
    },
  })
    .then((response) => {
      console.log("updateB2cQuoteRequest API successful:", response);
      return response
    })
    .catch((error) => {
      console.error("Error in updateB2cQuoteRequest API:", error);
      return Promise.reject(error); // Propagate the error.
    });
};



  // GET - https://backendapi.gonje.com/vendor/b2c/invoices
  // https://backendapi.gonje.com/single/vendor/b2c/invoice/invoiceId
// GET - https://backendapi.gonje.com/supplier/b2c/invoices
// https://backendapi.gonje.com/single/supplier/b2c/invoice/{invoiceId}
  // fetch sent quotes for b2c supplier/b2c/quotes
  export const fetchReceivedInvoices = (page, limit, search) => {
    // if (!page || !limit) {
    //   return Promise.reject(new Error("Invalid input data."));
    // }
      return axios({
        method: "get",
        headers: authHeader(),
        url: url + `supplier/b2c/invoices?page=${page}&limit=${limit}&search=${search}`,
      })
      .then((response) => {
        console.log("fetchReceivedInvoices api response", response);
      return response})
        .catch((error) => {
          console.log("Error in fetchReceivedInvoices api", error);
          return error
        });
    };

    export const fetchReceivedInvoicesDetails = (invoiceId) => {
      // if (!page || !limit) {
      //   return Promise.reject(new Error("Invalid input data."));
      // }
        return axios({
          method: "get",
          headers: authHeader(),
          url: url + `single/supplier/b2c/invoice/${invoiceId}`,
        })
        .then((response) => {
          console.log("fetchReceivedInvoices api response", response);
        return response})
          .catch((error) => {
            console.log("Error in fetchReceivedInvoices api", error);
            return error
          });
      };

    // fetch sent quotes for b2c supplier/b2c/quotes
    export const fetchSentInvoices = (page, limit, search) => {
      // if (!page || !limit) {
      //   return Promise.reject(new Error("Invalid input data."));
      // }
        return axios({
          method: "get",
          headers: authHeader(),
          url: url + `vendor/b2c/invoices?page=${page}&limit=${limit}&search=${search}`,
        })
        .then((response) => {
          console.log("fetchSentInvoices api response", response);
        return response})
          .catch((error) => {
            console.log("Error in fetchSentInvoices api", error);
            return error
          });
      };

      export const fetchSentInvoicesDetails = (invoiceId) => {
        // if (!page || !limit) {
        //   return Promise.reject(new Error("Invalid input data."));
        // } https://backendapi.gonje.com/single/vendor/b2c/invoice/
          return axios({
            method: "get",
            headers: authHeader(),
            url: url + `single/vendor/b2c/invoice/${invoiceId}`,
          })
          .then((response) => {
            console.log("fetchReceivedInvoices api response", response);
          return response})
            .catch((error) => {
              console.log("Error in fetchReceivedInvoices api", error);
              return error
            });
        };


// https://backendapi.gonje.com/view/vendor/b2c/shops?search=bak

export const fetchB2cShops = (page, limit, search) => {
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `view/vendor/b2c/shops?page=${page}&limit=${limit}&search=${search}`,
    })
    .then((response) => {
      console.log("fetchB2cShops api response", response);
    return response})
      .catch((error) => {
        console.log("Error in fetchB2cShops api", error);
        return error
      });
  };

  // https://backendapi.gonje.com/view/vendor/shop/%7BuserId%7D/products/%7BshopId%7D
  // https://backendapi.gonje.com/view/vendor/shop/8/products/5?page=3&limit=3
  export const fetchShopDetailsAndProducts = (userId, shopId, page, limit, search) => {
    if (!userId || !shopId) {
      return Promise.reject(new Error("Invalid input data."));
    }
      return axios({
        method: "get",
        headers: authHeader(),
        url: url + `view/vendor/shop/${userId}/products/${shopId}?page=${page}&limit=${limit}`,
      })
      .then((response) => {
        console.log("fetchReceivedInvoices api response", response, '===', userId, shopId);
      return response})
        .catch((error) => {
          console.log("Error in fetchReceivedInvoices api", error, '===', userId, shopId);
          return error
        });
    };


// ORDERS VENDORS 2 VENDORS
//       GET - baseurl/vendor/b2c/orders
// GET - baseurl/supplier/b2c/orders
// get a single order
// GET - baseurl/vendor/b2c/order/{invoiceId}
// GET - baseurl/supplier/b2c/order/{invoiceId}
export const fetchIncomingOrders = (page, limit, search) => {
  if (!page || !limit) {
    return Promise.reject(new Error("Invalid input data."));
  }
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `vendor/b2c/orders?page=${page}&limit=${limit}&search=${search}`,
  })
  .then((response) => {
    console.log("fetchIncomingOrders api response", response);
  return response})
    .catch((error) => {
      console.log("Error in fetchIncomingOrders api", error);
      return error
    });
};

export const fetchIncomingOrdersDetails = (id) => {
  if (!id) {
    return Promise.reject(new Error("Invalid input data."));
  }
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `vendor/b2c/order${id}`,
    })
    .then((response) => {
      console.log("fetchReceivedInvoices api response", response);
    return response})
      .catch((error) => {
        console.log("Error in fetchReceivedInvoices api", error);
        return error
      });
  };

  export const fetchOutgoingOrders = (page, limit, search) => {
    if (!page || !limit) {
      return Promise.reject(new Error("Invalid input data."));
    }
    return axios({
      method: "get",
      headers: authHeader(),
      url: url + `supplier/b2c/orders?page=${page}&limit=${limit}&search=${search}`,
    })
    .then((response) => {
      console.log("fetchIncomingOrders api response", response);
    return response})
      .catch((error) => {
        console.log("Error in fetchIncomingOrders api", error);
        return error
      });
  };
  
  export const fetchOutgoingOrdersDetails = (id) => {
    if (!id) {
      return Promise.reject(new Error("Invalid input data."));
    }
      return axios({
        method: "get",
        headers: authHeader(),
        url: url + `supplier/b2c/order/${id}`,
      })
      .then((response) => {
        console.log("fetchReceivedInvoices api response", response);
      return response})
        .catch((error) => {
          console.log("Error in fetchReceivedInvoices api", error);
          return error
        });
    };
  

      // / This stores a new delivery company.
      // /add/delivery/company
      // URL: backendapi.gonje.com/add/delivery/company
      // request data
      // {
      // "company_name":"company123abc",
      // "aadress":"address123abc"
      // }
export const addDeliveryCompany = (values) => {
  if (!values) {
    return Promise.reject(new Error("Invalid input data."));
  }
  return axios({
    method: "post",
    headers: authHeader(),
    url: url + `add/delivery/company`,
    data: {
      "company_name": values?.name,
      "address": values?.adress
      }
  })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error("Error in addDeliveryCompany API:", error);
      return Promise.reject(error);
    });
};

export const assignDeliveryCompany = (values, id) => {
  if (!values) {
    return Promise.reject(new Error("Invalid input data."));
  }
  return axios({
    method: "put",
    headers: authHeader(),
    url: url + `assign/delivery/company/b2b/${id}`,
    data: {
      "delivery_company_id": values?.id,
      "delivery_company_name": values?.name
      }
  })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error("Error in assignDeliveryCompany API:", error);
      return Promise.reject(error); // Propagate the error.
    });
};

export const assignDeliveryCompanyCustomer = (values, orderId) => {
  if (!values) {
    return Promise.reject(new Error("Invalid input data."));
  }
  return axios({
    method: "put",
    headers: authHeader(),
    url: url + `assign/delivery/company/${orderId}`,
    data: {
      "delivery_company_id": values?.id,
      "delivery_company_name": values?.name
      }
  })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error("Error in assignDeliveryCompanyCustomer API:", error);
      return Promise.reject(error);
    });
};

export const fetchDeliveryCompanies = () => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `my/delivery/company/list`,
  })
  .then((response) => {
      return response
    })
    .catch((error) => {
      console.log("Error in fetchDeliveryCompanies api", error);
      return Promise.reject(error)
    });
};


      // DASHBOARD
      export const fetchStats = () => {
        return axios({
          method: "get",
          headers: authHeader(),
          url: url + `my/sales/analytics`,
        })
        .then((response) => {
          console.log("fetchDeliveryCompanies api response", response);
        return response})
          .catch((error) => {
            console.log("Error in fetchDeliveryCompanies api", error);
            return error
          });
      };

      // b2c notifications
      // GET - bakcendapi.gonje.com/my/b2c/notifications 
      export const fetchb2cNotificications= (page, limit) => {
        return axios({
          method: "get",
          headers: authHeader(),
          url: url + `my/b2c/notifications?page=${page}&limit=${limit}`,
        })
        .then((response) => {
          console.log("fetchb2cNotificications api response", response);
        return response})
          .catch((error) => {
            console.log("Error in fetchb2cNotificications api", error);
            return error
          });
      };
// ==========B2C============
