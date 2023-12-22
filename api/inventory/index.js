import authHeader from "@/componentsB2b/Api/auth-header";
import {
  addProductUrl,
  attachments,
  attributes,
  fetchService,
  inventory_CategoryList,
  inventory_groupList,
  inventory_List,
} from "..";

export const getInventoryList = (values) => {
  return fetchService({
    method: "GET",
    url: inventory_List,
    params: {
      ...values,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization:authHeader(),
    },
  });
};

export const deleteInventoryItem = (id) => {
  return fetchService({
    method: "DELETE",
    url: `${inventory_List}/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
  });
};

export const getInventoryGroups = (shop_id) => {
  return fetchService({
    method: "GET",
    url: inventory_groupList,
    params: {
      shop_id,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization:authHeader(),
    },
  });
};

export const getInventoryCategories = (type_id) => {
  return fetchService({
    method: "GET",
    url: inventory_CategoryList,
    params: {
      type_id,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
  });
};

export const getAttributes = (shop_id) => {
  return fetchService({
    method: "GET",
    url: attributes,
    params: {
      shop_id,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
  });
};

export const addAttachments = (values) => {
  console.log('Data', values)
  return fetchService({
    method: "POST",
    url: attachments,
    body: values,
    headers: {
      Authorization: authHeader(),
    },
  });
};

export const addNewInventory = (values) => {
  return fetchService({
    method: "POST",
    url: addProductUrl,
    body: {
      ...values
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
  });
};

export const updateInventory = (values) => {
  return fetchService({
    method: "PUT",
    url: `${addProductUrl}/${values.id}`,
    body: {
      ...values
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
  });
};


export const getSingleInventory = (product_slug)=>{
  return fetchService({
    method: "GET",
    url: `${inventory_List}/${product_slug}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
  });
}


