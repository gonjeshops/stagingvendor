import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { login } from '../Api/Api'; 

// import FacebookLoginComp from '../FacebookLoginComp';
// import GoogleLoginComp from "../GoogleLoginComp";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';




const VendorLoginForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate the form fields
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

	if (!validateEmail(formData.email)) {
		setError('Invalid email address');
		setLoading(false);
		return;
	}

    try {
      console.log('formData==', formData)

      const json = await login(formData); 
      if (json.status === 1) {
		// Successful login
        setLoading(false);
        // set success message

        localStorage.setItem("user_detail", JSON.stringify(json));
        router.push('/dashboard'); 
      } else {

        setError(json.message);
        setLoading(false);
		console.log('login error= ', json.message)
      }
    } catch (error) {
      setError('Something went wrong');
	  console.log('catch error', error)
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-md space-y-4 gonje-auth-form">
      

      <div className="flex items-center w-full">
        <hr className="w-full dark:text-gray-400" />
        <p className="px-3 dark:text-gray-400 w-full text-center">or use email</p>
        <hr className="w-full dark:text-gray-400" />
      </div>

	  {error && <p className="text-red-500">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm">
            Email address
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md border-gray-400 focus:dark:border-green-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <Link href="#" className="text-xs hover:underline text-gray-500">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="*****"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-400 focus:dark:border-green-400"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={handleToggleShowPassword}
            >
              {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full text-white px-8 py-2 font-semibold rounded-md bg-green-600 ${
            loading ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          {loading ? <span className="animate-spin mr-2">&#9696;</span> : null}
          Sign in
        </button>
      </form>
      <p className="text-sm text-center text-gray-400">
        Don't have an account?{' '}
        <Link href="/signup/vendor" className="focus:underline hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default VendorLoginForm;
