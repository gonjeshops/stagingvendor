import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable'
import { BtnSpinner } from '@/componentsB2b/Loader/Spinner/BtnSpinner';
import { updateB2cQuoteRequest } from '@/componentsB2b/Api2';
import { Button } from '@/components/ui/button';

const ReceivedQuotesAction = ({status, item, setRefresh}) => {
  const [show, setShow] = useState(false);
  const [quoteData, setQuoteData] = useState({});
  const [selected, setSelected] = useState(null); // Initialize with null
  const [formData, setFormData] = useState({item});

  const [isLoading, setIsLoading] = useState(false);


  const statusOptions = [
    { value: 'OUT OF STOCK', label: 'OUT OF STOCK' },
    { value: 'OUT OF STOC', label: 'OUT OF STOCK' },
    { value: 'OUT OF STO', label: 'OUT OF STOCK' },
    { value: 'OUT OF S', label: 'OUT OF STOCK' },
    { value: 'OUT OF STOK', label: 'OUT OF STOCK' },
  ];

  const handleSelect = (option) => {
    setSelected(option);
    setFormData((prev) => ({
      ...prev,
      reason: option?.value,
    }));
  };

  const handleSubmit = async (param) => {

    try {
      const newFormData = {
        ...formData,
        status: param,
        cart_items: JSON.parse(item?.cart_items)
      }
      const response = await updateB2cQuoteRequest(newFormData, item?.id);

      if (response?.status === 200) {
        console.log('Updated quote res===', response?.data);
        setRefresh(prev=>!prev)
      }else {
        console.log('Api Error res===', response);
      }
    } catch (error) {
      console.log('CATCH ERROR', error);
    }finally {
      setIsLoading(false); 
      setFormData({
        status: '',
        reason: '',
      });
      setShow(false);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="border-none">
      <div className="flex gap-2 pb-3 text-sm ">
        <button
          onClick={() => {
            handleSubmit('ACCEPTED');
            setShow(false);
            setIsLoading('accept')
            setSelected(null); // Clear the selected option
          }}
          type="button" // Use type="button" for buttons that don't submit the form
          disabled={isLoading || show || item?.status==='ACCEPTED' || item?.status==='PAID' || item?.status==='COMPLETED'}
          className={`${
             show || item?.status==='ACCEPTED' || item?.status==='PAID' || item?.status==='COMPLETED' ? 'disable' : 'bg-gonje-green text-white'
          } rounded text-center font-medium w-full px-2 py-2`}
        >
           {isLoading==='accept' ? <BtnSpinner/> : 'Accept'}
        </button>
        <button
          onClick={() => {
            setShow(true)
           
          }}
          type="button" 
          disabled={isLoading || show || status==='ACCEPTED' || status==='REJECTED'}
          className={`${
             show || status==='ACCEPTED' || status==='REJECTED' || status==='PAID' || status==='COMPLETED'  ? 'disable' : 'hover-red'
          } rounded text-center font-medium w-full px-2 py-2`}
        >
          Reject
        </button>
      </div>

      <div className={`${show ? ' absolute top-16 right-0 max-w-96 z-20 p-4 rounded bg-light300' : 'hidden'} border-none`}>

        <CreatableSelect
          value={selected}
          onChange={handleSelect}
          options={statusOptions}
          className="bg-light100 text-zinc-700 w-full focus:outline-none focus:ring focus:border-blue-300 mb-4"
          placeholder='Select or enter reason for rejection'
        />

       <div className="flex gap-2 ">
       <Button
          onClick={() => {
            handleSubmit('REJECTED')  
            setIsLoading('submit')}}
          type="button" // Use type="button"
          className="rounded hover-blue text-center w-full py-2"
        >
          {isLoading==='submit' ? <BtnSpinner/> : 'Submit'}
        </Button>
        <Button
          onClick={() => setShow(false)}
          type="button" // Use type="button"
          className="rounded hover-red text-center w-full py-2"
        >
          {'Cancel'}
        </Button>
       </div>

      </div>

    </form>
  );
};

export default ReceivedQuotesAction;
