import  {  useState } from 'react';
import ModalCentral from '../Modal/ModalCentral';
import { FaTimes } from 'react-icons/fa';
import { createQuoteRequest, } from '../Api2';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import GetQuoteProductCard from '../card/GetQuoteProductCard';
import { AiOutlineShopping } from 'react-icons/ai';
import { BtnSpinner } from '../Loader/Spinner/BtnSpinner';


const QuoteForm = ({ isOpen, closeModal, shopName }) => {
  const {user, useB2Bcart, setActive} = useGlobalState();
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    cartItems,
    totalPrice,
    totalQuantities,clearCart,
    toggleCartItemQuanitity,
    onRemove,} = useB2Bcart

  const [success, setSuccess] = useState('')
  const [reqError, setReqError] = useState('')
  const [quoteName, setQuoteName] = useState('');
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null) 
    setReqError('')
    setLoading(true)
    
    const validationErrors = {};
    if (!quoteName) {
      validationErrors.name = 'Please enter the name of your quote request.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const newFormData = {
        quote_name: quoteName,
        subtotal: totalPrice,
        quantity: totalQuantities,
        cart_items: cartItems,
        // cart: JSON.stringify(cartItems),
        shop_name: shopName,
        user_id: user?.user_id
      }
      console.log('nes form Data',newFormData)
      const response = await createQuoteRequest(newFormData);
      if (response?.status === 200) {
        console.log("API response:", response);
        setSuccess('Quote resquest was successfull.')
        toast.success('Quote resquest was successfull.')
        setTimeout(() => {
          router.push('/vendorb2b/workspace/request-quotes')
        }, 1000);
      } else {
        console.log("Quote resquest API response error:", response);
        toast.error('Server error.')
        setReqError( "Server error. Try again or consult the developer.");
      }
    } catch (error) {
      console.error("Quote resquest Catch error:", error);
      setReqError( "Something went wrong. Try again.");
      toast.error('Server error.')
    } finally{
      setErrors('');
      setQuoteName('')
      clearCart()
      setLoading(false)
    }    
  };


  return (
    <ModalCentral isOpen={isOpen} closeModal={closeModal}>
      <div className="mx-auto w-full md:w-[650px] max-h-[700px] overflow-y-auto rounded-md py-8 bg-light100">
        <div className="flex px-4 justify-between items-center text-xl font-semibold pb-4">
          <h4>Quote Request</h4>
          <p className="text-sm text-blue-400">{shopName}</p>
          <FaTimes onClick={closeModal} className="hover:scale-105 duration-300 cursor-pointer" />
        </div>

        <form onSubmit={handleSubmit} className="w-full px-4 sm:px-8 py-6 border-zinc-500 border-y space-y-5">
        {reqError && <p className="text-red-500 text-sm mt-1">{reqError}</p>}
        {success && <p className="text-green-600 text-sm mt-1">{success}</p>}


          <div className="mb-4 h-20">
            <label htmlFor="name" className="block font-medium mb-2">
              Create a new quote or Select a quote
            </label>
            <input
              placeholder='Select or enter quote name'
              value={quoteName}
              name='quoteName'
              onChange={(e)=>setQuoteName(e.target.value)}
              className="bg-light100 w-full p-2 rounded border text-zinc-600 focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          { cartItems?.length < 1 ?  (
            <div className="flex flex-col gap-4 py-10 w-full justify-center items-center">
            <AiOutlineShopping size={60} />
            <h3>Your shopping bag is empty</h3>
            <div className="flex justify-center text-center">
            <div
                onClick={() => closeModal()}
                className="hover-blue py-3 px-4 rounded w-full font-semibold cursor-pointer "
              >
                Continue Shopping
              </div>
            </div>
              
        
          </div>
          ) : 
           <> 
            <div className="px-">
                {
                  cartItems?.map((item, idx) => (
                    <GetQuoteProductCard key={item?.id} item={item} toggleCartItemQuanitity={toggleCartItemQuanitity} onRemove={onRemove}/>
                  ))
                }
                            
                
                <div className='flex justify-between items-center py-4 font-medium text-lg'>
                  <p>Subtotal:</p>
                  <p>${totalPrice}</p>
                </div>
              </div>

              <button
                type="submit"
                className="hover-blue py-3 px-4 rounded w-full font-semibold "
              >
                {loading ?  <BtnSpinner/> : 'Submit'}
              </button>
            </> 
          }

        </form>

        <div className="flex justify-between gap-6 pt-4 px-4">
            <button onClick={()=> { 
                setActive(1) 
                closeModal() 
              }} 
              className="border border-blue-600 py-3 px-6 rounded-md">
               Add More Products
              </button>

              <button onClick={() => clearCart()} className="border border-blue-600 py-3 px-6 rounded-md">
                Clear Items
              </button>
        </div>

      </div>
    </ModalCentral>
  );
};

export default QuoteForm;
