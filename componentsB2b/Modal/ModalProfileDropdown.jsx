import { useGlobalState } from '@/context/GlobalStateContext';
import Link from 'next/link';
import { MdHelpOutline } from 'react-icons/md';


const ModalProfileDropdown = ({ stopPropagation }) => {

  const {modalType, logout, closeModal} = useGlobalState()

  return (
    <div onClick={closeModal} className={`${modalType==='profileDropdown' ? 'opacity-100 scale-y-100' : 'opacity-50 scale-y-0' } transition-transform transform duration-500 absolute inset-0  z-50`}
    style={{transformOrigin:'50px 50px '}}
    > 

      <div className="section-padding absolute inset-0">
            <div onClick={stopPropagation} className="shadow-xl bg-light100 w-full sm:w-[400px] rounded-lg px-4 py-8 absolute top-14 right-0"> 
  
              <a href="#" className="block px-4 py-2 text-sm text-gray-00 bg-hover300">
                  Profile
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-00 bg-hover300">
                  Settings
              </a>
              <a href="/" onClick={logout} className="block px-4 py-2 text-sm text-gray-00  bg-hover300">
                  Logout
              </a>

              <Link href="/workspace/help" className="flex items-center gap-3 mt-14 border-t px-4 py-2 text-sm text-gray-00 bg-hover300">
                <MdHelpOutline size={20}/>

                  <div>
                  Help Center
                  </div>
              </Link>
              
           </div>

      </div>
      
    </div>
  );
};

export default ModalProfileDropdown;
