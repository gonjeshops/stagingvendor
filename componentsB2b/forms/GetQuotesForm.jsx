import  { useEffect, useState } from 'react';
import ModalCentral from '../Modal/ModalCentral';
import { FaTimes } from 'react-icons/fa';
import Select  from 'react-select';
import CreatableSelect from 'react-select/creatable'
import { createQuoteRequest, fetchQuoteNames } from '../Api2';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const GetQuotes = ({ isOpen, closeModal, productId }) => {
  const router = useRouter()

  const {user} = useGlobalState();
  const [quoteNames, setQuoteNames] = useState(null)
  const [success, setSuccess] = useState('')
  const [reqError, setReqError] = useState('')

  const [darkmode, setDarkmode] = useState('')
  

  useEffect(() => {

    setDarkmode(parseInt(localStorage.getItem('bgLightness')));

    const fetchData = async () => {
      try {
        const response = await fetchQuoteNames();
        if (response?.status===200){
          // setQuoteNames(response?.data?.data)
          console.log('QUOTENAMES API RESPONSE===', response)
          
        } else {
          console.log('QUOTENAMES REQUEST UNKNOWN ERROR=', response)
        }
      } catch (error) {
        console.log('QUOTENAMES REQUEST CATCH ERROR=', error)
      }
    }
    fetchData()
  }, [])

  const quoteNamesOptions = [
    {value: '', label: ''}
  ]
  

  const unitOptions = [
    { value: 'kg', label: 'kg' },
    { value: 'lb', label: 'lb' },
    { value: 'g', label: 'g' },
    { value: 'oz', label: 'oz' },
    { value: 'item', label: 'items' },
    { value: 'stock', label: 'stocks' },
    // Add more units as needed
  ];

  const option2 = [
    { value: 'gsh hbhb jhkfbjsk', label: 'gsh  jhkfbjsk' },
    { value: 'gsh hbfb jhjs', label: 'gs fb jhkfbk' },
    { value: 'gsh hbhfb jhkfbjk', label: 'sh  jhbjsk' },
    { value: 'gsh hbhb jhkfjsk', label: 'gbb jhkfbjsk' },
  ]
  const [formData, setFormData] = useState({
    name: '',
    unit: null,
    productId: productId,
    quantity: '',
    userId: user?.user_id
  });
  const [option, setOption] = useState(null);
  const [x, setX] = useState(null);



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
      unit: selected?.value,
    }));
  };

  const handleSelect2 = (slectedOption2) => {
    setX(slectedOption2)
    setFormData((prevData) => ({
      ...prevData,
      name: slectedOption2?.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null)
    setReqError('')

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
        setSuccess('Quote resquest was successfull.')
        toast.success('Quote resquest was successfull.')
        setTimeout(() => {
          router.push('/vendorb2b/workspace/request-quotes')
        }, 1000);
      } else {
        console.log("Quote resquest API response error:", response);
        toast.error('Server error.')
        setReqError( "Server error. Try again or consult developer.");
      }
    } catch (error) {
      console.error("Quote resquest Catch error:", error);
      setReqError( "Something went wrong. Try again.");
      toast.error('Server error.')


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



  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'inherit',
      color: `${darkmode===25 ? 'white': 'black'}`,
      padding: '0.25rem'
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'inherit',
      color: `${darkmode===25 ? 'white': 'black'}`,
    }),
  };

  return (
    <ModalCentral isOpen={isOpen} closeModal={closeModal}>
      <div className="w-full md:w-[550px] rounded-md py-8 bg-light100">
        <div className="flex px-4 justify-between items-center text-xl font-semibold pb-4">
          <h4>Quote Request</h4>
          <FaTimes onClick={closeModal} className="hover:scale-105 duration-300 cursor-pointer" />
        </div>

        <form onSubmit={handleSubmit} className="w-full px-4 sm:px-8 py-6 border-zinc-500 border-y space-y-5">
        {reqError && <p className="text-red-500 text-sm mt-1">{reqError}</p>}
        {success && <p className="text-green-600 text-sm mt-1">{success}</p>}


          <div className="mb-4 h-20">
            <label htmlFor="name" className="block font-semibold mb-1">
              NAME YOUR QUOTE
            </label>
            <CreatableSelect 
              isClearable
              isSearchable={true}
              placeholder='Select or enter quote name'
              value={x}
              onChange={handleSelect2}
              options={option2}
              className="bg-light100 w-full text-zinc-600 focus:outline-none focus:ring focus:border-blue-300"
              styles={customStyles} 
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

              <CreatableSelect 
                isClearable
                isSearchable={true}
                value={option}
                onChange={handleSelect}
                options={unitOptions}
                className="bg-light100 w-full text-zinc-600 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Select..."
              styles={customStyles} 
                
              />
              {errors.unit && <p className="text-red-500 text-sm mt-1">{errors?.unit}</p>}
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
