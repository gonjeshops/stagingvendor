import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";



const BillingDetails = () => {

      const { push } = useRouter();
    
      const initialFormData = {
        apt: "5",
        city: "Chandigarh",
        phone: "+918978907071",
        state: "Punjab",
        address: "Akoka, Yaba, Lagos Mainland",
        postcode: "69678971",
      };
    
      const clearForm = () => {
        setFormData({
          apt: '',
          city: '',
          phone: '',
          state: '',
          address: '',
          postcode: '',
        });
      };
    
      const [formData, setFormData] = useState(initialFormData);
      const [errors, setErrors] = useState({});
      const [loading, setLoading] = useState(false);
    
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
        //   const { data, error } = await updateItem('shipping_addresses', formData, 'id', 1);
        //   if (data) {
        //     clearForm();
        //     setErrors({});
        //     push('/order/success');
        //     toast.success('Shipping address saved successfully');
        //   } else {
        //     console.log(error);
        //     toast.error('Failed to save shipping address');
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
            <h3>Billing Address</h3>
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
                value={formData.apt || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
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
                value={formData.address || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
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
                value={formData.city || ''}
                onChange={handleInputChange}
                className={`mt-1 p-2 border rounded-md w-full ${errors.city ? 'border-red-500' : ''}`}
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
                value={formData.state || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Postcode */}
                <div className="mb-4">
                <label htmlFor="postcode" className="block text-sm font-medium text-gray-600">
                    Postcode
                </label>
                <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={formData.postcode || ''}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                />
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
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    className={`mt-1 p-2 border rounded-md w-full ${errors.phone ? 'border-red-500' : ''}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
            </div>
    
            <div className="mt-6">
              <button
                type="submit"
                className="bg-green-600 text-white w-full px-4 py-2 rounded-md"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Address'}
              </button>
            </div>
          </form>
        </div>
      );
    };

    
export default BillingDetails