import Image from "next/image"
import Link from "next/link"
import { FaCartPlus, FaStar, FaHeart, FaImage } from "react-icons/fa"

const ProductCard2 = ({product, userId, shopId, }) => {
const {description, image, gallery, name, discount, price, slug, shop_id, id, } = product



  // Function to truncate text to a maximum of 50 characters
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + '...'; // Add ellipsis for truncation
    }
    return text;
  }


return (

    <div  className="w-full max-w-sm bg-light200 overflow-hidden rounded-lg ">

    <div className="relative bg-light300 overflow-hidden h-60 w-full pb-2">
       {image?.thumbnail ? <Image width={100} height={100} className="w-full h-full object-cover" src={image?.thumbnail} alt="product image" /> : <div className="centralize text-6xl text-zinc-600">
                <FaImage />
                </div>}
    </div>
    
        <div className="px-4 pb-4 space-y-3">
        
            <div className="">
                <h3 className="text-xl capitalize font-semibold tracking-tight">
                {name ? name : slug}
                </h3>
                <h5 className="font-medium text-zinc-500">
                    Supplier-name
                </h5>
            </div>

            <p>{truncateText(description, 120)}</p>
        
            <div className="flex items-center justify-between">
                <div className="flex gap-1 items-center ">
                    <FaStar  className="text-yellow-500 " size={16}/>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-1 pt-1 rounded ">5.0</span>
                </div>

            <div className="text-xl flex gap-2 items-center">
                    <button className="text-xl hover:scale-105 duration-300">
                        <FaHeart/>
                    </button>
                </div>
           </div>


            <div className="flex items-center justify-between">
            
                <div className=" flex gap-2 items-center">
                    <div className="text-xl font-bold line-through text-zinc-500 ">${discount}</div>
                    <div className="text-3xl font-bold ">${price}</div>
            </div>

                <Link href={`/vendorb2b/products/${slug}?shopId=${shopId}&userId=${userId}&productId=${id}`} className="rounded hover-blue py-1  px-2">
                    View
                </Link>
                
            </div>
        </div>
    </div>

    )
}

export default ProductCard2