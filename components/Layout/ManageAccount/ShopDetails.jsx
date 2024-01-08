import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaEdit } from 'react-icons/fa';

const ShopDetails = ({user, fetchProfile}) => {
  const { push } = useRouter();
  const [edit, setEdit] = useState(0);

  const initialFormData = {
    businessEmail: "johndoe@example.com",
    businessPhoneNumber: "(555) 123-4567",
    name: "Awesome Restaurant",
    description: "A trendy place with a diverse menu",
    address: "123 Main Street, Cityville",
    paymentType: "Credit Card",
    latitude: "40.7128",
    longitude: "-74.0060",
  };

  const clearForm = () => {
    setFormData({
      businessEmail: "",
      businessPhoneNumber: "",
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

  const inputControl = `mt-1 w-full ${!edit ? 'disabled' : ''} input1 ${errors.name ? 'border-red-500' : ''}`;
  const btnControl = edit ? 'btn2' : 'btn2 disabled';

  return (
    <div className="w-full bg-white px-8 pb-8 rounded-md shadow">
      <div className="top-heading ">
        <h3>My Shop Details</h3>
      </div>
      <div className="flex justify-end">
        {edit ? (
          <button
            onClick={() => {
              setEdit(0);
              fetchProfile();
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

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
            <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-600">
                User Email
            </label>
            <input
                type="text"
                id="businessEmail"
                name="businessEmail"
                value={formData.businessEmail || ''}
                onChange={handleInputChange}
                disabled={!edit}
                className={inputControl}
            />
            {errors.businessEmail && <p className="text-red-500 text-xs mt-1">{errors.businessEmail}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="businessPhoneNumber" className="block text-sm font-medium text-gray-600">
                User Phone Number
            </label>
            <input
                type="text"
                id="businessPhoneNumber"
                name="businessPhoneNumber"
                value={formData.businessPhoneNumber || ''}
                onChange={handleInputChange}
                disabled={!edit}
                className={inputControl}
            />
            {errors.businessPhoneNumber && <p className="text-red-500 text-xs mt-1">{errors.businessPhoneNumber}</p>}
          </div>
        </div>


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
            disabled={!edit}
            className={inputControl}
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
            disabled={!edit}
            className={inputControl}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
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
            {loading ? 'Saving...' : 'Save Details'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopDetails;
