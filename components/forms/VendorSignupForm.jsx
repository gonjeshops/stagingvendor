import Link from 'next/link'
import VendorStage1 from './VendorStage1'
import VendorStage2 from './vendorStage2';
import VendorStage3 from './vendorStage3';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';



const VendorSignupForm =  ({path}) => {
  
  const [formData, setFormData] = useState({
    stage1Input: { item1: 'u', item2: 'u', item3: 'i', item4: 'u' },
    stage2Input: { item1: 'f', item2: 'f', item3: 'f', item4: 'f' },
    stage3Input: { item1: 'd', item2: 'd', item3: 'd', item4: 'd' },
  });

  const [currentStage, setCurrentStage] = useState(1);
  const router = useRouter();

  const handleChange = () => {

  }

  useEffect(async () => {

    // Retrieve the stage from the query parameter
     const stage = await parseInt(router.query.stage);

    // Update the currentStage based on the query parameter value
    if (stage && stage >= 1 && stage <= 3) {
      setCurrentStage(stage);
    } else if (path === 'supplier') {
      router.push(`/signup/supplier?stage=1`);
    } else {
      router.push(`/signup/vendor?stage=1`);
    }
  }, [router.query.stage]);

  const handleNext = () => {
    if (path === 'supplier') {
       if (currentStage === 1 && formData.stage1Input !== '') {
        setCurrentStage(2);
        router.push(`/signup/supplier?stage=2`);
      } else if (currentStage === 2 && formData.stage2Input !== '') {
        setCurrentStage(3);
        router.push(`/signup/supplier?stage=3`);
      }
    } else {
      if (currentStage === 1 && formData.stage1Input !== '') {
        setCurrentStage(2);
        router.push(`/signup/vendor?stage=2`);
      } else if (currentStage === 2 && formData.stage2Input !== '') {
        setCurrentStage(3);
        router.push(`/signup/vendor?stage=3`);
      }
    }
  };

  const handlePrevious = () => {
    if (path === 'supplier') {
      if (currentStage === 2) {
        setCurrentStage(1);
        router.push(`/signup/supplier?stage=1`);
      } else if (currentStage === 3) {
        setCurrentStage(2);
        router.push(`/signup/supplier?stage=2`);
      }
    } else {
      if (currentStage === 2) {
        setCurrentStage(1);
        router.push(`/signup/vendor?stage=1`);
      } else if (currentStage === 3) {
        setCurrentStage(2);
        router.push(`/signup/vendor?stage=2`);
      }
    }
  };

  const isFormValid = () => {
    if (currentStage === 1) {
      const { item1, item2, item3, item4 } = formData.stage1Input;
      return item1 !== '' && item2 !== '' && item3 !== '' && item4 !== '';
    } else if (currentStage === 2) {
      const { item1, item2, item3, item4 } = formData.stage2Input;
      return item1 !== '' && item2 !== '' && item3 !== '' && item4 !== '';
    } else if (currentStage === 3) {
      const { item1, item2, item3, item4 } = formData.stage3Input;
      return item1 !== '' && item2 !== '' && item3 !== '' && item4 !== '';
    }
  
    return true; // For any other stages, consider the form valid
  };

  const handleSubmit = () => {
    // Submit the formData
    console.log(formData);
  };


  return (
    <div className="w-full rounded-lg  border border-gray-300 text-sm pb-6  ">

      <div className="px-3 sm:px-6 py-4 bg-gray-200">
        <div className="flex justify-between items-center">
          <div className="">
            <p className={`border-2 border-gray-40 w-8 h-8 rounded-full ${
              currentStage >= 1 ? 'bg-blue-500' : 'bg-gray-400'
            }`}></p>
          </div>
          <hr className={`w-full h-2 ${currentStage >= 1 ? 'text-blue-500' : 'text-gray-400'} `}/>
          <div className="">
          <p className={`border-2 border-gray-40 w-8 h-8 rounded-full ${
              currentStage >= 2 ? 'bg-blue-500' : 'bg-gray-400'
            }`}></p>
          </div>
          <hr className={`w-full h-2 font-bold ${currentStage >= 2 ? 'text-blue-500' : 'text-gray-400'} `}/>
          <div className="">
            <p className={`border-2 border-gray-40 w-8 h-8 rounded-full ${
              currentStage === 3 ? 'bg-blue-500' : 'bg-gray-400'
            }`}></p>
          </div>
        </div>
      </div>

      {currentStage === 1 && (
        <VendorStage1 formData={formData} setFormData={setFormData} currentStage={currentStage} handleNext={handleNext} handlePrevious={handlePrevious}   handleSubmit={handleSubmit} />
      )}

      {currentStage === 2 && (
        <VendorStage2 formData={formData} setFormData={setFormData} currentStage={currentStage} handleNext={handleNext} handlePrevious={handlePrevious}    handleSubmit={handleSubmit} />
      )}

      {currentStage === 3 && (
        <VendorStage3 formData={formData} setFormData={setFormData} currentStage={currentStage} handleNext={handleNext} handlePrevious={handlePrevious}    handleSubmit={handleSubmit} />
      )}

      <div className='flex justify-between items-center px-3 mt-3'>
        {/* Previous Button */}
        <div className='w-full'>
        {currentStage > 1 && (
          <button
            className="py-2 disabled:opacity-50"
            onClick={handlePrevious}
          >
            {`<  Previous`}
          </button>
          )}
        </div>

        {/* Next Button */}
        <div className="flex w-full justify-end">
         { currentStage !== 3 && <button
              className={`py-2 px-8  text-white rounded-md duration-300 ${
                 'bg-blue-600 hover:bg-blue-500 duration-300' 
              } disabled:opacity-50`}
              onClick={currentStage === 3 ? handleSubmit : handleNext}
              disabled={!isFormValid()}
            >
              {currentStage === 3 ? 'Submit' : 'Next  >'}
          </button>}
        </div>
      </div> 
          
    </div>
  )
}

export default VendorSignupForm



