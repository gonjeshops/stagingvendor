import Image from 'next/image';
import { FiBell, FiHeart, FiSearch, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';
import DesktopNav from './DesktopNav';
import SearchBar from './SearchBar';
import MobileNav from './MobileNav';
import { useGlobalState } from '@/context/GlobalStateContext';
import Link from 'next/link';



const Navigation = ({themeBtn}) => {
  const{module, closeModal, openModal, modalType} = useGlobalState();
  
  return (
    <div className=' border-  w-full'>
     <nav className=" section-padding z-50 ">
        <div className="  flex h-20  w-full items-center justify-between space-x-4">

            <div className=" flex space-x-3  flex-shrink-0 selection:items-center">
              <Link href={'/'} className=''> 
                <img
                    className='w-20  lg:w-24'
                    src="/logo.png"
                    alt="Logo"
                  />
                </Link >
                <h4 className='font-medium text-base capitalize pt-4 md:pt-5'>
                {module.moduleType}
              </h4>
        
            </div>

            <div className='w-full hidden sm:block'>
              <SearchBar onFocus={()=>openModal('searchbox')}/>
            </div>
            
           
            <div className=" justify-end">
              <ul className="flex justify-end items-center space-x-2 md:space-x-3 text-xl">
              
                <button className="sm:hidden">
                  {modalType==='searchbox' ? <FiX width={20} onClick={closeModal}/> :  <FiSearch width={20} onClick={()=>openModal('searchbox')}/>  }
                </button>
              

                {themeBtn}

               {module.moduleType==='vendor' && 
               
               <button className='relative' onClick={ () => openModal('wishlist')} >
                  <FiHeart   className={modalType==='wishlist' && ' text-green-600 scale-110  '}/>
                  <div className="rounded-full h-5 w-5 text-white bg-green-600 flex items-center justify-center absolute top-[-10px] right-[-8px] text-[10px] ">2</div>
                </button>}

                <button className='relative' onClick={ () => openModal('cart')} >
                  <FiShoppingCart   className={modalType==='cart' && ' text-green-600 scale-110  '}/>
                  <div className="rounded-full h-5 w-5 text-white bg-red-600 flex items-center justify-center absolute top-[-10px] right-[-8px] text-[10px] ">3</div>
                </button>
               
                <button className='relative ' onClick={ () => openModal('notification')} >
                  <FiBell className={modalType==='notification' && ' text-green-600 scale-110  '}/>
                  <div className="rounded-full h-5 w-5 flex items-center justify-center absolute top-[-10px] right-[-8px] text-[10px] hover-blue">5</div>
                </button>

                {/* <li><CgMenuGridR/>  </li> */}

                <button>
                  {/* <FiUser/> */}
                  <div onClick={()=>openModal('profileDropdown')} className={`${modalType==='profileDropdown' && ' border-green-600 border-2  '}  rounded-full h-8 w-8 bg-500 overflow-hidden`}>
                    <img className="object-cover w-full h-full scale-150"  src={'/profile2.webp'} alt='profile' />
                  </div>
                </button>                
              </ul>
            </div>
        </div>
        
    </nav>
    {/* <div className="hidden md:block text-black">
      <DesktopNav/>
    </div> */}
    {/* <div className="block md:hidden text-black">
      <MobileNav/>
    </div> */}
    
    </div >
   
  );
};

export default Navigation;
