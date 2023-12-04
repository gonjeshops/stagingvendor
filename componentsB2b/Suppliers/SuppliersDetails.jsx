import React from 'react'
import ImgCard from '../card/ImgCard'
import ProductCard2 from '../card/productCard2'
import Image from 'next/image'
import { FaExternalLinkAlt, FaFacebook, FaImage } from 'react-icons/fa'
import DashboardHeading from '../Workspace/DashboardHeading'

const SuppliersDetails = ({supplierData, userId, shopId, }) => {
    const {products=[]} = supplierData
    const supplierDetails = supplierData?.shop
  
    return (
        <>

        <div className="lg:hidden">
            <DashboardHeading></DashboardHeading>
        </div>
        


        <div className='space-y-4'>
        <div className="w-full relative rounded-xl h-60 bg-light300">
           
            <div className="w-full h-full overflow-hidden rounded-xl">
                <img src={supplierDetails?.cover_image?.original} alt="cover_img" className='w-full h-full object-cover'/>
            </div>

            <div className="absolute top-[55%] right-[10%] overflow-hidden rounded-full w-40 h-40  bg-yellow-600">
                {
                    supplierDetails?.logo ? 
                    <Image width={100} height={100} src={supplierDetails?.logo?.thumbnail} alt={'logo'} className='object-cover h-full w-full'/> 
                    : 
                    <div className="centralize text-6xl text-yellow-700">
                        <FaImage />
                    </div> 
                }
            </div>
        </div>
        
            
        <h4 className='font-medium text-3xl pt-10'>{supplierDetails?.name}  </h4>
      
        <div className="border-b pb-4 ">
            <div className="max-w-3xl">
            {supplierDetails?.description} 
            </div>
        </div>

        <div className="border-b pb-4 flex flex-col md:flex-row md:justify-between gap-4 sm:items-start">
            <div className='space-y-2'>
                <div className="flex gap-3 items-center">
                    <p className='font-medium'>Location: </p>
                    <p>{supplierDetails?.address?.street_address} {supplierDetails?.address?.city} {supplierDetails?.address?.state} {supplierDetails?.address?.country}</p>
                </div>
                <div className="flex gap-3 items-center">
                    <p className='font-medium'>Phonenumber:</p>
                    <p> {supplierDetails?.settings?.contact} </p>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                    <p className='font-medium'>Owner_id: </p>
                    <p>GONJE SHOPS {supplierDetails?.id} </p>
                </div>
                <div className="flex gap-3 items-center">
                    <a href={supplierDetails?.settings?.socials[0]?.url} target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={16}/>
                    </a>
                    <a href={supplierDetails?.settings?.website} target="_blank" rel="noopener noreferrer" className='flex items-center gap-1'>
                        Visit Website <FaExternalLinkAlt size={16}/>
                    </a>
                </div>
            </div>
         </div>

         <div>
            <h4 className='font-medium pb-4 text-2xl'>Supplier Product Listing</h4>
            <div className='min-h-96 w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4'>
                {
                    products ? products?.map((item, i)=>(
                        <ProductCard2 key={item.id} product={item} userId={supplierDetails?.owner_id} shopId={supplierDetails?.id} shopName={supplierData?.shop?.name}/>
                    )) 
                    : 
                    <div className='flex justify-center items-center w-full font-medium text-lg'>
                        No product listed
                    </div>
                }

            </div>
         </div>



        
        </div>
        
        
        </>
    
  )
}

export default SuppliersDetails