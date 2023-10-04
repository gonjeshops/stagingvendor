import React from 'react'
import ImgCard from '../card/ImgCard'
import ProductCard2 from '../card/productCard2'
import Image from 'next/image'

const SuppliersDetails = ({supplierData, userId, shopId, }) => {
    const {products=[]} = supplierData
  
  console.log('DDD=', supplierData)
  
    return (
    <div className='space-y-4'>
        <div className="w-full relative rounded-xl h-60 bg-light300">
        <div className="absolute top-[55%] right-[10%] overflow-hidden rounded-full w-40 h-40  bg-yellow-600">
                <Image width={100} height={100} src={supplierData?.logo} alt={'logo'} className='object-cover'/>
            </div>
        </div>
        
            
        <h4 className='font-medium text-3xl'>{supplierData?.name} Lorem Empire </h4>
      
        <div className="border-b pb-4 ">
            <div className="max-w-3xl">
            {supplierData?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, similique sint! Sit magni modi doloremque asperiores vero nesciunt iste corrupti! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam dolores natus voluptatem incidunt quod voluptates excepturi assumenda iure tenetur suscipit!
            </div>
        </div>

        <div className="border-b pb-4 flex flex-col md:flex-row md:justify-between gap-4 sm:items-start">
            <div className='space-y-2'>
                <div className="flex gap-3 items-center">
                    <p className='font-medium'>Location: </p>
                    <p>{supplierData?.address}Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio, nemo</p>
                </div>
                <div className="flex gap-3 items-center">
                    <p className='font-medium'>Phonenumber:</p>
                    <p> {''} +44-000000001</p>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <p className='font-medium'>Owner_id: </p>
                <p>{supplierData?.owner_id} GS876</p>
            </div>
         </div>

         <div>
            <h4 className='font-medium pb-4 text-2xl'>Supplier Product Listing</h4>
            <div className='min-h-96 w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4'>
                {
                    products ? products?.map((item, i)=>(
                        <ProductCard2 key={item.id} product={item} userId={userId} shopId={shopId}/>
                    )) 
                    : 
                    <div className='flex justify-center items-center w-full font-medium text-lg'>
                        No product listed
                    </div>
                }

            </div>
         </div>



        
    </div>
  )
}

export default SuppliersDetails