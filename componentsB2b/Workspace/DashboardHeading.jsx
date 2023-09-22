import React from 'react'
import Breadcrumb from '../BreadCrumb'
import { FiAlignJustify, FiMenu,  FiX } from "react-icons/fi"
import { useGlobalState } from '@/context/GlobalStateContext'

const DashboardHeading = ({children}) => {
  
  const {showSidebar, setShowSidebar} = useGlobalState();

  return (
    <div className="pb-4 space-y-4">
      <div className='flex gap-3 items-center'>
        <div className="text-2xl md:hidden cursor-pointer" onClick={()=>setShowSidebar(prev=>!prev)}>
            {
              !showSidebar ? (<FiMenu/>) : (<FiX/>)
            }
        </div>
        <Breadcrumb/>
      </div>      
      <div className='font-semibold text-3xl '>
      {children}
      </div>
      
    </div>
  )
}

export default DashboardHeading