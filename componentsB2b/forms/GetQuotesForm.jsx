import  { useEffect, useState } from 'react';
import ModalCentral from '../Modal/ModalCentral';
import { FaTimes } from 'react-icons/fa';
import CreatableSelect from 'react-select/creatable'
import { createQuoteRequest, fetchQuoteNames } from '../Api2';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import GetQuoteProductCard from '../card/GetQuoteProductCard';

const GetQuotes = ({ isOpen, closeModal, productId, productData }) => {
  const router = useRouter()

  const {user} = useGlobalState();
  const [quoteNames, setQuoteNames] = useState(null)
  const [success, setSuccess] = useState('')
  const [reqError, setReqError] = useState('')
  const [showMoreProducts, setShowMoreProducts] = useState(false)

  const [darkmode, setDarkmode] = useState('')


  

  useEffect(() => {
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

  const option2 = [
    { value: 'gsh hbhb jhkfbjsk', label: 'gsh  jhkfbjsk' },
    { value: 'gsh hbfb jhjs', label: 'gs fb jhkfbk' },
    { value: 'gsh hbhfb jhkfbjk', label: 'sh  jhbjsk' },
    { value: 'gsh hbhb jhkfjsk', label: 'gbb jhkfbjsk' },
  ]

  const [formData, setFormData] = useState({
    name: '',
    unit: productData?.unit,
    productId: productId,
    quantity: '',
    userId: user?.user_id
  });

  const [slectedProducts, setSlectedProducts] = useState([1,2,3,4,5])


  const [x, setX] = useState(null);
  const [errors, setErrors] = useState({});

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

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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


  return (
    <ModalCentral isOpen={isOpen} closeModal={closeModal}>
      <div className="mx-auto w-full md:w-[650px] max-h-[700px] overflow-y-auto rounded-md py-8 bg-light100">
        <div className="flex px-4 justify-between items-center text-xl font-semibold pb-4">
          <h4>Quote Request</h4>
          <FaTimes onClick={closeModal} className="hover:scale-105 duration-300 cursor-pointer" />
        </div>

        <form onSubmit={handleSubmit} className="w-full px-4 sm:px-8 py-6 border-zinc-500 border-y space-y-5">
        {reqError && <p className="text-red-500 text-sm mt-1">{reqError}</p>}
        {success && <p className="text-green-600 text-sm mt-1">{success}</p>}


          <div className="mb-4 h-20">
            <label htmlFor="name" className="block font-semibold mb-1">
              {/* NAME YOUR QUOTE */}
              Create a new quote or Select a quote
            </label>
            <CreatableSelect 
              isClearable
              isSearchable={true}
              placeholder='Select or enter quote name'
              value={x}
              onChange={handleSelect2}
              options={option2}
              className="bg-light100 w-full text-zinc-600 focus:outline-none focus:ring focus:border-blue-300"
              // styles={customStyles} 
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          { 
          showMoreProducts ? <div className="px-">
            {
              slectedProducts?.map((item, idx) => (
                <GetQuoteProductCard item={productData}/>
              ))
            }

          </div> : null
        }

          <button
            type="submit"
            className="hover-blue py-3 px-4 rounded w-full font-semibold "
          >
            Submit
          </button>
        </form>

        <div className="flex justify-between pt-4 px-4">
            <button onClick={()=>setShowMoreProducts(prev=>!prev)} className="border border-blue-600 py-3 px-6 rounded-md">
                {!showMoreProducts ? 'Add More Products >' : 'Collapse >'}
              </button>
              <button onClick={closeModal} className="border border-blue-600 py-3 px-6 rounded-md">
                Cancel
              </button>
        </div>

      </div>
    </ModalCentral>
  );
};

export default GetQuotes;
