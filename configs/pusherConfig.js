import Pusher from 'pusher-js';

export const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  });

// connect to vendor's shop channel. if this is customer, pass the shopId from the product or shop data,
export const vendorShopChannel = (shopId) => pusher.subscribe(String(shopId));

// sample data to connect to a vendor shop's channel
// useEffect(() => {
//   const channel = vendorShopChannel(String(shopId))
//   channel.bind(eventType, function (data) {
//     console.log('Event pusher notification======', data.message);
//   });
// }, [])

// connect to nextjs api to trgger an event
// const triggers = async () => {
//   try {
//     const res = await axios.post('/api/notifications', {eventType: eventType, message: data }
//     )
//   } catch (error) {
//     console.log('errrrr', error)
//   }
// }

// eventTypes = "product_purchase", "accept_order", "assign_delivery"