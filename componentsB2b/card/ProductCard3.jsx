import Image from "next/image"
import Link from "next/link"
import {  FaStar, FaHeart, FaImage, FaStoreAlt, FaCartPlus } from "react-icons/fa"
import { truncateText } from "@/lib/truncateText"
import { useRouter } from "next/router"
import { useGlobalState } from "@/context/GlobalStateContext"

const ProductCard3 = ({product,  userId, shopId, }) => {
const {description, image, gallery, name, discount, price, slug, shop_name, shop_id, id, shop} = product
const router = useRouter()

const {openModal, closeModal, useB2Bcart:{onAdd},  } = useGlobalState()

return (

    <div  className="w-full overflow-hidden  ">
        <div className="relative bg-light300 rounded-lg  overflow-hidden h-24 border border-light300 w-full"
        onClick={()=>router.push(`/vendorb2b/products/shop${slug}?shopId=${shopId || shop?.id}&userId=${userId || shop?.owner_id}&productId=${id}`)}
        >
            {image?.original ? <Image width={150} height={150} className="w-full h-full object-cover hover:scale-110 duration-300" src={image?.original} alt="product image" /> : 
            <div className="centralize text-6xl text-zinc-600"><FaImage /></div>}
        </div>

        <div className="py-2 space-y-2">                
            <div className="">
                <h3 className=" capitalize mb-1 font-semibold tracking-tight">
                {name}
                </h3>
            </div>

            <div className=" flex gap-2 items-center">
                <div className="text- font-bold line-through text-zinc-500 ">${discount}</div>
                <div className="text-lg font-bold ">${price}</div>
            </div>

            <button className="rounded hover-grey border py-2  px-2 w-full text-center"
            onClick={() => {
                closeModal()
                router.push(`/vendorb2b/products/${slug}?shopId=${shopId || shop?.id}&userId=${userId || shop?.owner_id}&productId=${id}&shop_name=${product?.shop_name}`)
                const element = document.getElementById('top');
                if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                }
            }}>
                View details
            </button>
                    
   
            <div className="rounded cursor-pointer hover-blue py-2  px-2 flex justify-center items-center gap-2" 
                onClick={() => {
                    onAdd(product, 1, product?.shop_name, userId, shopId)
                    // setSupplierDetails(shop)
                    // const element = document.getElementById('top');
                    // if (element) {
                    // element.scrollIntoView({ behavior: 'smooth' });
                    // }
                }}>
                <FaCartPlus/> Add to quote
            </div>

        </div>
    
        
    </div>

    )
}

export default ProductCard3
