import { useState } from 'react';
import getStripe from '@/util/getStripe';
import { useGlobalState } from '@/context/GlobalStateContext';
import { FaCreditCard } from 'react-icons/fa';

const StripeCheckout = () => {
  const{checkoutData}=useGlobalState()
  console.log('STRIPECHECKOUT==', checkoutData)
  const items = [
    {
      price: checkoutData?.subtotal || 0, // Provide a default value if the properties are missing
      quantity: 1,
      name: 'Total Amount',
    },
  ];
  

  const [stripeError, setStripeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const displayError = (error) => {
    setStripeError(error);
    setTimeout(() => {
      setStripeError(null);
    }, 5000); // Clear error message after 5 seconds 
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
console.log('STRIPE RESPONSE', session)
      localStorage.setItem('Stripe_Results', JSON.stringify(session));
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
      <div className="text-red-600 mb-2">
        {stripeError}
      </div>
    )}

    <button
      onClick={redirectToCheckout}
      disabled={loading}
      className={`max-w-2xl text-base w-full flex gap-3 justify-center  items-center text-white p-3 text-center rounded-lg hover-blue ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
       <FaCreditCard  /> 
       <p> {loading ? 'Loading...' : 'Stripe Pay'} </p>
    </button>
  </div>
  );
};

export default StripeCheckout;
