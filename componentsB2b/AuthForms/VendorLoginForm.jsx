import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { login } from '../Api/Api'; 
// import FacebookLoginComp from '../FacebookLoginComp';
// import GoogleLoginComp from "../GoogleLoginComp";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { determineRouteBasedOnPermissions } from './selectRoute';
import { toast } from 'react-toastify';
import { BtnSpinner } from '../Loader/Spinner/BtnSpinner';
import { Input } from '@/components/ui/input';

const VendorLoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('')

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
    const json = await login(formData);
  
    if (json?.status === 1) {
      if (json?.permissions.includes("store_owner") || json?.permissions.includes("vendor_b2b")) {
        setSuccessMessage(json?.message);
        localStorage.setItem("user_detail", JSON.stringify(json));
  
        if (json?.permissions.includes("store_owner")) {
          if (!!json?.shop_id && !!json?.shop_status) {
            // router.push("/dashboard");
            localStorage.setItem("loginAs", "store_owner");
          } else {
            toast.error("You have no assigned shop for now");
          }
        } else if (json?.permissions.includes("staff")) {
          router.push({
            pathname: "/employee_timesheet",
            query: { id: json?.user_id || "" },
          });
          localStorage.setItem("loginAs", "staff");
        }
        router.push('/signin/vendor-select');
        localStorage.setItem("shop_id", json?.shop_id);
      } else {
        setError("You don't have permission to login");
      }
    } else {
      setError(json?.message);
      console.log('login error=', json?.message);
    }
  } catch (error) {
    setError('Something went wrong');
    console.log('catch error', error);
  } finally {
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

	  {error && <p className="text-red-600">{error}</p>}
	  {successMessage && <p className="text-green-600">{successMessage}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2 bg-white">
          <label htmlFor="email" className="block text-sm">
            Email address
          </label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            className=" input w-full  px-3 py-4 border rounded-md border-gray-400 focus:dark:border-green-400"
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
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="*****"
              value={formData.password}
              onChange={handleChange}
              className="w-full  px-3 py-4 border rounded-md dark:border-gray-400 focus:dark:border-green-400"
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
          className={`w-full text-white px-8 py-3 font-semibold rounded-md bg-green-600 ${
            loading ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          {/* {loading ? <span className="animate-spin mr-2">&#9696;</span> : null} */}
          {loading ? <BtnSpinner/> : 'Sign in'}
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
