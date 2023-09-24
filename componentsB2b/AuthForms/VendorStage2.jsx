import  { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUpload, FaImage } from 'react-icons/fa';
import Select from 'react-select';



const VendorStage2 = ({ formData, setFormData, setisForm2Valid, path }) => {

  const options = [
    { label: "Vendor Seller", value: "store_owner" },
    { label: "Vendor Buyer", value: "vendor_b2b" },
   
  ];

  const [selected, setSelected] = useState([ ]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [errors, setErrors] = useState({
    businessname: '',
    businesslogo: '',
    businessemail: '',
    phonenumber: '',
    address: '',
    zipcode: '',
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
      setSelectedFile(null);
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg', 'image/gif', 'image/jpg', /* Add other allowed types if needed */];
    if (!allowedTypes.includes(file.type)) {
      setErrors({ ...errors, businesslogo:'Only certain image formats (JPEG, SVG, WEBP, PNG, GIF) are allowed'});
      setSelectedFile(null);
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
    setFormData(prev=> {
      return {
        ...prev,
        selectedservice: selected.map((item)=>item.value),  
      }
    })
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.businessname.trim()) {
      newErrors.businessname = 'Business Name is required';
      isValid = false;
    }

    if (!formData.businessemail.trim()) {
      newErrors.businessemail = 'Business Email is required';
      isValid = false;
    }

    if (!formData.phonenumber.trim()) {
      newErrors.phonenumber = 'Phone is required';
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Business Address is required';
      isValid = false;
    }

    if (formData.acceptedTerms===false) {
      newErrors.acceptedTerms = 'Accept the terms and policy.';
      isValid = false;
    }

    if (!formData.zipcode.trim()) {
      newErrors.zipcode = 'ZIP is required';
      isValid = false;
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
            { filePreview ? <img src={filePreview} className='w-full h-full object-cover' alt="Business Logo" /> : <FaImage size={60}/>}
          </div>

          <div className='relative '>
          
         
          <div className="absolute inset-0 pt-6 flex justify-center items-center h-full w-full px-8 text-center">
              <div className="">
                <div className="flex items-center justify-center space-x-2">
                  <FaUpload />
                  <h4 className="font-semibold text-base">
                    Upload Business Logo
                  </h4>
                </div>
                <p>
                  Upload 300x300 and maximum of 500 file size
                </p>
                {errors.businesslogo && <p style={{ color: 'red' }}>{errors.businesslogo}</p>}
              </div>
            </div>
            <input onChange={handleFileChange} type='file' accept=".jpg, .gif, jpeg, .webp, .svg, .png" name='businesslogo' value={selectedFile} placeholder='' 
          className="text-center relative w-[60&] h-28 rounded-md border-dashed border-2 border-gray-400  flex justify-center items-center " />

          </div> 
        </div>

        {!path==='supplier' ? <div>
          <h1>Select Gonje Service</h1>
          <Select
            value={selected}
            onChange={selectService}
            options={options}
            className="min-w-96 bg-light100 text-light100 focus:outline-none focus:ring focus:border-green-400"
            placeholder="Select Gonje Service"
            isMulti
          /> 
          
        </div> : null}

        <div className="">
          <label htmlFor="businessname" className="block text-sm">Business Name</label>
          <input type="text" required name="businessname" id="businessname" value={formData.businessname} placeholder="John" className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400" onChange={handleChange} />
          {errors.businessname && <p style={{ color: 'red' }}>{errors.businessname}</p>}
        </div>

        <div className="">
          <label htmlFor="businessemail" className="block text-sm">Business Email</label>
          <input type="email" required name="businessemail" id="businessemail" 
          value={formData.businessemail} placeholder="businessemail" className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400" onChange={handleChange} />
          {errors.businessemail && <p style={{ color: 'red' }}>{errors.businessemail}</p>}
        </div>

        <div className="">
          <label htmlFor="phonenumber" required className="block text-sm">Phonenumber</label>
          <input type="tel" name="phonenumber" id="phonenumber"
          value={formData.phonenumber} placeholder="0000000" className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400" onChange={handleChange} />
          {errors.phonenumber && <p style={{ color: 'red' }}>{errors.phonenumber}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="address" required className="block text-sm">Business Address</label>
          <textarea type="text" name="address" id="address"
          value={formData.address} placeholder="My address" className="w-full h-16 px-3 py-2 border rounded-md border-gray-400 focus:border-green-400" onChange={handleChange} />
          {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
        </div>

        <div className="">
          <label htmlFor="zipcode" required className="block text-sm">ZIP</label>
          <input type="number" name="zipcode" id="zipcode" placeholder="0000000" value={formData.zipcode}  className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400" onChange={handleChange} />
          {errors.zipcode && <p style={{ color: 'red' }}>{errors.zipcode}</p>}
        </div>
      </div>

      <div> 
      <div className="flex gap-3 items-center">
        <input 
        type='radio' 
        required 
        className="rounded-md border border-gray-500 w-4 h-4"
        onChange={handleRadioInput} 
        checked={formData.acceptedTerms}
        ></input>
        <p href="#" className="">
          I accept the <Link href={'#'} className='text-blue-700 focus:underline hover:underline'>terms</Link> and <Link href={'#'} className='text-blue-700 focus:underline hover:underline'>privacy policy</Link>
        </p>
      </div>

      {errors.acceptedTerms && <p style={{ color: 'red' }}>{errors.acceptedTerms}</p>}

      </div>
    </form>
  )
}

export default VendorStage2;
