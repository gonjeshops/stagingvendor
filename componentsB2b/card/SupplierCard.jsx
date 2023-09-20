import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {FaStar} from 'react-icons/fa'



const SupplierCard = ({ label, image, details}) => {
  return (
    <div className='w-full h-[330px] pb-4 border-b flex flex-col justify-between '>
       <div className="space-y-2">
        <div className="shadow-sm border border-zinc-300 p-4 h-40 rounded-lg">
            <div className="bg-zinc-500 h-full rounded-md flex justify-center items-center ">
            <p className="h-10 w-10 rounded-full">a</p>
                    {/* <Image src={image} width={300} height={300}/> */}
            </div>
        </div>
      
        <p className='text-lg font-medium'>{label}</p>
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


        <div className="">
            <Link href={`/suppliers/${label}`} className='text-blue-500 hover:text-blue-700 duration-300'>
                {`Visit Store >`}
            </Link>
        </div>

    </div>
  )
}

export default SupplierCard