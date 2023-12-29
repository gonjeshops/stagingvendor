
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
// console.log('STIPE SESSION===========', req.body)
  try {
    const {items, checkoutData, user} = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'aud',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price*100,
      },
      quantity: parseInt(item.quantity) || 1,
    }));

    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1NTtVaCQ7rc17WeifUGwhIw6' },
        { shipping_rate: 'shr_1NTtXGCQ7rc17Weigz5iCMyC' },
      ],
      line_items: lineItems,
      success_url: `${req.headers.origin}/invoicing/sent_invoice?status=success`,
      cancel_url: `${req.headers.origin}/invoicing/sent_invoice?status=cancelled`,  
      metadata: {
        user_token: user.token,
        quote_id: checkoutData?.quote_id || 0,
        quote_number: checkoutData?.quote_number || 0,
        quote_name: checkoutData?.quote_name || 'no name',
        user_email: user?.user_email || 'noemail@email.com',
        transaction_type:"Do you mean Product purchase?",
        transaction_description:"What description do you want?",
        transaction_title:"I don't get."
      },  
      customer_email: user?.user_email || 'noemail@email.com'
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session);
  } catch (err) {
    console.log('STRIPE ERROR', err)
    res.status(err.statusCode || 500).json({ error: err.message || 'An error occurred' });
  }
}
