import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaEdit, FaFacebook, FaInstagram, FaTwitter, FaWeebly, FaWeibo } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { fetchService, shopUrl } from '@/api';

const ShopDetails = ({user, fetchProfile}) => {
  const { push } = useRouter();
  const [edit, setEdit] = useState(0);

  const initialFormData = {
    name: user?.shops?.[0]?.name || "",
    contact: user?.shops?.[0]?.settings?.contact || "",
    description: user?.shops?.[0]?.description || "",
    zip: user?.shops?.[0]?.address?.zip || "",
    city: user?.shops?.[0]?.address?.zip || "",
    state: user?.shops?.[0]?.address?.zip || "",
    country: user?.shops?.[0]?.address?.zip || "",
    street_address: user?.shops?.[0]?.address?.street_address || "",
    latitude: user?.shops?.[0]?.latitude || "",
    longitude: user?.shops?.[0]?.longitude || "",
    paymentType: user?.shops?.[0]?.payment_type || "",
    facebook: "https//facebook.com/",
    instagram: "https//instagram.com/",
    twitter: "https//twitter.com/",
    // twitter: user?.shops?.[0]?.settings?.twitter || "",
    website: user?.shops?.[0]?.settings?.website || "",
  };

  let r= {
    "name": "My Shop",
    "description": "A wonderful shops?.[0]",
    "address": {
      "zip": "6892",
      "city": "Lincoln",
      "state": "Illinois",
      "country": "USA",
      "street_address": "4885  Spring Street"
    },
    "settings": {
      "contact": "21342121221",
      "socials": [
        {
          "url": "https://www.instagram.com/",
          "icon": "InstagramIcon"
        }
      ],
      "website": "https://redq.io/",
      "location": {
        "lat": 40.757272,
        "lng": -74.089508,
        "city": "Kearny",
        "state": "NJ",
        "country": "United States",
        "formattedAddress": "New Jersey Turnpike, Kearny, NJ, USA"
      }
    },
    "payment_type": "Credit Card",
    "latitude": "34.0522",
    "longitude": "-118.2437"
  }

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(initialFormData)
  }, [user?.id])

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Shop name is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Shop description is required';
      isValid = false;
    }

    if (!formData.contact) {
      newErrors.contact = 'Shop contact is required';
      isValid = false;
    }

    if (!formData.zip) {
      newErrors.zip = 'Shop full address is required';
      isValid = false;
    }

    if (!formData.street_address.trim()) {
      newErrors.street_address = 'Shop full address is required';
      isValid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Shop full address is required';
      isValid = false;
    }

    if (!formData.state.trim()) {
      newErrors.state = 'Shop full address is required';
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
        url: shopUrl,
        method: 'PUT',
        body: {
          "name": formData?.name,
          "description": formData?.description,
          "address": {
            "zip": formData?.zip,
            "city": formData?.city,            "state": formData?.sate,
            "country": formData?.country,
            "street_address": formData?.street_address
          },
          "settings": {
            "contact": formData?.contact,
            "socials": [
              {
                "url": formData.facebook,
                "icon": "facebook"
              },
              {
                "url": formData.instagram,
                "icon": "instagram"
              },
              {
                "url": formData.twitter,
                "icon": "twitter"
              },
            ],
            "website": formData?.website,
            "location": {
              "lat": formData?.latitude,
              "lng": formData?.longitude,
              "city": formData?.city,
              "state": formData?.state,
              "country": formData?.country,
              "formattedAddress": `${formData?.street_address} ${formData?.city} ${formData?.state} ${formData?.country}.`
            }
          },
          "payment_type": formData?.payment_type,
          "latitude": formData?.latitude,
          "longitude": formData?.longitude,
        },
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
          <div className="mb-4">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-600">
                Phone Number
            </label>
            <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact || ''}
                onChange={handleInputChange}
                disabled={!edit}
                className={inputControl}
            />
            {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
          </div>
        </div>


        {/* Shop Name */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Shop Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
            disabled={!edit}
            className={inputControl}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="">
            <label htmlFor="street_address" className="block text-sm font-medium text-gray-600">
              Street Address
            </label>
            <input
              type="text"
              id="street_address"
              name="street_address"
              value={formData.street_address || ''}
              onChange={handleInputChange}
              disabled={!edit}
              className={inputControl}
            />
            {errors.street_address && <p className="text-red-500 text-xs mt-1">{errors.street_address}</p>}
          </div>

          <div className="">
            <label htmlFor="zip" className="block text-sm font-medium text-gray-600">
              zip
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip || ''}
              onChange={handleInputChange}
              disabled={!edit}
              className={inputControl}
            />
            {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
          </div>

          <div className="">
            <label htmlFor="city" className="block text-sm font-medium text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city || ''}
              onChange={handleInputChange}
              disabled={!edit}
              className={inputControl}
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          <div className="">
            <label htmlFor="state" className="block text-sm font-medium text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state || ''}
              onChange={handleInputChange}
              disabled={!edit}
              className={inputControl}
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>

          <div className="">
            <label htmlFor="country" className="block text-sm font-medium text-gray-600">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country || ''}
              onChange={handleInputChange}
              disabled={!edit}
              className={inputControl}
            />
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
          </div>
          
          <div className="">
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

          <div className="">
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
        </div>

        <div className="">
          <h5 className="mb-2">Enter url</h5>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex gap-2 items-center">
              <label htmlFor="website" className="block font-medium text-gray-600">
                <FaWeibo size={20}/>
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website || ''}
                onChange={handleInputChange}
                disabled={!edit}
                className={inputControl}
              />
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="facebook" className="block font-medium text-gray-600">
                <FaFacebook size={20}/>
              </label>
              <input
                type="text"
                id="facebook"
                name="facebook"
                value={formData.facebook || ''}
                onChange={handleInputChange}
                disabled={!edit}
                className={inputControl}
              />
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="instagram" className="block font-medium text-gray-600">
                <FaInstagram size={20}/>
              </label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram || ''}
                onChange={handleInputChange}
                disabled={!edit}
                className={inputControl}
              />
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="twitter" className="block font-medium text-gray-600">
                <FaTwitter size={20}/>
              </label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                value={formData.twitter || ''}
                onChange={handleInputChange}
                disabled={!edit}
                className={inputControl}S
              />
            </div>
          </div>

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
