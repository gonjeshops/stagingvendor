import { useState } from 'react';
import ModalCentral from '../Modal/ModalCentral';
import { FaTimes } from 'react-icons/fa';

const GetQuotes = ({isOpen, closeModal}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const validationErrors = {};
    if (!formData.name) {
      validationErrors.name = 'Please type in the name of your quote request.';
    }
    if (!formData.price) {
      validationErrors.price = 'Price is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Fake API submission (simulating a network delay)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form data submitted:', formData);

    // Reset form data and errors
    setFormData({
      name: '',
      price: '',
    });
    setErrors({});
  };

  return (
    <ModalCentral isOpen={isOpen} closeModal={closeModal} >
    <div className="w-full md:w-[550px] rounded-md py-8 bg-light100 ">
        <div className="flex px-4 justify-between items-center  text-xl font-semibold pb-4">
            <h4>Quote Request</h4>
            <FaTimes onClick={closeModal} className='hover:scale-105 duration-300 cursor-pointer'/>
        </div>

        <form
            onSubmit={handleSubmit}
            className="w-full px-4 sm:px-8 py-6 border-zinc-500  border-y space-y-5"
        >
            <div className="mb-4 h-20">
            <label htmlFor="name" className="block  font-semibold mb-1">
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
            {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
            </div>
            <div className="mb-4 h-20">
            <label htmlFor="price" className="block font-semibold mb-1">
                QUANTITY
            </label>
            <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full p-3 border bg-transparent ${
                errors.price ? 'border-red-500' : 'border-gray-300'
                } rounded focus:outline-none focus:border-blue-500`}
                
            />
            {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
            </div>
            <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-4 rounded w-full font-semibold hover:bg-blue-600"
            >
            Submit
            </button>
        </form>

        <div className="flex justify-end pt-4 px-4">
          <button onClick={closeModal} className='border border-blue-600 py-3 px-6 rounded-md '>Cancel</button>
        </div>
   
    </div>

</ModalCentral>
  );
};

export default GetQuotes;
