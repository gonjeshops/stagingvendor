import Link from "next/link"
import { FaHeart, FaQuestionCircle, FaShoppingCart, FaStore } from "react-icons/fa"
import { MdShoppingCart } from "react-icons/md"



const OtherWorkspaceLinks = ({handleClick,active,  moduleType, fetchUser, setShowSidebar}) => {
  
  return (
    <>
    <div className=" grid gap- pb-2 ">
      {
          [
            {title: 'Suppliers',link: '/vendorb2b/suppliers', icon: <FaStore/>},
            {title: 'Products',link: '/vendorb2b/products', icon: <MdShoppingCart/>},
            // {title: 'Wishlist',link: '/vendorb2b/wishlist', icon: <FaHeart/>},
            // {title: 'Checkout',link: '/vendorb2b/checkout', icon: <FaShoppingCart/>},
            // {title: 'Help',link: '/vendorb2b/help', icon: <FaQuestionCircle/>},
          ].map(({title,  icon, link})=>
          <div onClick={()=>handleClick(title, link)} key={title} className={`flex items-center gap-2 text-base w-full cursor-pointer px-10 py-3 rounded-l-full bg-hover100 ${active===title ? 'bg-light100 text-darkt300' : null}`} >
              <p className="text-2xl">{icon}</p>
            <p>{title}</p>
          
          </div>)
      }
    </div>
    
    </>

  )
}

export default OtherWorkspaceLinks