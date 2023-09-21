import Httpcommon from "../components/shared/Httpcommon";

const getCount = (data) => {
  // console.log(data,'cart data')
  return Httpcommon.post("cartCount", data);
};

const addCart = (data) => {
  return Httpcommon.post("addToCart", data);
};

const getAllCartItems = (data) => {
  return Httpcommon.post("cartListing", data);
};
const deleteCart = () => {
  return Httpcommon.post("deleteCart");
};

const cartService = {
  getCount,
  addCart,
  getAllCartItems,
  deleteCart,
};

export default cartService;
