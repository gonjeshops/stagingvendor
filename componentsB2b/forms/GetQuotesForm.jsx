import React, { useState } from 'react';
import ModalCentral from '../Modal/ModalCentral';
import { FaTimes } from 'react-icons/fa';
import Select from 'react-select';
import { createQuoteRequest } from '../Api2';

const GetQuotes = ({ isOpen, closeModal, productId }) => {
  const unitOptions = [
    { value: 'kg', label: 'kg' },
    { value: 'lb', label: 'lb' },
    { value: 'g', label: 'g' },
    { value: 'oz', label: 'oz' },
    // Add more units as needed
  ];

  const [formData, setFormData] = useState({
    name: '',
    unit: null,
    productId: productId,
    quantity: '',
  });
  const [option, setOption] = useState(null);


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelect = (selected) => {
    setOption(selected)
    setFormData((prevData) => ({
      ...prevData,
      unit: selected.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const validationErrors = {};
    if (!formData.name) {
      validationErrors.name = 'Please type in the name of your quote request.';
    }
    if (!formData.unit) {
      validationErrors.unit = 'Please select a unit of measurement.';
    }
    if (!formData.quantity) {
      validationErrors.quantity = 'Quantity is required.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Fake API submission (simulating a network delay)
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form data submitted:', formData);
    try {
      const response = await createQuoteRequest(formData);
      if (response?.status === 200) {
        console.log("API response:", response);
      } else {
        console.log("API response eRROR:", response);
        setErrors(validationErrors.api="Something went wrong. Try again or consult a developer.");
      }
    } catch (error) {
      console.error("Catch error:", error);
      setErrors(validationErrors.api = "Server is not available. Try again or consult a developer.");
    } finally{
    }
    // Reset form data and errors
    setFormData({
      name: '',
      unit: null,
      quantity: '',
    });
    setOption('')
    setErrors({});
  };

  return (
    <ModalCentral isOpen={isOpen} closeModal={closeModal}>
      <div className="w-full md:w-[550px] rounded-md py-8 bg-light100">
        <div className="flex px-4 justify-between items-center text-xl font-semibold pb-4">
          <h4>Quote Request</h4>
          <FaTimes onClick={closeModal} className="hover:scale-105 duration-300 cursor-pointer" />
        </div>

        <form onSubmit={handleSubmit} className="w-full px-4 sm:px-8 py-6 border-zinc-500 border-y space-y-5">
        {errors.api && <p className="text-red-500 text-sm mt-1">{errors.api}</p>}

          <div className="mb-4 h-20">
            <label htmlFor="name" className="block font-semibold mb-1">
              NAME YOUR QUOTE
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border bg-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded focus:outline-none focus:border-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="flex gap-4 w-full">
            <div className="mb-4 w-full">
              <label htmlFor="quantity" className="block font-semibold mb-1">
                QUANTITY
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className={`w-full p-3 border bg-transparent ${
                  errors.quantity ? 'border-red-500' : 'border-gray-300'
                } rounded focus:outline-none focus:border-blue-500`}
              />
              {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
            </div>

            <div className="mb-4 w-full">
              <label htmlFor="unit" className="block font-semibold mb-1">
                UNIT OF MEASUREMENT
              </label>

              <Select
                value={option}
                onChange={handleSelect}
                options={unitOptions}
                className="bg-light100 w-full text-zinc-700 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Select a unit of measurement"
              />
              {errors.unit && <p className="text-red-500 text-sm mt-1">{errors.unit}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-4 rounded w-full font-semibold hover:bg-blue-600"
          >
            Submit
          </button>
        </form>

        <div className="flex justify-end pt-4 px-4">
          <button onClick={closeModal} className="border border-blue-600 py-3 px-6 rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </ModalCentral>
  );
};

export default GetQuotes;
