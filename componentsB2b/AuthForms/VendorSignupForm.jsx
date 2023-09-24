import Link from 'next/link';
import VendorStage1 from './VendorStage1';
import VendorStage2 from './VendorStage2';
import VendorStage3 from './VendorStage3';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { register } from '../Api/Api';





const submitData = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  cpassword: "",
  selected_service: '',
  business_email: "",
  zip: "",
  brand_logo: "",
  business_number: "",
  contact_details: "",
  business_name: "" ,
  accept_terms: "",
}


const VendorSignupForm = ({ path }) => {
  const [formData, setFormData] = useState({
      fname: "",
      lname: "",
      email: "",
      password: "",
      cpassword: "",
      selectedservice: ['customer', path==='supplier'&&'supplier'],
      acceptedTerms: false,
      businessname: '',
      businesslogo: '',
      businessemail: '',
      phonenumber: '',
      address: '',
      zipcode: '',
  });


  

  const [currentStage, setCurrentStage] = useState(1);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [isForm1Valid, setisForm1Valid] = useState('')
  const [isForm2Valid, setisForm2Valid] = useState('')
  const [finalError, setFinalError] = useState('')

  useEffect(() => {
    const stage = parseInt(router.query.stage);

    if (stage && stage >= 1 && stage <= 3) {
      setCurrentStage(stage);
    } else if (path === 'supplier') {
      router.push(`/signup/supplier?stage=1`);
    } else {
      router.push(`/signup/vendor?stage=1`);
    }
  }, [router.query.stage, path]);

  const handleNext = () => {
    if (path === 'supplier') {
      if (currentStage === 1 && isForm1Valid) {
        setCurrentStage(2);
        router.push(`/signup/supplier?stage=2`);
      } else if (currentStage === 2 && isForm2Valid) {
        setCurrentStage(3);
        router.push(`/signup/supplier?stage=3`);
      }
    } else {
      if (currentStage === 1 && isForm1Valid) {
        setCurrentStage(2);
        router.push(`/signup/vendor?stage=2`);
      } else if (currentStage === 2 && isForm2Valid) {
        setCurrentStage(3);
        router.push(`/signup/vendor?stage=3`);
      }
    }
  };

  const handlePrevious = () => {
    setFinalError('')
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
      return isForm1Valid
    } else if (currentStage === 2) {
      return isForm2Valid
    } 
  }


  const handleSubmit = async () => {
    // Submit the formData
    console.log('Form data submitted:', formData,  isForm1Valid, isForm2Valid);

    setLoading(true)

    if(!isForm1Valid || !isForm2Valid) {
      setFinalError('Some details are missing in the form.')
      setLoading(false);
      
    } else {

      try {
      
        const response = await register({
          name: formData.fname,
          last_name: formData.lname,
          email: formData.email,
          password: formData.password,
          // cpassword: formData.cpassword,
          // selected_service: formData.selectedservice,
          // business_email: formData.businessemail,
          // zip: formData.zipcode,
          // brand_logo: formData.businesslogo,
          business_number: formData.phonenumber,
          contact_details: formData.address,
          business_name: formData.businessname ,
          // accept_terms: formData.acceptedTerms,
          permission: formData.selectedservice,
        });
    
        if (response) {
          // Request was successful (status code 200)
          // const responseData = await response.json();
          console.log('Api Response data:', response);
          setSuccessMessage('Signup successful')
          // Handle the response data as needed
  
        } else {
          // Request failed (status code is not 200)
          console.error('Request failed with status:', response.status);
          
          // You can handle error responses here, e.g., display an error message to the user
        }
      } catch (error) {
        // An error occurred during the request
        console.error('Catch Error:', error);
    
        // You can handle network errors or other exceptions here
      }

    }
  
    setLoading(false)
    

  // router.push('/signin/vendor-select')
  };
  

  return (
    <div className="w-full rounded-lg border border-gray-300 text-sm pb-6 ">
      {/* Progress indicators */}
      <div className="px-3 sm:px-6 py-4 bg-gray-200">
        <div className="flex justify-between items-center">
          {/* Progress indicator for stage 1 */}
          <div className="">
            <p
              className={`border-2 border-gray-40 w-8 h-8 rounded-full ${
                currentStage >= 1 ? 'bg-blue-500' : 'bg-gray-400'
              }`}
            ></p>
          </div>
          <hr
            className={`w-full h-2 ${
              currentStage >= 1 ? 'text-blue-500' : 'text-gray-400'
            } `}
          />
          {/* Progress indicator for stage 2 */}
          <div className="">
            <p
              className={`border-2 border-gray-40 w-8 h-8 rounded-full ${
                currentStage >= 2 ? 'bg-blue-500' : 'bg-gray-400'
              }`}
            ></p>
          </div>
          <hr
            className={`w-full h-2 font-bold ${
              currentStage >= 2 ? 'text-blue-500' : 'text-gray-400'
            } `}
          />
          {/* Progress indicator for stage 3 */}
          <div className="">
            <p
              className={`border-2 border-gray-40 w-8 h-8 rounded-full ${
                currentStage === 3 ? 'bg-blue-500' : 'bg-gray-400'
              }`}
            ></p>
          </div>
        </div>
      </div>

      {/* Render different stages based on currentStage */}
      {currentStage === 1 && (
        <VendorStage1
          formData={formData}
          setFormData={setFormData}
          currentStage={currentStage}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleSubmit={handleSubmit}
          setisForm1Valid={setisForm1Valid}
        />
      )}

      {currentStage === 2 && (
        <VendorStage2
          formData={formData}
          setFormData={setFormData}
          currentStage={currentStage}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          setisForm2Valid={setisForm2Valid}
          handleSubmit={handleSubmit}
          path={path}

        />
      )}

      {currentStage === 3 && (
        <VendorStage3
          formData={formData}
          setFormData={setFormData}
          currentStage={currentStage}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          finalError={finalError}
          handleSubmit={handleSubmit}
        />
      )}

      {/* Previous and Next buttons */}
      <div className="flex justify-between items-center px-3 mt-3">
        {/* Previous Button */}
        <div className="w-full">
          {currentStage > 1 && (
            <button className="py-2" onClick={handlePrevious}>
              {'< Previous'}
            </button>
          )}
        </div>

        {/* Next Button */}
        <div className="flex w-full justify-end">
          {currentStage !== 3 && (
            <button
              className={`py-2 px-8 text-white rounded-md ${
                isFormValid()
                  ? 'bg-blue-600 hover:bg-blue-500'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              onClick={currentStage === 3 ? handleSubmit : handleNext}
              disabled={!isFormValid() || loading}
            >
              {currentStage === 3 ? loading ? 'Submit...' : 'Submit'  : 'Next >'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorSignupForm;
