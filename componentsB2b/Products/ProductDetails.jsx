import StarRating from '@/lib/StarRating';
import { useState } from 'react';
import ProductImagesRow from './ProductImagesRow'
import BtnOutline from '../btn/BtnOutline';
import {MdOutlineFavoriteBorder, MdOutlineShoppingCart} from 'react-icons/md';
import BtnOrange from '../btn/BtnOrange';
import Navigate from './Navigate'
import ModalCentral from '../Modal/ModalCentral';
import GetQuotes from '../forms/GetQuotesForm';
import Link from 'next/link';


const ProductDetails = ({product}) => {
  const [isOpen, setIsOpen] = useState(false)
    
  const {rating, heading, status, offerEnds, bestseller,off, discount, price, imgList} = product[0]

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setActiveImageIndex(index);
  };

    
  return (
    <div className=' '>

        <Link href={'/products'} className=" text-blue-600 hover:font-semibold duration-300">{`<   Back to products`}</Link>
      
       <div className="flex flex-col-reverse md:grid grid-cols-2 gap-8 lg:gap-16 mt-8">
            <div className="">
                <div className="px-4 bg-light200">
                    <div className="h-96 bg-light100 flex justify-center items-center w-full relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 transform ">
                

                    {imgList[activeImageIndex]}
                    {/* <Image
                        src={imgList[activeImageIndex]}
                        alt={product.name}
                        layout="fill"
                        objectFit="contain"
                    /> */}
                </div>

                </div>
                

                <ProductImagesRow
                    images={imgList}
                    activeIndex={activeImageIndex}
                    onImageClick={handleImageClick}
                />
             </div>

            <div className=" h-full w-full space-y-3">
            <div className="flex gap-2 items-center text-medium">
                <p className='text-yellow-600'><StarRating rating={rating}/></p>
                <p className="text-green-500 text-sm">8756 Lorem ipsum dolor sit amet consectetur.</p>
            </div>

            <h4 className="text-2xl font-semibold">
                {heading}
            </h4>
            <div className="flex gap-2 items-center">
                <div className="rounded-full py-1 px-2 text-sm bg-green-500 text-black">{bestseller}</div>
                <p className='text-blue-500'>in Gonje sales analytics 2023</p>
            </div>
            <div className="flex items-center gap-4">
                <h5 className='font-semibold text-5xl'>{price}</h5>
                <h3 className='text-gray-500 text-2xl line-through'>{discount}</h3>
                <h4 className='text-2xl text-yellow-700'>{off}</h4>
            </div>
                <p className='text-green-500'>{status}</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui officia tenetur beatae iste voluptas facilis!</p>
                <p className='text-red-500'>Special offer ends in {offerEnds}</p>
            </div>
        </div>

        <div className="items-center  sm:flex gap-6 py-4 grid w-full">
            
            <div className='flex items-center'>
                <BtnOutline link={'#'} color={'orange'}>
                    <p className='flex items-center gap-3'>
                        <MdOutlineFavoriteBorder/> 
                        <p>Add to Wishlist</p>
                    </p>
                </BtnOutline>
            </div>
        
            
            <div className="flex items-center">
            <BtnOrange link={'#'} >
                <p onClick={()=>setIsOpen(true)} className='flex items-center gap-3'>
                    <MdOutlineShoppingCart/>
                    <p>Add to quote request</p>
                </p>
            </BtnOrange>
            </div>
           
        </div>

        <div className="py-4">
            <Navigate/>
        </div>
        
        {/* Get quotes form with Modal-central */}
        <GetQuotes isOpen={isOpen} closeModal={()=>setIsOpen(false)} />
    </div>
    
  )
}

export default ProductDetails

