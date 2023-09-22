import SkeletonLoader from "../Loader/SkeletonLoader";
import {AiOutlineCloseCircle} from 'react-icons/ai'
import SearchBar from "../Navigation/SearchBar";
import { useGlobalState } from '@/context/GlobalStateContext';


const ModalSearchBox = ({ stopPropagation }) => {
  const {modalType, closeModal} = useGlobalState()

  return (
      <div onClick={closeModal} className={`${modalType==='searchbox' ? 'opacity-100 scale-y-100' : 'opacity-50 scale-y-0' } transition-transform transform duration-500 absolute inset-0  top-20 z-50`}
    style={{transformOrigin:'50px 50px '}}
    > 
          
          {/* <div className=" absolute inset-0"> */}
            <div onClick={stopPropagation} className="shadow-xl bg-light100   w-full  rounded-lg px-4 py-14  h-full"> 
                 <button onClick={closeModal} className=" md:block hidden pb-2 hover:scale-105 duration-300 ">
                  <AiOutlineCloseCircle size={24}/>
                </button> 
                <div   className="section-padding  text-sm">
                    <div className="md:hidden pb-4"><SearchBar/></div>
                    <SkeletonLoader/>
                </div>
                
            </div>
 {/* </div>  */}
      </div>
  )
}

export default ModalSearchBox