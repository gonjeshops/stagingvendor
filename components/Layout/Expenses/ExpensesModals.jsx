import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaTrashAlt } from "react-icons/fa";

import { useGlobalState } from "@/context/GlobalStateContext";
import { useRouter } from "next/router";
import { BtnSpinner } from "@/componentsB2b/Loader/Spinner/BtnSpinner";
import { RiSave3Line } from "react-icons/ri";
import { MdSendAndArchive } from "react-icons/md";
import GetQuoteProductCard from "@/componentsB2b/card/GetQuoteProductCard";
import { AiOutlineShopping } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";
import { SendB2cQuoteRequest, createB2cQuoteRequest, } from "@/componentsB2b/Api2";

export const RequestModal = ({item, }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {user, useB2Ccart:{onAdd, cartItems,
    totalPrice,
    totalQuantities,clearCart,
    toggleCartItemQuanitity,
    onRemove, quoteName, setQuoteName, shopName, shop }}=useGlobalState()
  
    const [success, setSuccess] = useState('')
    const [reqError, setReqError] = useState('')
    const [errors, setErrors] = useState({});
  
    // CREATING QUOTE WITH SEND status
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
            status: 'SENT',
            subtotal: totalPrice,
            quantity: totalQuantities,
            cart_items: cartItems,
            shop_name: shopName,
            user_id: user?.user_id,
            user_name: `${user?.user_name} ${user?.user_lastname}`,
          }
  
          const response = await SendB2cQuoteRequest(newFormData);
          if (response?.status === 200) {
            console.log("createQuoteRequest API  response:", response);
            setSuccess('Quote resquest was successfull.')
            toast.success('Quote resquest was successfull.')
            setTimeout(() => {
              router.push(`/quotes/sent_quotes`)
            }, 500);
            
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
  
    // CREATING QUOTE WITH PENDING
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
          status: 'PENDING',
          subtotal: totalPrice,
          quantity: totalQuantities,
          cart_items: cartItems,
          shop_name: shopName,
          user_id: user?.user_id,
          user_name: `${user?.user_name} ${user?.user_lastname}`,
        }
        const response = await createB2cQuoteRequest(newFormData);
        if (response?.status === 200) {
          console.log("createQuoteRequest API  response:", response);
          setSuccess('Quote resquest was successfull.')
          toast.success('Quote resquest was successfull.')
          setQuoteName('')
          clearCart()
          setTimeout(() => {
            router.push(`/quotes/sent_quotes`)
          }, 500);
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
  
  

  return (
    <Dialog>

      <DialogTrigger asChild >
        <Button 
        onClick={()=>onAdd(item, 1, item?.shop_name, item?.owner_id, item?.shop_id)}
        className="p-3  bg-gonje-green capitalize">Request</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            
          </DialogTitle>
        </DialogHeader>
      
        <form onSubmit={handleSendQuote} className="flex flex-col">
            <div className="flex  justify-between items-center text-xl font-semibold pb-3">
              <h4>Create Quote Request</h4>
              <p className="text-sm text-blue-400">{item?.shop_name}</p>
            </div>

            <div className='w- max-h-[65vh] overflow-auto px-4 sm:px-8 py-4 border-zinc-500 border-y '>
              {reqError && <p className="text-red-500 text-sm mt-1">{reqError}</p>}
              {success && <p className="text-green-600 text-sm mt-1">{success}</p>}

            <div className="mb-4 h-20">
              <label htmlFor="name" className="block font-medium mb-2">
                Quote name
              </label>
              <Input
                placeholder='Select or enter quote name'
                value={quoteName}
                disabled={!cartItems?.length}
                name='quoteName'
                onClick={()=>{
                  setReqError('')
                  setErrors('')
                }}
                onChange={(e)=> {
                  setQuoteName(e.target.value) 
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
            </div>
            ) : 
            <> 
              <div className="">
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

            <div className=" pt-3">
                <Button 
                    type="submit"
                    disabled={!cartItems?.length}
                    className="bg-gonje-green text-white text-center cursor-pointer py-3 px-4 rounded w-full font-semibold "
                  >
                      {loading==='send' ?  <BtnSpinner/> : <div className="flex justify-center items-center gap-2"><MdSendAndArchive size={20}/> Send Quote </div>}
                </Button>

                <div className="flex justify-between gap-6 pt-3 ">
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
                </div>

            </div>
        </form>

        {/* <DialogFooter>
          <Button type="submit" className="bg-gonje-green text-white w-full space-x-4">
            <FaTelegramPlane/> <p>Send Quote</p>
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export const AcceptQuote = ({item}) => {

  return (
    <AlertDialog>
      
      <AlertDialogTrigger asChild>
        <Button className="p-3 bg-gonje-green text-white capitalize">
          Accept
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-normal">
            Are you absolutely sure?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center items-center gap-x-4 w-full">
          <AlertDialogCancel className="bg-red-700 text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-gonje-green">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DeleteQuote = ({item}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="p-3 capitalize">
          delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-normal">
            Are you absolutely sure?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center items-center gap-x-4 w-full">
          <AlertDialogCancel className="bg-red-700 text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-gonje-green">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
