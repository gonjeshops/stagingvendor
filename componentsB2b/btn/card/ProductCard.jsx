import { useGlobalState } from '@/context/GlobalStateContext'
import Image from 'next/image'
import {FaStar, FaHeart} from 'react-icons/fa'
import ImgCard from './ImgCard'
import { useState } from 'react'
import Link from 'next/link'
import StarRating from '@/lib/StarRating'

const ProductCard = ({item}) => {
  const [isLiked, setIsLiked] = useState(false)

  const {name, rating, description, slug, price, productImg, oldPrice} = item


  const {useCart} = useGlobalState();
  const {cartItems,addToCart,removeFromCart,reduceItemQuantity,getCartCount,getCartTotalPrice,itemQuantities,} = useCart();

  console.log('cartItme===', cartItems, itemQuantities, )


  return (
    <div className="border-b-2 border-light300">
        <div className=" h-60 w-full rounded flex justify-center items-center overflow-hidden bg-light100 relative">
          <div className="rounded-full h-40 w-40 overflow-hidden">
            <ImgCard src={productImg} alt={name} />
          </div>
            <p onClick={()=>setIsLiked(prev=>!prev)} className={`${isLiked ? 'text-blue' : 'text-dark100'} p-3 border rounded-full absolute right-3 top-3` }><FaHeart/> </p>
            
        </div>

        <div className='py-4 flex flex-col justify-between h-64'>
            <div className="space-y-2">
                <p className='text-base font-medium'>{name}</p>
                <div className="flex gap-2">
                    <div className='text-yellow-600'><StarRating rating={rating}/></div>
                    <p className='text-zinc-400'>rated</p>
                </div>
                <p className="">
                  {description}
                </p>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <h5 className='linethrough text-xl line-through text-zinc-400'>{`${oldPrice}`}</h5>
                <h2 className='font-semibold text-3xl'>{'$'+price}</h2>
              </div>
              <div className=" text-sm flex gap-3 justify-between items-center">
                 <button onClick={()=>addToCart(item)} className="px-4 py-1 rounded mr-2 hover-blue">Add</button>
                  <button onClick={()=>reduceItemQuantity(item.slug)} className="px-4 py-1 rounded hover-red">Remove</button>
                  <Link href={`/products/${slug}`}  className='hover-blue px-4 before:rounded  py-1'>View</Link>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCard