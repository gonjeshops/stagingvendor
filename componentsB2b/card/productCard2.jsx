import Link from "next/link"
import { FaCartPlus, FaStar } from "react-icons/fa"

const ProductCard2 = ({product}) => {
const {description, image, gallery, price, slug, shop_id, id, } = product

    return (

<div class="w-full max-w-sm bg-light200 overflow-hidden rounded-lg ">

  <div className="overflow-hidden h-60 w-full pb-2">
    <img class="w-full h-full object-cover" src={image?.thumbnail} alt="product image" />
  </div>
  
    <div class="px-4 pb-4">
      
        <h5 class="text-xl capitalize font-semibold tracking-tight">
           {slug}
        </h5>
        <p>{description}</p>
      
        <div class="flex items-center mt-2.5 mb-5">
            <FaStar  className="text-yellow-500 "/>
            <FaStar  className="text-yellow-500 "/>
            <FaStar  className="text-yellow-500 "/>
            <FaStar  className="text-yellow-500 "/>
            <FaStar  className="text-yellow-500 "/>
           
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">5.0</span>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold ">${price}</span>
            <Link href="#" class="text-xl hover:scale-105 duration-300">
                <FaCartPlus/>
            </Link>
        </div>
    </div>
</div>

    )
}

export default ProductCard2