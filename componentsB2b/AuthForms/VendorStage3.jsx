import React from 'react'
import Router from "next/router";


const VendorStage3 = ({handleSubmit,successMessage, finalError, loading}) => {



  return (
    <div className='w-full py-14 flex justify-center '>
      <div className="w-[260px] space-y-4">
        <h4 className="font-semibold text-xl">
        You are all set. 
        </h4>
      <p>
        Submit your form to get started.
      </p>
      <button className='py-2 px-8  text-white rounded-md bg-blue-600 hover:bg-blue-500 duration-300'
      // onClick={handleSubmit}
      onClick={handleSubmit}

      >{loading ? 'Loading...' : 'Submit'}</button>
      {finalError && (<p className='text-red text-sm'>{finalError}</p>)}
      {successMessage && (<p className='text-green-600 text-sm'>{successMessage}</p>)}
      </div>
      
    </div>
  )
}

export default VendorStage3