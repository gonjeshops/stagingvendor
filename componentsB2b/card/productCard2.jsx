import Image from "next/image"
import Link from "next/link"
import {  FaStar, FaHeart, FaImage, FaStoreAlt, FaCartPlus } from "react-icons/fa"
import { truncateText } from "@/lib/truncateText"
import { useRouter } from "next/router"
import { useGlobalState } from "@/context/GlobalStateContext"

const ProductCard2 = ({product,  userId, shopId, }) => {
const {description, image, gallery, name, discount, price, slug, shop_name, shop_id, id, shop} = product
const router = useRouter()

const {openModal, closeModal, useB2Bcart:{onAdd},  } = useGlobalState()

return (

    <div  className="w-full max-w-sm bg-light200 overflow-hidden rounded-lg border border-light300">

        <div className="relative bg-light300 overflow-hidden h-60 w-full"
        onClick={()=>router.push(`/vendorb2b/products/shop${slug}?shopId=${shopId || shop?.id}&userId=${userId || shop?.owner_id}&productId=${id}`)}
    >
       {image?.original ? <Image width={150} height={150} className="w-full h-full object-cover hover:scale-110 duration-300" src={image?.original} alt="product image" /> : <div className="centralize text-6xl text-zinc-600">
                <FaImage />
                </div>}
        </div>
    
        <div className="px-4 py-2 space-y-3">
        
            <div className="">
                <h3 className="text-xl capitalize font-semibold tracking-tight">
                {name ? name : slug}
                </h3>
                <h5 className="font-medium text-zinc-500 flex items-center gap-1">
                    <FaStoreAlt/> {shop_name}
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

                <button disabled className=" rounded hover-grey border py-1  px-2"
                onClick={() => {
                    closeModal()
                    router.push(`/vendorb2b/products/${slug}?shopId=${shopId || shop?.id}&userId=${userId || shop?.owner_id}&productId=${id}&shop_name=${product?.shop_name}`)
                    const element = document.getElementById('top');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}>
                    View
                </button>
                
            </div>
        </div>

        <div className="rounded cursor-pointer hover-blue py-2  px-2 mb-2 mx-4 flex justify-center items-center gap-2" 
                onClick={() => {
                    onAdd(product, 1, product?.shop_name, userId, shopId)
                    openModal('quoteform')
                    // setSupplierDetails(shop)
                    const element = document.getElementById('top');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}>
                   <FaCartPlus/> Add to quote
        </div>
    </div>

    )
}

export default ProductCard2
