import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import { fetchService, vendorUrl } from '@/api';

const ShippingDetails = ({user,}) => {

  const shippingAddress = user?.address?.find(address => address?.type === 'shipping');
  const parsedAddress = shippingAddress ? JSON.parse(shippingAddress?.address) : null;
  console.log('parsedAddress', parsedAddress)

  const [formData, setFormData] = useState({
    apt: '',
    city: '',
    phone: '',
    state: '',
    address: '',
    postcode: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(0);

  useEffect(() => {
    setFormData(parsedAddress)
  }, [parsedAddress?.apt])

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    if (!formData.apt.trim()) {
      newErrors.apt = 'apt is required';
      isValid = false;
    }
    if (!formData.state.trim()) {
      newErrors.state = 'state is required';
      isValid = false;
    }
    if (!formData.postcode.trim()) {
      newErrors.postcode = 'postcode is required';
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

    const newFormData = {
      business_name: user?.business_name || '',
      business_number: user?.business_number  || "",
      longitude: user?.longitude || "",
      latitude: user?.latitude ||"",
      contact_details: user?.contact_details || '',
      shipping_address: formData,
    }

    try {
      const response= await fetchService({
        url: vendorUrl,
        method: 'PUT',
        body: newFormData,
      })
      if (response?.status===200) {
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

  const inputControl = `mt-1 w-full ${!edit ? 'disabled' : ''} input1 ${
    errors.city ? 'border-red-500' : ''
  }`;
  const btnControl = edit ? 'btn2' : 'btn2 disabled';

  return (
    <div className="w-full bg-white px-8 pb-8 rounded-md shadow">
      <div className="top-heading ">
        <h3>Shipping Address</h3>
      </div>
      <div className="flex justify-end">
        {edit ? (
          <button
            onClick={() => {
              setEdit(0);
              // fetchProfile();
            }}
            className={`${edit ? 'text-green-600 font-semibold ' : 'text-green-500'} hover:font-semibold duration-300 flex items-center gap-1`}
          >
            <FaEdit /> Reset
          </button>
        ) : (
          <button
            onClick={() => setEdit(1)}
            className={`${edit ? 'text-green-600 font-semibold ' : 'text-green-500'} hover:font-semibold duration-300 flex items-center gap-1`}
          >
            <FaEdit /> Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Apt */}
        <div className="mb-4">
          <label htmlFor="apt" className="block text-sm font-medium text-gray-600">
            Apt
          </label>
          <input
            type="text"
            id="apt"
            name="apt"
            value={formData?.apt || ''}
            onChange={handleInputChange}
            className={inputControl}
            disabled={!edit}
          />
            {errors.apt && <p className="text-red-500 text-xs mt-1">{errors.apt}</p>}

        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-600">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData?.address || ''}
            onChange={handleInputChange}
            className={inputControl}
            disabled={!edit}
          />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}

        </div>

        {/* City */}
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-600">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData?.city || ''}
            onChange={handleInputChange}
            className={inputControl}
            disabled={!edit}
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>

        {/* State */}
        <div className="mb-4">
          <label htmlFor="state" className="block text-sm font-medium text-gray-600">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData?.state || ''}
            onChange={handleInputChange}
            className={inputControl}
            disabled={!edit}
          />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}

        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Postcode */}
          <div className="mb-4">
            <label htmlFor="postcode" className="block text-sm font-medium text-gray-600">
              Postcode
            </label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={formData?.postcode || ''}
              onChange={handleInputChange}
              className={inputControl}
              disabled={!edit}
            />
            {errors.postcode && <p className="text-red-500 text-xs mt-1">{errors.postcode}</p>}
          </div>
          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData?.phone || ''}
              onChange={handleInputChange}
              className={inputControl}
              disabled={!edit}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className={btnControl}
            disabled={loading || !edit}
          >
            {loading ? 'Saving...' : 'Save Address'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingDetails;
