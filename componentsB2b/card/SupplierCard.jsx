import { useGlobalState } from '@/context/GlobalStateContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaImage, FaStar } from 'react-icons/fa'

const SupplierCard = ({ label, item, details }) => {
  const router = useRouter()
  const{setSupplierDetails}=useGlobalState()

  // Function to truncate text to a maximum of 50 characters
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + '...'; // Add ellipsis for truncation
    }
    return text;
  }

  const truncatedDetails = truncateText(details, 120);

  return (
    <div className=' w-full h-[337px] pb-2 border-b  flex flex-col gap-1 justify-between'>
      <div className="space-y-2">
        
     
        <div onClick={() => { 
          setSupplierDetails(item) 
          router.push(`/vendorb2b/suppliers/${item?.slug}?userId=${item?.owner_id}&shopId=${item?.id}`)
          }
        }
         className="border border-zinc-500 p-4 h-44 rounded-lg">
          { item?.logo?.thumbnail ? <div className="bg-yellow-500 h-full overflow-hidden rounded-md ">
            <Image width={250} height={200} src={item?.logo?.thumbnail} className='object-cover w-full h-full hover:scale-105 duration-300' />
          </div> : 
          <div className="bg-green-600 text-green-700 h-full rounded-md flex w-full justify-center items-center ">
            <FaImage size={30} />
          </div>
          }
        </div>
  
    

        <p className='text-base font-medium'>{label}</p>
        <div className="flex gap-2">
          <div className='text-orange-600 text-xl flex gap-0 items-center'>
            <FaStar />
          </div>
          <p className='text-zinc-400'>rated</p>
        </div>
        <p className=''>
          {truncatedDetails}
        </p>
      </div>

      <div className="">
        <Link href={`/vendorb2b/suppliers/${item?.slug}?userId=${item?.owner_id}&shopId=${item?.id}`} className='text-blue-500 hover:text-blue-700 duration-300'
          onClick={()=>setSupplierDetails(item)}
        >
          {`Visit Store >`}
        </Link>
      </div>
    </div>
  )
}

export default SupplierCard
