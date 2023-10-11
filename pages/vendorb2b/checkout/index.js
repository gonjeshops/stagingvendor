import Checkout from '@/componentsB2b/Checkout/Checkout'
import Workspace from '@/componentsB2b/Workspace/Workspace'
import getStripe from '@/util/getStripe'

const CheckoutPage = () => {


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
        <Checkout content={data}  />
    </Workspace>

    
  )
}

export default CheckoutPage