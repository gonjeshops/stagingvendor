import Breadcrumb from '../BreadCrumb'
import {  FiMenu,  FiX } from "react-icons/fi"
import { useGlobalState } from '@/context/GlobalStateContext'
import CurrentDate from '../CurrentDate'

const DashboardHeading = ({children}) => {
  
  const {showSidebar, setShowSidebar} = useGlobalState();

  return (
    <div className="pb-4 space-y-3">
      
      <div className='flex gap-3 items-center'>
        <div className="text-2xl md:hidden cursor-pointer" onClick={()=>setShowSidebar(prev=>!prev)}>
            {
              !showSidebar ? (<FiMenu/>) : (<FiX/>)
            }
        </div>
        <Breadcrumb/>
      </div>   

      <div className="relative flex justify-end right-0">
          <CurrentDate/>
      </div>

        <div className='font-semibold text-3xl '>
          {children}
        </div>      
    </div>
  )
}

export default DashboardHeading