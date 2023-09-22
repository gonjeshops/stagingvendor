import {useState, useEffect} from 'react'
import Link from 'next/link'
import { FiMenu,  FiX } from "react-icons/fi"
import { navLinks } from '@/data/navlinks'
import { useGlobalState } from "@/context/GlobalStateContext"
import { MdArrowCircleDown, MdArrowCircleUp } from 'react-icons/md';


const MobileNav = () => {
    const [show, setShow] = useState(false)
    const [showCategory, setShowCategory] = useState(false)
    const {modalType, closeModal, openModal} = useGlobalState()

    const handleClickCategory = () => {
      setShowCategory(true)
      setShow(false)
    }
    
    const handleClickMobileMenu = () => {
      setShowCategory(false)
      setShow(prev=>!prev) 
    }
  return (
    <div className=' relative z-30 bg-light100 text-dark100 section-padding py-4 '>
       
        <div className=" flex justify-between">              
              <div className="flex items-center gap-2 ">
                <div className="text-2xl cursor-pointer" onClick={()=>openModal('cartegory')}>

                    {
                      modalType==='cartegory' ? (<MdArrowCircleUp/>) : (<MdArrowCircleDown/>)
                    }
                  </div>
                  <div className="text-lg ">Supplier Category</div>
              </div> 

          {/* trigger mobile menu bar */}
          <div className="text-2xl cursor-pointer" >

            {
                  modalType==='mobileNav' ? <FiX  onClick={closeModal}/>: <FiMenu onClick={()=>openModal('mobileNav')} />
            }
            </div>
        </div>


        {/* mobile menu */}
        {/* <nav className={`${modalType==='mobileNav' ? 'scale-y-100 w-full grid gap-6 px-4 py-6 shadow-lg rounded-lg ' : 'scale-y-0 '} transition-transform transform duration-500  `}>
            {
                navLinks?.map(({title, href}) => (
                    <Link onClick={()=>setShow(false)} key={title} href={href}
                    className=''
                    >{title}</Link>                  
                ))
            }
        </nav> */}

    </div>
  )
}

export default MobileNav