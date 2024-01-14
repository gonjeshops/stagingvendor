

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaEdit } from 'react-icons/fa';
import { fetchService, vendorUrl } from '@/api';
import { updateUserDetail } from '@/api/userDetail';
import { toast } from 'react-toastify';
// import { toast } from "react-toastify";

const UserDetails = ({user, fetchProfile, }) => {
  const [edit, setEdit] = useState(0)

  const initialFormData = {
    business_name: user?.name || '',
    // email: user?.email || "",
    business_number: user?.business_number  || "",
    // userAddress: user?.address?.length ? Object.values(user?.address).join(', ') : "789 User St, Villagetown, Country",
    longitude: user?.longitude || "",
    last_name: "Emma",
    email: "ad@ad.com",
    latitude: user?.latitude ||"",
    contact_details: user?.contact_details ||''
  };

const h = {
  "business_number": "123456789",
  "business_name": "ABC Company",
  "contact_details": "123-456-7890",
  "latitude": "40.7128",
  "longitude": "-74.0060",
  "shipping_address": {
    "apt": "5",
    "city": "Chandigarh",
    "phone": "+918978907071",
    "state": "Punjab",
    "address": "Akoka, Yaba, Lagos Mainland",
    "postcode": "69678971"
  },
  "billing_address": {
    "apt": "5",
    "city": "Chandigarh",
    "phone": "+918978907071",
    "state": "Punjab",
    "address": "Akoka, Yaba, Lagos Mainland",
    "postcode": "69678971"
  }
}

  const clearForm = () => {
    setFormData({
      business_name: '',
      email: '',
      business_number: '',
      userAddress: '',
      longitude: '',
      latitude: '',
    });
  };

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(initialFormData)
  }, [user?.id])

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.business_number.trim()) {
      newErrors.business_number = 'Business Phone Number is required';
      isValid = false;
    }

    if (!formData.business_name.trim()) {
      newErrors.business_name = 'User Name is required';
      isValid = false;
    }

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
      const response= await fetchService({
        url: vendorUrl,
        method: 'PUT',
        body: formData,
      })
      if (response?.status===200) {
        // setUser(response?.data)
        setErrors({});
        setEdit(0)
        console.log('formRes=', response);
        toast.success('Registration successful');
      } else {
        console.log(response);
        toast.error('Registration failed');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
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

  const inputControl = `mt-1 w-full ${ !edit ? 'disabled cursor-not-allowed' : ''} input1 ${errors.email ? 'border-red-500' : ''}`
  const btnControl = edit ? 'btn2' : 'btn2 disabled' 

    return (
    <div className='flex'>
        <div className="w-full bg-white px-8 pb-8 rounded-md shadow">
            <div className="top-heading ">
                <h3>Profile details</h3>
            </div>
            <div className="flex justify-end">
              {edit ?  
                <button onClick={()=>{
                  setEdit(0)
                  fetchProfile()
                }}
                 className={`${edit ? 'text-green-600 font-semibold ' : 'text-green-500'} hover:font-semibold duration-300 flex items-center gap-1`} ><FaEdit/> Reset </button>
                :
                <button onClick={()=>setEdit(1)} className={`${edit ? 'text-green-600 font-semibold ' : 'text-green-500'} hover:font-semibold duration-300 flex items-center gap-1`} ><FaEdit/> Edit </button>
              }
            </div>
            
        <form onSubmit={handleSubmit}>

            {/* <div className="mb-4 w-full">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                User Email
            </label>
            <input
                type="text"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                disabled={!edit}
                className={inputControl}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div> */}

            <div className="grid sm:grid-cols-2 gap-4">
            {/* Business Phone Number */}
            <div className="mb-4">
            <label htmlFor="business_number" className="block text-sm font-medium text-gray-600">
                Phone Number
            </label>
            <input
                type="text"
                id="business_number"
                name="business_number"
                value={formData.business_number || ''}
                onChange={handleInputChange}
                disabled={!edit}
                className={inputControl}
            />
            {errors.business_number && <p className="text-red-500 text-xs mt-1">{errors.business_number}</p>}
            </div>

            {/* User Name */}
            <div className="mb-4">
            <label htmlFor="business_name" className="block text-sm font-medium text-gray-600">
                Name
            </label>
            <input
                type="text"
                id="business_name"
                name="business_name"
                value={formData.business_name || ''}
                onChange={handleInputChange}
                disabled={!edit}
                className={inputControl}
            />
            {errors.business_name && <p className="text-red-500 text-xs mt-1">{errors.business_name}</p>}
            </div>
            </div>


            {/*   User Address*/}
            {/* <div className="mb-4">
            <label htmlFor="userAddress" className="block text-sm font-medium text-gray-600">
                User Address
            </label>
            <input
                type="text"
                id="userAddress"
                name="userAddress"
                value={formData.userAddress || ''}
                onChange={handleInputChange}
                disabled={!edit}
                className={inputControl}
            />
            </div> */}

            <div className="grid sm:grid-cols-2 gap-4">

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
                disabled={!edit}
                className={inputControl}
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
                disabled={!edit}
                className={inputControl}
            />
            </div>
            </div>

            <div className="m">
            <label htmlFor="contact_details" className="block text-sm font-medium text-gray-600">
                Contact Details
            </label>
            <input
                type="text"
                id="contact_details"
                name="contact_details"
                value={formData.contact_details || ''}
                onChange={handleInputChange}
                disabled={!edit}
                className={inputControl}
            />
            </div>

            <div className="mt-6">
            <button
                type="submit"
                className={btnControl}
                disabled={loading || !edit}
            >
                {loading ? 'Submiting..' : 'Submit'}
            </button>
            </div>
        </form>
        </div>
    </div>
  );
};

export default UserDetails;
