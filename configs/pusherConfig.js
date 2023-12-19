import axios from 'axios';
import Pusher from 'pusher-js';

export const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  });

// connect to vendor's shop channel. if this is customer, pass the shopId from the product or shop data,
export const vendorShopChannel = (shopId) => pusher.subscribe(String(shopId));

export const triggerNotification = async (shopId, data) => {
  try {
    console.log('checking data', data)
    const res = await axios.post('/api/notifications', 
    {shopId: '5', 
    eventType: 'eventType', 
    message: "Shopping from me now.", 
    data: {
      "id": shopId,
      "shop_id": data?.shop_id,
      "shop_owner_id": data?.owner_id || data?.user_id || '',
      "sender_id": data?.userId,
      "order_id": null,
      "title": data?.title,
      "message": data?.message,
      "module": "B2C",
      "status": data?.status,
      "read_at": null,
      "created_at":  new Date().toLocaleString(),
      "updated_at": new Date().toLocaleString()
        }, 
      }
    )
  } catch (error) {
    console.log('pusher catch error: ', error)
  }
}
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

// notification sample data
// {
//   "id": 1351,
//   "shop_id": 5,
//   "user_id": 8,
//   "order_id": null,
//   "title": "Quote Request",
//   "message": "Quote request updated successfully",
//   "module": "B2C",
//   "status": 0,
//   "read_at": null,
//   "created_at": "2023-12-14 12:01:57",
//   "updated_at": "2023-12-14 12:01:57"
// }