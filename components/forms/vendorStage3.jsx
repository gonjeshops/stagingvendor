import React from 'react'
import Router from "next/router";


const vendorStage3 = ({formData, setFormData, currentStage, handleSubmit, handleNext, handlePrevious}) => {


  return (
    <div className='w-full py-14 flex justify-center '>
      <div className="w-[260px] space-y-4">
        <h4 className="font-semibold text-xl">
        You are all set. 
        </h4>
      <p>
        Now you can access your account from anywhere anytime.
      </p>
      <button className='py-2 px-8  text-white rounded-md bg-blue-600 hover:bg-blue-500 duration-300'
      // onClick={handleSubmit}
      onClick={() => Router.push("/vendor-select")}

      >Submit</button>
      </div>
    </div>
  )
}

export default vendorStage3