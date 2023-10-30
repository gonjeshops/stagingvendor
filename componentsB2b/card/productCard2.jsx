import Image from "next/image"
import Link from "next/link"
import {  FaStar, FaHeart, FaImage } from "react-icons/fa"
import { truncateText } from "@/lib/truncateText"
import { useRouter } from "next/router"

const ProductCard2 = ({product, shopName, userId, shopId, targetId}) => {
const {description, image, gallery, name, discount, price, slug, shop_id, id, } = product
const router = useRouter()
const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

return (

    <div  className="w-full max-w-sm bg-light200 overflow-hidden rounded-lg border border-light300">

    <div className="relative bg-light300 overflow-hidden h-60 w-full"
        onClick={()=>router.push(`/vendorb2b/products/${slug}?shopId=${shopId}&userId=${userId}&productId=${id}`)}
    >
       {image?.original ? <Image width={150} height={150} className="w-full h-full object-cover hover:scale-110 duration-300" src={image?.original} alt="product image" /> : <div className="centralize text-6xl text-zinc-600">
                <FaImage />
                </div>}
    </div>
    
        <div className="px-4 pt-2 pb-4 space-y-3">
        
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

                <button className="rounded hover-blue py-1  px-2"
                onClick={() => {
                    router.push(`/vendorb2b/products/${slug}?shopId=${shopId}&userId=${userId}&productId=${id}&shop_name=${shopName}`)
                    const element = document.getElementById('top');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}>
                    View
                </button>
                
            </div>
        </div>
    </div>

    )
}

export default ProductCard2