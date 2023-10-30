import StarRating from '@/lib/StarRating';
import { useState } from 'react';
import ProductImagesRow from './ProductImagesRow'
import BtnOutline from '../btn/BtnOutline';
import {MdOutlineFavoriteBorder, MdOutlineShoppingCart} from 'react-icons/md';
import BtnOrange from '../btn/BtnOrange';
import Navigate from './Navigate'

import GetQuotes from '../forms/GetQuotesForm';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { truncateText } from '@/lib/truncateText';
import QuoteForm from '../forms/QuoteForm';
import { useGlobalState } from '@/context/GlobalStateContext';


const ProductDetails = ({product, p}) => {
    const {useB2Bcart:{onAdd} , setActive} = useGlobalState()
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter

    const {name, description, price, discount, in_stock, status, created_at, gallery, id, image, is_taxable, max_pric, min_price, sale_price, shop_name, slug, top_deals, unit, } = product
        
    const {rating, heading,  offerEnds, bestseller,off,  imgList} = p[0]

    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const handleImageClick = (index) => {
        setActiveImageIndex(index);
    };


  return (
    <div className=' w-full ' id='top'>

        <button   onClick={router.back} className=" text-blue-600 hover:font-semibold duration-300">{`${ shop_name} product details`}
        </button>
      
       <div className="max-w-[1000px] flex flex-col-reverse md:grid grid-cols-2 gap-8 lg:gap-16 mt-8">
            <div className="">
                
                <div className="h-96 bg-light100 flex justify-center items-center w-full relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 transform ">
                    <Image
                        width={200} height={200}
                        src={gallery[activeImageIndex]?.original ? gallery[activeImageIndex]?.original : image?.original}
                        alt={name}
                        className='w-full h-full object-cover'
                    />
                </div>

                <ProductImagesRow
                    images={gallery}
                    activeIndex={activeImageIndex}
                    onImageClick={handleImageClick}
                />
             </div>

            <div className=" h-full w-full space-y-3">
            <div className="flex gap-2 items-center text-medium">
                <div className='text-yellow-600'><StarRating rating={rating}/></div>
                <p className="text-green-500 text-sm">8756 Lorem ipsum dolor sit amet consectetur.</p>
            </div>

            <h4 className="text-2xl font-semibold">
                {name}
            </h4>
            <h4 className="text-xl font-medium">
                {  truncateText(description, 300)}
                <Link className='text-base font-normal  text-blue-400' href={'#description'}
                onClick={()=>setActive(0)}
                >{'  More'}</Link>
            </h4>
            <div className="flex gap-2 items-center">
                <div className="rounded-full py-1 px-2 text-sm bg-green-500 text-black">{bestseller}</div>
                <p className='text-blue-500'>in Gonje sales analytics 2023</p>
            </div>
            <div className="flex items-center gap-2">
                <h5 className='font-semibold text-5xl'>${price}</h5>
                <h3 className='text-gray-500 text-2xl line-through'>${discount}</h3>
                {/* <h4 className='text-2xl text-yellow-700'>{off}</h4> */}
            </div>
                <p className='text-green-500'>{status}</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui officia tenetur beatae iste voluptas facilis!</p>
                <p className='text-red-500'>Special offer ends in {offerEnds}</p>
            </div>
        </div>


      <div className="items-center  sm:flex gap-6 py-4 grid w-full">
            
            <div className='flex items-center'>
                <BtnOutline link={'#'} color={'orange'}>
                    <div className='flex items-center gap-3'>
                        <MdOutlineFavoriteBorder/> 
                        <p>Add to Wishlist</p>
                    </div>
                </BtnOutline>
            </div>
        
            
            <div className="flex items-center">
            <BtnOrange link={'#'} >
                <div onClick={ () => {
                    onAdd(product, 1, product?.shop_name)
                    setIsOpen(true)
                }} className='flex items-center gap-3'>
                    <MdOutlineShoppingCart/>
                    <p>Add to quote request</p>
                </div>
            </BtnOrange>
            </div>
           
        </div>

        <div id='description' className="py-4">
            <Navigate product={product} targetId={'top'}/>
        </div>
 
        <QuoteForm isOpen={isOpen} closeModal={()=>setIsOpen(false)}  shopName={shop_name} /> 
    </div>
  )
}

export default ProductDetails

