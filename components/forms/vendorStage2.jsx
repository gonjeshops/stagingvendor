import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FaUpload } from 'react-icons/fa';
import { useState, useCallback, useEffect } from 'react';
// import { MultiSelect } from "react-multi-select-component";
import GooglePlaceAutoComplete from "./GooglePlaceAutoComplete"; 
import { ShippingAddress } from "../Api/Api";
import { resetData } from "../shared/Function.js";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUser } from "../../actions/users";
import { shipppingDetailValidation } from "../shared/Validation.js";


const options = [
  { label: "------Vendor Seller", value: "b2c" },
  { label: "------Vendor Buyer", value: "b2b" },
];


const vendorStage2 = ({formData, setFormData, currentStage, handleNext, handlePrevious}) => {


  const [addressData, setAddressData] = useState({});

  
  const [selected, setSelected] = useState([
    { label: "Vendor Seller", value: "b2c" },
  ]);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('/favicon.ico');
  const [error, setError] = useState('');

  // const placeholder = selectedFile ? selectedFile : '/favicon.ico'
  const handleFileChange = (event) => {
    setError('')
    setSelectedFile('')
      const file = event.target.files[0];
      // Limit file size (in bytes)
    const maxSize = 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      setError('File size exceeds the limit (1MB)');
      setSelectedFile(null);
      return;
    }

    // Check file type (only allow JPG and PNG)
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPG and PNG files are allowed');
      setSelectedFile(null);
      return;
    }

    // Convert file to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      // Do something with the Base64 string if needed
      setFilePreview(prev=>base64String?base64String:'/favicon.ico')
      console.log(base64String);
    };
    reader.readAsDataURL(file);   
  }


  return (
    <form  className="flex flex-col space-y-4 pt-4 px-3" style={{width: '100%',}} >
      <div className="space-y-3">

        <div className="flex gap-3 w-full items-center">
            <div className="w-[150px] h-[120px] rounded-full overflow-hidden">
              <img src={filePreview} className='w-full h-full object-cover' />
            </div>

            <div className="relative w-[60&] h-28 rounded-md border-dashed border-2 border-gray-400">
              <div className="flex justify-center items-center h-full w-full px-8 text-center">
                  <div className="">
                    <div className="flex items-center justify-center space-x-2">
                      <FaUpload />
                      <h4 className="font-semibold text-base">
                          Upload Business Logo
                      </h4>
                    </div>
                    <p>
                    Upload 300x300 and maximun of 500 file size
                    </p>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                  </div>
              </div>
              <input onChange={handleFileChange} type='file' accept=".jpg, .png" name='businesslogo' value={selectedFile} placeholder= 'insert' className="absolute text-center top-0 left-0 bottom-0 right-0 flex justify-center items-center "/>
            </div>
        </div>
        

        {/* <div className="relative">
          <label for="gonjeservice" className="block text-sm">Select Gonje Service</label>
          <input type="text" required name="gonjeservice" id="gonjeservice" placeholder="gonjeservice" className="w-full px-3 py-2 border  rounded-md border-gray-400 focus:border-green-400" />
        </div> */}
        <div>
      <h1>Select Service</h1>
      {/* <MultiSelect
      className="form-control"
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
        size="50"
      /> */}
    </div>
        <div className="">
          <label for="businessname" className="block text-sm">Business Name</label>
          <input type="text" required name="businessname" id="businessname" placeholder="John" className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400" />
        </div>
        <div className="">
          <label for="businessemail" className="block text-sm">Business Email</label>
          <input type="enail" required name="businessemail" id="businessemail" placeholder="businessemail" className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400" />
        </div>
        <div className="">
          <label for="phonenumber" required className="block text-sm">Phone</label>
          <input type="phonenumber" name="phonenumber" id="phonenumber" placeholder="0000000" className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400" />
        </div>
        <div className="form-group">
      
      </div>
        {/* <div className="">
          <label for="address" required className="block text-sm">Business Address</label>
          <textarea type="text" name="address" id="address" placeholder="My address" className="w-full h-16 px-3 py-2 border rounded-md border-gray-400 focus:border-green-400" >

          </textarea>
        </div> */}
         <div>
        <label>Business Address:</label>
        <GooglePlaceAutoComplete
          setGoogleAddreesObj={(location) => setAddressData(location)}
        />
      </div>
        <div className="">
          <label for="zipcode" required className="block text-sm">ZIP</label>
          <input type="number" name="zipcode" id="zipcode" placeholder="0000000" className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400" />
        </div>
      </div>

      <div className="flex gap-3 items-center">
            <input type='radio' required className="rounded-md border border-gray-500 w-4 h-4"></input>
            <p href="#" className="">
              I accept the <Link href={'#'} className='text-blue-700 focus:underline hover:underline'>terms</Link> and <Link  href={'#'} className='text-blue-700 focus:underline hover:underline'>privacy policy</Link>
            </p>
        </div>

    </form>
  )
}

export default vendorStage2