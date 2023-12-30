import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUpload, FaImage } from 'react-icons/fa';
import Select from 'react-select';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { LocationSearchInput } from '@/components/ui/GoogleAutoComplete';

const VendorStage2 = ({ formData, setFormData, setisForm2Valid, path }) => {
  const options = [
    { label: "Vendor Seller", value: "store_owner" },
    { label: "Vendor Buyer", value: "vendor_b2b" },
  ];

  const [selected, setSelected] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [filePreview, setFilePreview] = useState('');
  const [errors, setErrors] = useState({
    businessname: '',
    businesslogo: '',
    businessemail: '',
    phonenumber: '',
    address: '',
    zipcode: '',
    services: '',
    acceptedTerms: ''
  });

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (event) => {
    setErrors({ ...errors, businesslogo: '' });
    setSelectedFile('');
    const file = event.target.files[0];
    const maxSize = 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      setErrors({ ...errors, businesslogo: 'File size exceeds the limit (1MB)' });
      setSelectedFile('');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg', 'image/gif', 'image/jpg', /* Add other allowed types if needed */];
    if (!allowedTypes.includes(file.type)) {
      setErrors({ ...errors, businesslogo: 'Only certain image formats (JPEG, SVG, WEBP, PNG, GIF) are allowed' });
      setSelectedFile('');
      return;
    }

    // Convert the selected file to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1]; // Extract the base64 string part
      setFormData({ ...formData, businesslogo: base64String });
      setFilePreview(URL.createObjectURL(file));
    };
    reader.readAsDataURL(file);
  };

  const selectService = (selected) => {
    setSelected(selected);
    setFormData((prev) => {
      return {
        ...prev,
        selectedservice: selected.map((item) => item.value),
      };
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.businessname.trim()) {
      newErrors.businessname = 'Business Name is required';
      isValid = false;
    } else {
      newErrors.businessname = '';
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.businessemail))  {
      newErrors.businessemail = 'Business Email is required';
      isValid = false;
    } else {
      newErrors.businessemail = '';
    }

    if (!formData.phonenumber.trim()) {
      newErrors.phonenumber = 'Phone Number is required';
      isValid = false;
    } else {
      newErrors.phonenumber = '';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Business Address is required';
      isValid = false;
    } else {
      newErrors.address = '';
    }

    if (!formData.zipcode) {
      newErrors.zipcode = 'ZIP is required';
      isValid = false;
    } else {
      newErrors.zipcode = '';
    }

    if (selected.length === 0) {
      newErrors.services = 'You must select at least one service';
      isValid = false;
    } else {
      newErrors.services = '';
    }

    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = 'You must accept the terms and policy'
      isValid = false;
    } else {
      newErrors.acceptedTerms = '';
    }

    setisForm2Valid(isValid);
    setErrors(newErrors);
  };

  const handleRadioInput = () => {
    // Toggle the value of acceptedTerms
    setFormData({ ...formData, acceptedTerms: !formData.acceptedTerms });
  };

  
  return (
    <form className="flex flex-col space-y-4 pt-4 px-3" style={{ width: '100%' }}>
      <div className="space-y-3">
        <div className="flex gap-3 w-full items-center">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden flex justify-center items-center text-zinc-500 bg-light300">
            {filePreview ? (
              <img src={filePreview} className="w-full h-full object-cover" alt="Business Logo" />
            ) : (
              <FaImage size={60} />
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 pt-6 flex justify-center items-center h-full w-full px-8 text-center">
              <div className="">
                <div className="flex items-center justify-center space-x-2">
                  <FaUpload />
                  <h4 className="font-semibold text-base">Upload Business Logo</h4>
                </div>
                <p>Upload 300x300 and a maximum of 500 file size</p>
                {errors.businesslogo && <p style={{ color: 'red' }}>{errors.businesslogo}</p>}
              </div>
            </div>
            <input
              onChange={handleFileChange}
              type="file"
              accept=".jpg, .gif, jpeg, .webp, .svg, .png"
              name="businesslogo"
              value={selectedFile}
              placeholder=""
              className="text-center relative w-full h-28 rounded-md border-dashed border-1 border-gray-400 flex justify-center items-center"
            />
          </div>
        </div>

      
          <div>
            <h1>
              Select Gonje Service{errors.services && <span className="text-red-500">*</span>}
            </h1>
            <Select
              value={selected}
              onChange={selectService}
              options={options}
              className="min-w-96 bg-light100 text-light100 focus:outline-none focus:ring focus:border-green-400"
              placeholder="Select Gonje Service"
              isMulti
            />
          </div>
       

        <div className="">
          <label htmlFor="businessname" className="block text-sm">
            Business Name {errors.businessname && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            required
            name="businessname"
            id="businessname"
            value={formData.businessname}
            placeholder="John"
            className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400"
            onChange={handleChange}
          />
          {/* {errors.businessname && <p className="text-sm text-red-600">{errors.businessname}</p>} */}
        </div>

        <div className="">
          <label htmlFor="businessemail" className="block text-sm">
            Business Email  {errors.businessemail &&<span className="text-red-500">*</span>}
          </label>
          <input
            type="email"
            required
            name="businessemail"
            id="businessemail"
            value={formData.businessemail}
            placeholder="businessemail"
            className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400"
            onChange={handleChange}
          />
          {/* {errors.businessemail && <p className="text-sm text-red-600">{errors.businessemail}</p>} */}
        </div>

        <div className="">
          <label htmlFor="phonenumber" required className="block text-sm">
            Phone Number     {errors.phonenumber &&<span className="text-red-500">*</span>}
          </label>
          <input
            type="tel"
            name="phonenumber"
            id="phonenumber"
            value={formData.phonenumber}
            placeholder="0000000"
            className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400"
            onChange={handleChange}
          />
          {/* {errors.phonenumber && <p className="text-sm text-red-600">{errors.phonenumber}</p>} */}
        </div>

        <div className="form-group">
          <label htmlFor="address" required className="block text-sm">
            Business Address   {errors.address &&<span className="text-red-500">*</span>}
          </label>
          <textarea
            type="text"
            name="address"
            id="address"
            value={formData.address}
            placeholder="My address"
            className="w-full bg-transparent h-16 px-3 py-2 border rounded-md border-gray-400 focus:border-green-400"
            onChange={handleChange}
          />
          {/* {errors.address && <p className="text-sm text-red-600">{errors.address}</p>} */}
        </div>

        <LocationSearchInput/>

        <div className="form-group">
            <label htmlFor="address" required className="block text-sm">
              Business Address   {errors.address &&<span className="text-red-500">*</span>}
            </label>
            <GooglePlacesAutocomplete 
            selectProps={{
              value: formData?.address,
              name: "address",
              onChange: handleChange,
              styles: {
                input: (provided) => ({
                  ...provided,
                  color: '',
                }),
                option: (provided) => ({
                  ...provided,
                  color: '',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'blue',
                }),
              },
            }}
            />
         </div>

        <div className="">
          <label htmlFor="zipcode" required className="block text-sm">
            ZIP  {errors.zipcode &&<span className="text-red-500">*</span>}
          </label>
          <input
            type="number"
            name="zipcode"
            id="zipcode"
            placeholder="0000000"
            value={formData.zipcode}
            className="w-full px-3 py-2 bg-transparent border rounded-md border-gray-400 focus:border-green-400"
            onChange={handleChange}
          />
          {/* {errors.zipcode && <p className="text-sm text-red-600">{errors.zipcode}</p>} */}
        </div>
      </div>

      <div>
        <div className="flex gap-3 items-center">
          <input
            type="radio"
            required
            className="rounded-md border border-gray-500 w-4 h-4"
            onChange={handleRadioInput}
            checked={formData.acceptedTerms}
          ></input>
          <p href="#" className="flex gap-1">
            I accept the <Link href={'#'} className="text-blue-700 focus:underline hover:underline">terms</Link> and{' '}
            <Link href={'#'} className="text-blue-700 focus:underline hover:underline">privacy policy</Link>{' '}
            {errors.acceptedTerms &&  <span className="text-red-500">*</span>}
          </p>
        </div>
        {/* {errors.acceptedTerms && <p className="text-sm text-red-600">{errors.acceptedTerms}</p>} */}
      </div>
    </form>
  );
};

export default VendorStage2;
