import Link from "next/link"


const OtherWorkspaceLinks = ({handleClick,active,  moduleType, fetchUser, setShowSidebar}) => {
  
  return (
    <>
    <div className=" grid gap- pb-2 ">
      {
          [
            {title: 'Suppliers',link: '/vendorb2b/suppliers'},
            {title: 'Products',link: '/vendorb2b/products'},
            {title: 'Wishlist',link: '/vendorb2b/wishlist'},
            {title: 'Checkout',link: '/vendorb2b/checkout'},
            {title: 'Help',link: '/vendorb2b/help'},
          ].map(({title,link})=><div onClick={()=>handleClick(title, link)} key={title} className={`text-base w-full cursor-pointer px-10 py-3 rounded-l-full flex gap-2 bg-hover100 ${active===title ? 'bg-light100 text-darkt300' : null}`} >{title}</div>)
      }
    </div>
    
    </>

  )
}

export default OtherWorkspaceLinks