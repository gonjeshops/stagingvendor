import { updateB2cQuoteRequest,  } from "@/componentsB2b/Api2";
import { useGlobalState } from "@/context/GlobalStateContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AiOutlineShopping } from "react-icons/ai";
import GetQuoteProductCard from "@/componentsB2b/card/GetQuoteProductCard";
import { BtnSpinner } from "@/componentsB2b/Loader/Spinner/BtnSpinner";
import { MdSendAndArchive } from "react-icons/md";
import { RiSave3Line } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import Select from 'react-select';

export const EditB2cQuotes = ({quotes, setQuotes, setRefresh}) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {user, useB2Ccart,} = useGlobalState();

    const {
        cartItems, setCartItems,
        totalPrice, setTotalPrice,
        totalQuantities, setTotalQuantities, clearCart,
        toggleCartItemQuanitity,
        onRemove, quoteName, setQuoteName, shopName, } = useB2Ccart
    
  const handleClick = (quotes) => {
        setTotalPrice(Number(quotes?.subtotal))
        setTotalQuantities(parseInt(quotes?.quantity, 10))
        setCartItems(JSON.parse(quotes?.cart_items))
        setQuoteName(quotes?.quote_name)
  }

    useEffect(() => {
        if(quotes?.id){
        setTotalPrice(Number(quotes?.subtotal))
        setTotalQuantities(parseInt(quotes?.quantity, 10))
        setCartItems(JSON.parse(quotes?.cart_items))
        setQuoteName(quotes?.quote_name)
        }
    }, [quotes?.id])
    
    
      const [success, setSuccess] = useState('')
      const [reqError, setReqError] = useState('')
      const [errors, setErrors] = useState({});
      const [newQuoteName, setNewQuoteName] = useState(quoteName)
    
      // updating QUOTE WITH SEND status
      const handleSendQuote = async (e) => {
          e.preventDefault();
          setSuccess(null) 
          setReqError('')
          setLoading('send')
          
          const validationErrors = {};
          if (!select) {
            validationErrors.select = 'Please select a status.';
          }
    
          if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading('')
            return;
          }
    
          try {
            const newFormData = {
              status: select.value,
              reason: 'Sending status',
              quote_name: newQuoteName,
              subtotal: totalPrice,
              quantity: totalQuantities,
              cart_items: cartItems,
              user_id: user?.user_id,
              user_name: `${user?.user_name} ${user?.user_lastname}`,
            }
            const response = await updateB2cQuoteRequest(newFormData, quotes?.id);
            if (response?.status === 200) {
              console.log("updateB2cQuoteRequest API  response:", response);
              setSuccess('Quote resquest update was successfull.')
              toast.success('Quote resquest update was successfull.')
              setQuotes(response?.data?.data?.quote)
              setRefresh(prev=>!prev)
            } else {
              console.log("Quote resquest API response error:", response);
              toast.error(response?.error  || response?.message || 'Error submitting the form. Please try again.');
              setReqError( response?.error || response?.message || 'Error submitting the form. Please try again.');
            }
          } catch (error) {
            console.error("Catching Quote resquest Catch error:", error);
            setReqError( 'An error occurred. Please try again later.');
            toast.error('An error occurred. Please try again later.')
          } finally{
            setErrors('');
            setQuoteName('')
            clearCart()
            setLoading(false)
          }    
        };

        const options = [
            {value: 'SENT', label: 'Send Quote'},
            {value: 'PENDING', label: 'Set As Pending'},
        ]
        const [select, setSelected] = useState(null);
    
        const handleSellect = (selected) => {
            setSelected(selected);
            setErrors('')
        };
    
    return (
      <Dialog>
  
        <DialogTrigger asChild >
          <button 
          onClick={()=>handleClick(quotes)}
          disabled={quotes?.status==='ACCEPTED'}
          className={`${quotes?.status==='ACCEPTED' ? 'disable ' : 'bg-gonje-green'}  py-2  px-3 bg-orange-200 text-zinc-800 capitalize rounded`}>Edit</button>
        </DialogTrigger>
  
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              
            </DialogTitle>
          </DialogHeader>
        
          <form onSubmit={handleSendQuote} className="flex flex-col">
              <div className="flex  justify-between items-center text-xl font-semibold pb-3">
                <h4>Create Quote Request</h4>
                <p className="text-sm text-blue-400">{quotes?.shop_name}</p>
              </div>
  
              <div className='w- max-h-[65vh] overflow-auto px-4 sm:px-8 py-4 border-zinc-500 border-y '>
                {reqError && <p className="text-red-500 text-sm mt-1">{reqError}</p>}
                {success && <p className="text-green-600 text-sm mt-1">{success}</p>}
  
              <div className="mb-4 h-20">
                <label htmlFor="name" className="block font-medium mb-2">
                  Slect Status
                </label>

                <Select
                  placeholder='Select or enter quote name'
                  value={select}
                  onChange={handleSellect}
                  options={options}
                  disabled={!cartItems?.length}
                  className="bg-light100  w-full p-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.select && <p className="text-red-500 text-sm mt-1">{errors.select}</p>}
              </div>
  
              { cartItems?.length < 1 ?  (
                <div className="flex flex-col gap-4 py-4 w-full justify-center items-center">
                <AiOutlineShopping size={60} />
                <h3>Your shopping bag is empty</h3>
         
              </div>
              ) : 
              <> 
                <div className="">
                    {
                  
                      cartItems?.map((product, idx) => (
                        <GetQuoteProductCard key={product?.id} item={product} toggleCartItemQuanitity={toggleCartItemQuanitity} onRemove={onRemove}/>
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
  
              <div className=" pt-3">
                  <Button 
                      type="submit"
                      disabled={!cartItems?.length}
                      className="bg-gonje-green text-white text-center cursor-pointer py-3 px-4 rounded w-full font-semibold "
                    >
                        {loading==='send' ?  <BtnSpinner/> : <div className="flex justify-center items-center gap-2"><MdSendAndArchive size={20}/> Send Quote </div>}
                  </Button>
  
                  {/* <div className="flex justify-between gap-6 pt-3 ">
                      <button 
                        onClick={(e)=> { 
                          handleSubmit(e)
                        }} 
                        disabled={!cartItems?.length}
                        className="border w-60  border-blue-600 py-2 px-6 rounded-md">
                        {loading==='draft' ?  <BtnSpinner color={'green'}/> : <div className="flex justify-center items-center gap-2"><RiSave3Line size={20}/> Save As Draft  </div> }
                      </button>
  
                      <div 
                        onClick={() => clearCart()} 
                        disabled={!cartItems?.length}
                        className="w-60  cursor-pointer text-center border border-blue-600 py-2 px-6 rounded-md flex items-center justify-center gap-2">
                          <FaTrashAlt size={16}/> Clear Items
                      </div>
                  </div> */}
  
              </div>
          </form>
  
        </DialogContent>
      </Dialog>
    );
  };
  