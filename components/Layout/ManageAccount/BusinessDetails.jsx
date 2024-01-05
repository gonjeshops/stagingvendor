

import React, { useState } from 'react';
import { useRouter } from 'next/router';
// import { toast } from "react-toastify";

const BusinessDetails = ({edit}) => {
  const { push } = useRouter();

  const initialFormData = {
    businessName: "ABC Corporation",
    userName: "John Doe",
    businessEmail: "johndoe@example.com",
    businessPhoneNumber: "(555) 123-4567",
    userAddress: "789 User St, Villagetown, Country",
    longitude: "123.456789",
    latitude: "45.678901",
  };

  const clearForm = () => {
    setFormData({
      businessName: '',
      userName: '',
      businessEmail: '',
      businessPhoneNumber: '',
      userAddress: '',
      longitude: '',
      latitude: '',
    });
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business Email is required';
      isValid = false;
    }

    if (!formData.businessPhoneNumber.trim()) {
      newErrors.businessPhoneNumber = 'Business Phone Number is required';
      isValid = false;
    }

    if (!formData.userName.trim()) {
      newErrors.userName = 'User Name is required';
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
    //   const { data, error } = await updateBusinessDetails('businesses', formData, 'id', 1);
    //   if (data) {
    //     clearForm();
    //     setErrors({});
    //     push('/dashboard');
    //     toast.success('Registration successful');
    //   } else {
    //     console.log(error);
    //     toast.error('Registration failed');
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
    <div className='flex'>
        <div className="w-full bg-white px-8 pb-8 rounded-md shadow">
            <div className="top-heading ">
                <h3>Business details</h3>
            </div>

        <form onSubmit={handleSubmit}>

            {/* Business Email */}
            <div className="mb-4">
            <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-600">
                Business Email
            </label>
            <input
                type="text"
                id="businessEmail"
                name="businessEmail"
                value={formData.businessEmail || ''}
                onChange={handleInputChange}
                className={`mt-1 p-2 border rounded-md w-full ${errors.businessEmail ? 'border-red-500' : ''}`}
            />
            {errors.businessEmail && <p className="text-red-500 text-xs mt-1">{errors.businessEmail}</p>}
            </div>

            <div className="flex gap-4">
            {/* Business Phone Number */}
            <div className="mb-4">
            <label htmlFor="businessPhoneNumber" className="block text-sm font-medium text-gray-600">
                Business Phone Number
            </label>
            <input
                type="text"
                id="businessPhoneNumber"
                name="businessPhoneNumber"
                value={formData.businessPhoneNumber || ''}
                onChange={handleInputChange}
                className={`mt-1 p-2 border rounded-md w-full ${errors.businessPhoneNumber ? 'border-red-500' : ''}`}
            />
            {errors.businessPhoneNumber && <p className="text-red-500 text-xs mt-1">{errors.businessPhoneNumber}</p>}
            </div>

            {/* User Name */}
            <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-600">
                User Name
            </label>
            <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName || ''}
                onChange={handleInputChange}
                className={`mt-1 p-2 border rounded-md w-full ${errors.userName ? 'border-red-500' : ''}`}
            />
            {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
            </div>
            </div>


            {/* User Address */}
            <div className="mb-4">
            <label htmlFor="userAddress" className="block text-sm font-medium text-gray-600">
                User Address
            </label>
            <input
                type="text"
                id="userAddress"
                name="userAddress"
                value={formData.userAddress || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
            />
            </div>

            <div className="flex gap-4">

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
            </div>

            <div className="mt-6">
            <button
                type="submit"
                className="bg-blue-600 text-white w-full px-4 py-2 rounded-md"
                disabled={loading}
            >
                {loading ? 'Submiting..' : 'Submit'}
            </button>
            </div>
        </form>
        </div>
    </div>
  );
};

export default BusinessDetails;
