import React, { useState } from 'react';
import { useRouter } from 'next/router';


const ShopDetails = () => {
  const { push } = useRouter();

  const initialFormData = {
    name: "Awesome Restaurant",
    description: "A trendy place with a diverse menu",
    address: "123 Main Street, Cityville",
    paymentType: "Credit Card",
    latitude: "40.7128",
    longitude: "-74.0060",
  };

  const clearForm = () => {
    setFormData({
      name: '',
      description: '',
      address: '',
      paymentType: '',
      latitude: '',
      longitude: '',
    });
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Shop name is required';
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Shop address is required';
      isValid = false;
    }

    // Additional validation rules can be added as needed

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
    //   const { data, error } = await updateItem('shop_details', formData, 'id', 1);
    //   if (data) {
    //     clearForm();
    //     setErrors({});
    //     push('/shop/dashboard');
    //     toast.success('Shop details saved successfully');
    //   } else {
    //     console.log(error);
    //     toast.error('Failed to save shop details');
    //   }
    //   console.log({ data, error });
    } catch (error) {
    //   console.error('Error submitting the form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  return (
    <div className="w-full bg-white px-8 pb-8 rounded-md shadow">
         <div className="top-heading ">
            <h3>My Shop Details</h3>
        </div>
      <form onSubmit={handleSubmit}>

        {/* Shop Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Shop Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            className={`mt-1 p-2 border rounded-md w-full ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Shop Address */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-600">
            Shop Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={handleInputChange}
            className={`mt-1 p-2 border rounded-md w-full ${errors.address ? 'border-red-500' : ''}`}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>


       

        <div className="flex gap-4">
        {/* Latitude */}
        <div className="mb-4">
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-600">
            Latitude
          </label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            value={formData.latitude || ''}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Longitude */}
        <div className="mb-4">
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-600">
            Longitude
          </label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            value={formData.longitude || ''}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        </div>

         {/* Payment Type */}
         <div className="mb-4">
          <label htmlFor="paymentType" className="block text-sm font-medium text-gray-600">
            Payment Type
          </label>
          <input
            type="text"
            id="paymentType"
            name="paymentType"
            value={formData.paymentType || ''}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>


        <div className="mt-6">
          <button
            type="submit"
            className="bg-yellow-600 text-white w-full px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Details'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopDetails;
