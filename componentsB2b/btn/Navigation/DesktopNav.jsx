import Link from "next/link"
import { MdArrowCircleDown, MdArrowCircleUp } from 'react-icons/md';
import {navLinks} from '../../data/navlinks'
import { useGlobalState } from "@/context/GlobalStateContext"


const DesktopNav = () => {

  const {modalType, openModal} = useGlobalState()

  return (
    <div className=' z-20 bg-light100 text-dark100 '>
        <div className="section-padding relative z-30 flex justify-between items-center py-2">
        <div className="flex space-x-3">
            <div className="text-2xl cursor-pointer" onClick={()=>openModal('cartegory')}>
              {
                modalType==='cartegory' ? (<MdArrowCircleUp/>) : (<MdArrowCircleDown/>)
              }
            </div>
            
            <div className="text-lg "> Supplier Category</div>
        </div> 
        <div className="flex space-x-4">
          {
            navLinks?.map(({title, href} )=> (
                <Link key={title} href={href}>
                    {title}
                </Link>
            ))
          }  
        </div>
        </div>
    </div>
  )
}

export default DesktopNav