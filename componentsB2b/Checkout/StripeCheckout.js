import { useState } from 'react';
import getStripe from '@/util/getStripe';
import { useGlobalState } from '@/context/GlobalStateContext';
import { FaCreditCard } from 'react-icons/fa';

const StripeCheckout = () => {
  const{checkoutData, setCheckoutData,}=useGlobalState()
  console.log('STRIPECHECKOUT==', checkoutData)
  const items = [
    {
      price: checkoutData?.products?.price,
      quantity: checkoutData?.products?.quantity,
      name: 'Total Amount',
    },
    // {
    //   price: 3,
    //   quantity: 1,
    //   name: 'Delivery Fee',
    // },
  ];

  const [stripeError, setStripeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const displayError = (error) => {
    setStripeError(error);
    setTimeout(() => {
      setStripeError(null);
    }, 5000); // Clear error message after 5 seconds (adjust as needed)
  };

  const redirectToCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(items),
      });

      if (!response.ok) {
        throw new Error('Stripe API request failed');
      }

      const data = await response.json();

      const stripe = await getStripe();
      const session = await stripe.redirectToCheckout({ sessionId: data.id });

      if (session.error) {
        displayError(session.error.message);
      }

      localStorage.setItem('Stripe_Results', JSON.stringify(session));
      // localStorage.setItem('user', JSON.stringify({ a: 'emmma', s: 'udejo' }));
    } catch (error) {
      console.error('Stripe Checkout Error:', error);
      displayError('An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    {stripeError && (
      <div className="text-red-600 mb-2">{stripeError}</div>
    )}

    <button
      onClick={redirectToCheckout}
      disabled={loading}
      className={`max-w-2xl text-base w-full flex gap-3 justify-center  items-center text-white p-3 text-center rounded-lg hover-blue ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
       <FaCreditCard  /> <p> {loading ? 'Loading...' : 'Stripe Pay'} </p>
    </button>
  </div>
  );
};

export default StripeCheckout;
