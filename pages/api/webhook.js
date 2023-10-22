
import { Stripe } from 'stripe';
// import getRawBody from "raw-body";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const endpointSecret = 'whsec_6818b2f7a9a636a8d76f1eb89ad1e98431f885fbcf153236857ffa9997e1e52b'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // const rawBody = await getRawBody(req);
    // const sig = req.headers['stripe-signature'];

    // let event;
    
    // try {
    //   event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    //   console.log('Verified==========================', 'RAWBODY===', req.body, 'SIGNATURE===', sig)
    // } catch (err) {
    //   console.log(`⚠️  Webhook signature verification failed.`, err.message);
    //   return res.status(400).send('Webhook Error: Invalid signature');
    // }
    console.log('=========', req.body)
    res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
