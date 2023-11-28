import  {  useState, useEffect } from 'react';
import ModalCentral from '../Modal/ModalCentral';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import { createQuoteRequest, createQuoteWithSendStatus, } from '../Api2';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import GetQuoteProductCard from '../card/GetQuoteProductCard';
import { AiOutlineShopping } from 'react-icons/ai';
import { BtnSpinner } from '../Loader/Spinner/BtnSpinner';
import SimilarProducts from '../Products/SimilarProducts';
import { RiSave3Line } from 'react-icons/ri';
import { MdSendAndArchive } from 'react-icons/md';


const QuoteForm = () => {
  const {user, useB2Bcart, closeModal, setActive, supplierDetails, editQuote, setEditQuote} = useGlobalState();
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    
  }, [editQuote?.id])
  

  

  const {
    cartItems,
    totalPrice,
    totalQuantities,clearCart,
    toggleCartItemQuanitity,
    onRemove, quoteName, setQuoteName, shopName, } = useB2Bcart

  const [success, setSuccess] = useState('')
  const [reqError, setReqError] = useState('')
  const [errors, setErrors] = useState({});



  const handleSendQuote = async (e) => {
      e.preventDefault();
      setSuccess(null) 
      setReqError('')
      setLoading('send')
      
      const validationErrors = {};
      if (!quoteName) {
        validationErrors.name = 'Please enter the name of your quote request.';
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setLoading('')
        return;
      }

      try {
        const newFormData = {
          quote_name: quoteName,
          subtotal: totalPrice,
          quantity: totalQuantities,
          cart_items: cartItems,
          shop_name: shopName,
          user_id: user?.user_id,
          user_name: `${user?.user_name} ${user?.user_lastname}`,
        }

        const response = await createQuoteWithSendStatus(newFormData);
        if (response?.status === 200) {
          console.log("createQuoteRequest API  response:", response);
          setSuccess('Quote resquest was successfull.')
          toast.success('Quote resquest was successfull.')
          setTimeout(() => {
            router.push('/vendorb2b/workspace/request-quotes')
          }, 1000);
        } else {
          console.log("Quote resquest API response error:", response);
          toast.error(response || 'Error submitting the form. Please try again.');
          setReqError( response?.message || 'Error submitting the form. Please try again.');
        }
      } catch (error) {
        console.error("Catching Quote resquest Catch error:", error);
        setReqError( error || 'An error occurred. Please try again later.');
        toast.error(err || 'An error occurred. Please try again later.')
      } finally{
        setErrors('');
        setQuoteName('')
        clearCart()
        setLoading(false)
      }    
    };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null) 
    setReqError('')
    setLoading('draft')
    
    const validationErrors = {};
    if (!quoteName) {
      validationErrors.name = 'Please enter the name of your quote request.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading('')
      return;
    }

    try {
      const newFormData = {
        quote_name: quoteName,
        subtotal: totalPrice,
        quantity: totalQuantities,
        cart_items: cartItems,
        shop_name: shopName,
        user_id: user?.user_id,
        user_name: `${user?.user_name} ${user?.user_lastname}`,
      }

      const response = await createQuoteRequest(newFormData);
      if (response?.status === 200) {
        console.log("createQuoteRequest API  response:", response);
        setSuccess('Quote resquest was successfull.')
        toast.success('Quote resquest was successfull.')
        setQuoteName('')
        clearCart()
        setTimeout(() => {
          router.push('/vendorb2b/workspace/forcasted-quotes')
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
      setLoading(false)
    }    
  };

  const [popup, setPopup] = useState(false)

  return (
  
      <div className="mx-auto relative w-full h-screen lg:h-[95vh]  overflow-auto rounded-md py-8 px-4 bg-light100 grid lg:grid-cols-2 gap-4">

       <FaTimes size={14} onClick={()=>{
        if(editQuote?.id){
          setPopup(true)
       } else {
        closeModal()
       }
       }} className="absolute right-6 top-6 z-50   hover:scale-105 duration-300 cursor-pointer" />

       {popup && <div className="z-50 w-60 p-4 rounded bg-light200 shadow text text-center absolute right-6 top-14">
            <p>Do you want to discard quote?</p>  
            <div className='pt-4 flex justify-center items-center gap-2'>
                <button className="px-2 hover-blue">No</button>   

                <button onClick={
                  ()=>{
                  closeModal()
                  setEditQuote({})
                  clearCart()
                }} className="px-2 hover-red">Yes</button>   
            </div>      
            </div>} 


       <div>
            <div className="flex px-4 justify-between items-center text-xl font-semibold pb-4">
              <h4>Quote Request</h4>
              <p className="text-sm text-blue-400">{supplierDetails?.name}</p>
              
            </div>

            <form onSubmit={handleSendQuote} className="">
              <div className='w-full max-h-[65vh] overflow-auto px-4 sm:px-8 py-6 border-zinc-500 border-y space-y-5'>
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
                  onChange={(e)=> {
                    setQuoteName(e.target.value) 
                    setReqError('')
                    setErrors('')
                  }
                  }
                  className="bg-light100  w-full p-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              { cartItems?.length < 1 ?  (
                <div className="flex flex-col gap-4 py-4 w-full justify-center items-center">
                <AiOutlineShopping size={60} />
                <h3>Your shopping bag is empty</h3>
                <div className="flex justify-center text-center">
                {/* <div
                    onClick={() => closeModal()}
                    className="hover-blue py-3 px-4 rounded w-full font-semibold cursor-pointer "
                  >
                    Continue Shopping
                  </div> */}
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
                                
                    
                    <div className='flex justify-between items-center pt-4 font-medium text-lg'>
                      <p>Subtotal:</p>
                      <p>${totalPrice }</p>
                    </div>
                  </div>
                </> 
              }

            </div>

            <div className="px-4 pt-4">
                <button 
               
                        type="submit"
                        className="hover-blue min-w-40 text-center cursor-pointer py-3 px-4 rounded w-full font-semibold "
                      >
                        {loading==='send' ?  <BtnSpinner/> : <div className="flex justify-center items-center gap-2"><MdSendAndArchive size={20}/> Send Quote </div>}
                </button>

                <div className="flex justify-between gap-6 pt-3 ">
                    <button onClick={(e)=> { 
                        setActive(1) 
                        handleSubmit(e)
                        // closeModal() 
                      }} 
                      className="border w-60  border-blue-600 py-3 px-6 rounded-md">
                      {loading==='draft' ?  <BtnSpinner color={'green'}/> : <div className="flex justify-center items-center gap-2"><RiSave3Line size={20}/> Save As Draft  </div> }
                      </button>

                      <div onClick={() => clearCart()} className="w-60  cursor-pointer text-center border border-blue-600 py-3 px-6 rounded-md flex items-center justify-center gap-2">
                       <FaTrashAlt size={16}/> Clear Items
                      </div>
                </div>

            </div>

            </form>

        </div>

        <div className="relative">
          <SimilarProducts small={true} shop={cartItems[0]?.shop}/>
        </div>

      </div>
 
  );
};

export default QuoteForm;
