import Link from "next/link"


const OtherWorkspaceLinks = ({handleClick,active,  moduleType, fetchUser, setShowSidebar}) => {
  
  return (
    <>
    <div className=" grid gap- pb-2 ">
      {
          [
            {title: 'Suppliers',link: '/suppliers'},
            {title: 'Products',link: '/products'},
            {title: 'Wishlist',link: '/wishlist'},
            {title: 'Checkout',link: '/checkout'},
            {title: 'Help',link: '/help'},
          ].map(({title,link})=><div onClick={()=>handleClick(title, link)} key={title} className={`text-base w-full cursor-pointer px-10 py-3 rounded flex gap-2 bg-hover300 ${active===title ? 'bg-light300 text-darkt300' : null}`} >{title}</div>)
      }
    </div>
    
    </>

  )
}

export default OtherWorkspaceLinks