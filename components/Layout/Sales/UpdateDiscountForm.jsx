import React, { useState } from 'react';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { BtnSpinner } from '@/componentsB2b/Loader/Spinner/BtnSpinner';

const UpdateDiscountForm = ({ item }) => {
  const [formData, setFormData] = useState({
    discount: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.discount.trim()) {
      newErrors.discount = 'Discount rate is required';
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setSuccess(false);

    if (validateForm()) {
      try {
        // Start loading
        setLoading(true);
        console.log(formData)

        // Perform API post request (replace 'apiEndpoint' with your actual endpoint)
        // const response = await fetch('apiEndpoint', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ ...formData, item }), // Include item in the request body
        // });

        // Check if the request was successful
        // if (response.ok) {
        //   setSuccess(true);
        // } else {
        //   const errorData = await response.json();
        //   setError((prev) => ({ ...prev, api: errorData.message || 'An error occurred' }));
        // }
        
        // Simulating success for testing purposes
        setSuccess(true);
        

      } catch (error) {
        setError((prev) => ({ ...prev, api: 'An unexpected error occurred' }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-4">
      <div className="mb-4">
        <label htmlFor="discount" className="block text-sm mb-2">
          Discount rate
        </label>
        <input
          type="number"
          id="discount"
          name="discount"
          placeholder="eg. 5"
          value={formData?.discount}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md bg-transparent"
        />
        <p className="text-red-600 text-[10px]"> {error?.discount ? error?.discount : ''}</p>
      </div>

      {error?.api && <p className="text-red-600">{error?.api}</p>}

      {success && <p className="text-green-600">Form submitted successfully!</p>}

      <AlertDialogFooter className="flex justify-center items-center gap-4 w-full">
        <button
          type="submit"
          className="bg-gonje-green text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          disabled={loading}
        >
          {loading ? <BtnSpinner /> : 'Submit'}
        </button>
        {/* <AlertDialogAction className="bg-gonje-green"  disabled={loading}>{loading ? <BtnSpinner/> : 'Submit'}</AlertDialogAction> */}
        <AlertDialogCancel className="bg-red-700 text-white">Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </form>
  );
};

export default UpdateDiscountForm;
