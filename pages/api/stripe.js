
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

    const serviceCharge = 0.01; // 1% commission rate
    const CommissionFee = 0.001; // 0.1% item fee rate

    // // Calculate the Service Charge Fee
    // const TotalServiceCharge = total * serviceCharge;

    // // Calculate the Commission Fees
    // const TotalCommissionFees = items?.reduce((acc, item) => {
    //   const itemFee = item.productPrice * item.productQuantity * CommissionFee;
    //   return acc + itemFee;
    // }, 0);

    // // Calculate the total amount to charge
    // const TotalAmountToCharge = total + TotalServiceCharge + TotalCommissionFees;

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
        // user_id: user_id,
        //   shop_id: shop_id,
        // coupon_id: "",
        //   total: TotalAmountToCharge,
        //   "service_fee": TotalServiceCharge,
        //   "commision_fees": TotalCommissionFees,
        //   payment_gateway: "stripe",
        //   token: token,
        //   latitude: "",
        //   longitude: "",
        user_token: user.token,
        quote_id: checkoutData?.quote_id || 0,
        quote_number: checkoutData?.quote_number || 0,
        quote_name: checkoutData?.quote_name || 'no name',
        user_email: user?.user_email || 'noemail@email.com',
        transaction_type:"vendor b2c checkout",
        transaction_description:"What description do you want?",
        transaction_title:"vendor b2c checkout",
        shoping_rate_id: "shr_1OtlvhL9dKqto3PhMqzDW8A0",
        cart_items: JSON.stringify(
          items?.map((item) => {
            return {
              currency: "aud",
              name: item?.name,
              amount: item?.price,
              product_id: item?.id,
              quantity: item?.quantity,
            };
          })
        ),
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
