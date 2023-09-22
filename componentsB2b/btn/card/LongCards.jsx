import Image from 'next/image'
import React from 'react'

import {FaStar} from 'react-icons/fa'
import {MdOutlineFavoriteBorder, } from 'react-icons/md'


const LongCards = ({ label, image, details}) => {
  return (
    <div className='sm:w-72 w-96 h-[465px] flex-shrink-0 flex flex-col justify-between '>
       <div className="space-y-4">
       <div className="bg-white  rounded h-64 shadow-sm flex justify-center items-center relative">
        <div className="border cursor-pointer p-2 rounded-full text-blue-600 border-blue-600 absolute right-3 text-xl top-3">
          <MdOutlineFavoriteBorder/>
        </div>
          <Image src={image} width={300} height={300} alt='product'/>
        </div>
        <p>{label}</p>
        <div className="flex gap-2">
            <div className='text-orange-600 text-xl flex gap-0 items-center' >
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStar/>
            </div>
            <p className='text-zinc-400'>rated</p>
        </div>
        <p className=''>
              {details}
            </p>
       </div>
        <div className="flex flex-col h- justify-between">
            
            <div>
              <div className="flex gap-3 items-center">
                  <h4 className='line-through text-zinc-400 text-2xl'>{`$125.00`}</h4>
                  <h5 className='font-semibold text-4xl'>0.60</h5>
              </div>
              <p className="text-zinc-400">2 colors</p>
            </div>
        </div>

        </div>
  )
}

export default LongCards