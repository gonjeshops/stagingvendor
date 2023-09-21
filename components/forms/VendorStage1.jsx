import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
useState

const VendorStage1 = ({formData, setFormData, currentStage, handleNext, handlePrevious}) => {

  return (
    <form className="space-y-3 pt-4 px-3">
      
        <div className="">
          <label htmlFor="fname" className="block text-sm">First Name</label>
          <input type="text" required name="fname" id="fname" placeholder="John" className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400" />
        </div>

        <div className="">
            <label htmlFor="lname" className="block w-full text-sm">Last Name</label>
            <input type="text" required name="lname" id="lname" placeholder="Doe" className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400" />
        </div>

        <div className="">
          <label htmlFor="email" required className="block text-sm">Email Address</label>
          <input type="email" name="email" id="email" placeholder="name@example.com" className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400" />
        </div>

        <div className="grid sm:flex items-center gap-2 w-full  ">
          <div className="w-full">
            <label htmlFor="password" className="text-sm">Password</label>
            <input type="password" required name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md  border-gray-400   focus:border-green-400" />
          </div>

          <div className="w-full">
          <label htmlFor="cpassword" className="text-sm">Confirm Password</label>
          <input type="password" required name="cpassword" id="cpassword" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-400   focus:border-green-400" />
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

export default VendorStage1