import Httpcommon from "../components/shared/Httpcommon";

const get = (data) => {
  return Httpcommon.post("deliveryDate", data);
};
const DeliveryDateService = {
  get,
};

export default DeliveryDateService;
