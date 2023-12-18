import Pusher from "pusher";

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster:  process.env.PUSHER_APP_CLUSTER,
    useTLS: true
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
    console.log('NOTIFICATION=========', req.body)
  try {
    const {shopId, eventType, message, data} = req.body;
    const ress= await pusher.trigger(String(shopId), String(eventType), {
        message: data
      });

    res.status(200).json({status: ress.status, message: ress.statusText});
  } catch (err) {
    console.log('NOTIFICATION ERROR', err)
    res.status(err.statusCode || 500).json({ error: err.message || 'An error occurred' });
  }
}
