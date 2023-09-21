import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { login } from '../Api/Api'; 

import FacebookLoginComp from '../FacebookLoginComp';
import GoogleLoginComp from "../GoogleLoginComp";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


const VendorSelect = () => {
 
  return (
    <div className="w-full rounded-md space-y-4 gonje-auth-form">
      
{/* {error && <p className="text-red-500">{error}</p>} */}

      <form className="mr-8 space-y-4 justify-center items-center" >
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm text-center">
            Select Your Service
          </label>
         
        </div>

     

        <button
          type="submit"
          className="w-3/4 text-white px-8 py-2 font-semibold rounded-md bg-green-600"
          
        >
          Vendor Seller
        </button>
        <button
          type="submit"
          className="w-3/4 text-white px-8 py-2 font-semibold rounded-md bg-green-600"
          
        >
          Vendor Buyer
        </button>
      </form>
     
    </div>
  );
};

export default VendorSelect;
