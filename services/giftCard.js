import Httpcommon from "../components/shared/Httpcommon";

const generateGiftCard = (data) => {
  // console.log(data,'cart data')
  return Httpcommon.post("generate-gift-card", data);
};

const checkoutService = {
  generateGiftCard,
};

export default checkoutService;
