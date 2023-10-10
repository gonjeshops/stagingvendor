import Checkout from '@/componentsB2b/Checkout/Checkout'
import Workspace from '@/componentsB2b/Workspace/Workspace'
import getStripe from '@/util/getStripe'

const CheckoutPage = () => {
  const item = {
    price: '29',
    quantity: 1
  }

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${windows.loation.origin}/success`,
    cancelUrl: `${windows.location.origin}`,
  }

  const redirectToCheckout = async () => {
    console.log('STRIPE', 'redirectToCheckout')

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout(checkoutOptions)
    console.log(error)

  }


  const data = {
    cardtypes: ['Visa Card', 'Master Card', 'Verve Card', 'Dollar Card', 'Coupon'],
    billingDetails: {
      name: 'Shatra  sahare',
      address: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, blanditiis',
      phone: 887009834,
    },
    shippingDetails: {
      name: 'Shatra  sahare',
      address: 'Lorem sit amet, consectetur adipisicing elit. Error, blanditiis',
      phone: 887009834,
    },
    summary: [345, 453,453],
    summary2: {
      subtotal: 868,
      discount: 89,
      tax: 123,
      subtoal: 989,
      cost: 30,
      total: 878
    }

  }
  return (

    <Workspace>
        <Checkout content={data} item={redirectToCheckout } />
    </Workspace>

    
  )
}

export default CheckoutPage