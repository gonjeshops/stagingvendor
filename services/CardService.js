import Httpcommon from "../components/shared/Httpcommon";

const getCardDetail = (data) => {
  return Httpcommon.get(`getCard/${data}`);
};

const walletDetails = (data) => {
  // console.log("walletDetails",data)
  return Httpcommon.post("wallet-details", data);
};

const RedeemGiftCard = (data) => {
  // console.log("walletDetails",data)
  return Httpcommon.post("redeem-gift-card", data);
};

const CardService = {
  getCardDetail,
  walletDetails,
  RedeemGiftCard,
};

export default CardService;
