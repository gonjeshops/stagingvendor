import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { register } from '../Api/Api';
// import FacebookLoginComp from '../FacebookLoginComp';
// import GoogleLoginComp from "../GoogleLoginComp";
import Image from "next/image";

const CustomerSignupForm = () => {
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		cpassword: '',
		acceptTerms: false,
	  });
	  const [loading, setLoading] = useState(false);
	  const [error, setError] = useState({});
	  const [successMessage, setSuccessMessage] = useState('');
	  const [showPassword, setShowPassword] = useState(false);
	  const [showCPassword, setShowCPassword] = useState(false);

	  const handleToggleShowPassword = (action) => {
		if(action === 'showCPassword'){
			setShowCPassword(prev => !prev)
		} else {
			setShowPassword(prev=>!prev)
		}
	  }
	
	  const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		const fieldValue = type === 'checkbox' ? checked : value;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: fieldValue }));
	  };

	  const validateForm = (data) => {
		const errors = {};
	
		// Validate required fields
		if (!data.first_name.trim()) {
		  errors.first_name = 'First Name is required';
		}
	
		if (!data.last_name.trim()) {
		  errors.last_name = 'Last Name is required';
		}
	
		if (!data.email.trim()) {
		  errors.email = 'Email Address is required';
		} else if (!isValidEmail(data.email)) {
		  errors.email = 'Invalid Email Address';
		}
	
		if (!data.password.trim()) {
			errors.password = 'Password is required';
		  } else if (!isStrongPassword(data.password.trim())) {
			errors.password = 'Password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, and one number';
		  }
	
		if (!data.cpassword.trim()) {
		  errors.cpassword = 'Confirm Password is required';
		} else if (data.password.trim() !== data.cpassword.trim()) {
		  errors.cpassword = 'Passwords do not match';
		}
	
		if (!data.acceptTerms) {
		  errors.acceptTerms = 'Accept the terms and privacy policy';
		}
		console.log('formValidationError=',  error)
	
		return errors;
	  };
	
	  const isValidEmail = (email) => {
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailPattern.test(email);
	  };

	  const isStrongPassword = (password) => {
		// For example, at least 8 characters, containing at least one uppercase letter, one lowercase letter, and one number
		const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
		return strongPasswordPattern.test(password);
	  };
	
	  const handleSubmit = async (e) => {
		e.preventDefault();
		setError({});
		setSuccessMessage('');
		setLoading(true);
		

		const validationErrors = validateForm(formData);
		if (Object.keys(validationErrors).length > 0) {
		setError(validationErrors);
		setLoading(false);
		} else {
			try {
				const submitData = {
					name: formData.first_name,
					last_name: formData.last_name,
					email: formData.email,
					password: formData.password,
					permission: ['customer']
				}
				console.log('FORMDATA', submitData)
				// setSuccessMessage('Signup successful')

				// API call, 
				const json = await register(submitData);
				if (json.status == 2) {
					setError({ message: json?.message,  });
					console.log('error=', json?.message, ' json.status=', json?.status)
				}  else {
					// setSuccessMessage('Signup successful!',  json.message, );
					setSuccessMessage('Signup successful')
					// apiSetmsgs({
					// msg: json.message,
					// });
					localStorage.setItem("user_detail", JSON.stringify(json));
					console.log('APIDATA', json)
					setFormData({
						first_name: '',
						last_name: '',
						email: '',
						password: '',
						cpassword: '',
						acceptTerms: false,
					  });
				}
			  } catch (error) {
			console.log('catch error',  error,)

				setError({ message: 'Something went wrong' });
			  }
			}	
		setLoading(false);

	  };
	
	  useEffect(() => {
		// Clear success message after 3 seconds
		if (successMessage) {
		  const timer = setTimeout(() => {
			setSuccessMessage('');
		  }, 2000);
		  return () => clearTimeout(timer);
		}
	  }, [successMessage]);
	

  return (
    <div className="w-full rounded-md  text-sm pb-6">

	{/* <div className=" space-y-2">
		<GoogleLoginComp/>
		<FacebookLoginComp/>
	</div> */}
	
	<div className="flex items-center w-full my-3">
		<hr className="w-full  text-gray-400"/>
		<p className="text-gray-400 w-full text-center">or use email</p>
		<hr className="w-full  text-gray-400"/>
	</div>

	<form className="space-y-4 pb-2" onSubmit={handleSubmit}>
        <div className="space-y-3">
		{error.message && (
          <div className="text-red-500 mt-2">
            {error.message}
          </div>
        )}

        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
		<div>
            <label htmlFor="first_name" className="block text-sm">First Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="John"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400"
            />
            {error.first_name && (
              <p className="text-red-500 mt-1">{error.first_name}</p>
            )}
        </div>
          <div>
            <label htmlFor="last_name" className="block text-sm">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Doe"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400"
            />
            {error.last_name && (
              <p className="text-red-500 mt-1">{error.last_name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm">Email Address</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400"
            />
            {error.email && (
              <p className="text-red-500 mt-1">{error.email}</p>
            )}
          </div>

		  <div className="grid sm:flex items-center gap-3 w-full">
            <div className="w-full">
              <label htmlFor="password" className="text-sm">Password</label>
			  <div className="relative">
				<input
                	type={showPassword ? 'text' : "password"}
					name="password"
					id="password"
					placeholder="*****"
					value={formData.password}
					onChange={handleChange}
					className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400"
				/>
				<button
					type="button"
					className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
					onClick={()=>handleToggleShowPassword('showPassword')}
					>
					{showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
				</button>
			  </div>
              {error.password && (
                <p className="text-red-500 mt-1">{error.password}</p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="cpassword" className="text-sm">Confirm Password</label>
			  <div className="relative">
			  <input
                type={showCPassword ? 'text' : "password"}
                name="cpassword"
                id="cpassword"
                placeholder="*****"
                value={formData.cpassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400"
              />
			  <button
					type="button"
					className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
					onClick={()=>handleToggleShowPassword('showCPassword')}
					>
					{showCPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
			  </button>
			  </div>
              
              {error.cpassword && (
                <p className="text-red-500 mt-1">{error.cpassword}</p>
              )}
            </div>
          </div>

		  <div className="">
		  <div className="flex gap-3 items-center">
            <input
              type='checkbox'
              name="acceptTerms"
              id="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="rounded-md border border-gray-500 w-4 h-4"
            />
            <p>
              I accept the <Link href="#" className='text-blue-700 focus:underline hover:underline'>terms</Link> and <Link href="#" className='text-blue-700 focus:underline hover:underline'>privacy policy</Link>
            </p>
          </div>
		  {error.acceptTerms && (
                <p className="text-red-500 mt-1">{error.acceptTerms
				}</p>
              )}
		  </div>
		</div>

        <button
          type="submit"
          className={`w-full text-white px-8 py-2 rounded-md bg-green-600 hover:bg-green-500 duration-300 ${loading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          {loading ? <span className="animate-spin mr-2">&#9696;</span> : null}
          Signup
        </button>
      </form>

	  <p className="text-sm text-center text-gray-400">
        <Link href="/signin/customer" className="focus:underline hover:underline">Sign in to an existing account</Link>
      </p>

</div>
  )
}

export default CustomerSignupForm