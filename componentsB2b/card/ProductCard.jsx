import { useGlobalState } from '@/context/GlobalStateContext'
import Image from 'next/image'
import {FaStar, FaHeart, FaStoreAlt} from 'react-icons/fa'
import ImgCard from './ImgCard'
import { useState } from 'react'
import Link from 'next/link'
import StarRating from '@/lib/StarRating'
import { truncateText } from '@/lib/truncateText'

const ProductCard = ({item}) => {
  const [isLiked, setIsLiked] = useState(false)

  const {name, rating, description,id, slug, price, image,owner_id, shop_id, shop_name, discount} = item


  return (

    <div className="border-b-2 border-light30 hover:shadow-md duration-300">
        <div className="border  w-full rounded flex justify-center items-center overflow-hidden bg-light100 relative">
          <div className="rounded-lg h-40 w-full overflow-hidden">
            <ImgCard src={image?.original} alt={slug} />
          </div>
            <p onClick={()=>setIsLiked(prev=>!prev)} className={`${isLiked ? 'text-blue' : 'text-dark100'} p-2 border rounded-full absolute right-3 top-3` }><FaHeart/> </p>
            
        </div>

        <div className='py-3 flex flex-col justify-between h-48'>
            <div className=" pb-3 ">
                <p className='text-lg font-medium'>{truncateText(name, 60)}</p>
                <div className="flex gap-2">
                    {/* <div className='text-yellow-600'><StarRating rating={3}/></div> */}
                    {/* <p className='text-zinc-400'>rated</p> */}
                </div>
                <p className="">
                  {/* {truncateText(description, 80)} */}
                </p>
                <div className="text-sm text-zinc-400 flex items-center gap-1">
                    <FaStoreAlt/> {shop_name}
                </div>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <h2 className='font-semibold text-xl'>{'$'+price}</h2>
                <h5 className='linethrough text-sm "line-through" text-zinc-400'>{`${discount}% off`}</h5>
              </div>
              <div className=" text-sm flex gap-3 justify-between items-center">
                  <Link href={`/vendorb2b/products/${slug}?shopId=${shop_id}&userId=${owner_id}&productId=${id}&shop_name=${shop_name}`}  className='hover-blue px-4 before:rounded  py-1'>View</Link>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCard