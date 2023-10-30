import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable'
import { updateQuoteRequest } from '../Api2';
import { BtnSpinner } from '../Loader/Spinner/BtnSpinner';

const ChangeQuoteStatusForm = ({status, quoteData,quoteQuantity,  setQuoteData, reason}) => {
  console.log('=========', status, quoteData, reason)
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null); // Initialize with null
  const [formData, setFormData] = useState({
    reason: '',
    status: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const statusOptions = [
    { value: 'No longer interested', label: 'No longer interested' },
    { value: 'Changed Supplier', label: 'Changed Supplier' },
    { value: 'Out of cash', label: 'Out of cash' },
    { value: 'Sent request by mistake', label: 'Sent request by mistake' },
    { value: 'Delays from supplier', label: 'Delays from supplier' },
  ];

  const handleSelect = (option) => {
    setSelected(option);
    setFormData((prev) => ({
      ...prev,
      reason: option?.value, // Set the value of the selected option
    }));
  };

  const handleSubmit = async (param) => {
    setIsLoading(true);
    try {
      console.log('New Form Data:', {
        status: param,
        reason: formData?.reason,
      });
      
      const response = await updateQuoteRequest({
        status: param,
        quantity: quoteQuantity,
        reason: formData?.reason,
      }, quoteData?.quote?.id);

        console.log('Updated quote res===', response);

      // if (response?.status === 200) {
      //   console.log('Updated quote res===', response?.data);
      //   setQuoteData(response?.data);
      // }else {
      //   console.log('Api Error res===', response);
      // }
    } catch (error) {
      console.log('CATCH ERROR', error);
    }finally {
      setIsLoading(false); // Set loading state to false after API call
      setFormData({
        status: '',
        reason: '',
      });
      setShow(false);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="">
      <h4 className="font-medium text-lg pb-6">Request Status</h4>
      <p className="text-sm pb-2 flex gap-3 items-center">
        Status: <span>{status}</span>
      </p>
      {reason && <p className="text-sm pb-2 flex gap-3 items-center">
        Reason: <span>{reason}</span>
      </p>}

      <div className="flex gap-2 pb-3 ">
        
      <button
        onClick={() => {
          handleSubmit('SENT');
          setShow(false);
          setSelected(null);
        }}
        type="button"
        disabled={show || status === 'ACCEPTED' || isLoading} // Disable when loading
        className={`${
          (show || status === 'ACCEPTED' || status === 'SENT' || isLoading) ? 'bg-blue-300 cursor-not-allowed' : 'hover-blue'
        } rounded text-center w-full py-3`}
      >
        {isLoading ? <BtnSpinner/>  : (status === 'CANCELLED' ? 'RESEND QUOTE' : status === 'SENT' ? 'QUOTE SENT' : 'SEND QUOTE')}
      </button>

      <button
        onClick={() => setShow(true)}
        type="button"
        className={`${
          show ? 'bg-red-300 cursor-not-allowed' : 'hover-red'
        } rounded text-center w-full py-3`}
        disabled={isLoading} // Disable when loading
      >
        {status==='CANCELLED' ? 'UPDATE REASON':'CANCEL QUOTE'}
      </button>

      </div>

      <div className={`${show ? 'block ' : 'hidden'} `}>
        <CreatableSelect
          value={selected}
          onChange={handleSelect}
          options={statusOptions}
          className="bg-light100 text-zinc-700 w-full focus:outline-none focus:ring focus:border-blue-300 mb-3"
          placeholder='Select or enter reason for rejection'
        />

        <button
          onClick={() => handleSubmit('CANCELLED')}
          type="button"
          className="rounded hover-blue text-center w-full py-3"
          disabled={isLoading} // Disable when loading
        >
          {isLoading ? <BtnSpinner/> : 'SUBMIT'}
        </button>

      </div>
    </form>
  );
};

export default ChangeQuoteStatusForm;
