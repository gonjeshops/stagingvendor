import { useGlobalState } from '@/context/GlobalStateContext';
import { navLinks } from '@/data/navlinks';
import Link from 'next/link';

const ModalMobilwNavbar = ({stopPropagation}) => {
 
    const {modalType, closeModal} = useGlobalState()

    return (
      <div onClick={closeModal} className={`${modalType==='mobileNav' ? 'opacity-100 scale-y-100' : 'opacity-50 scale-y-0' } transition-transform transform duration-500 absolute inset-0  z-50`}
      style={{transformOrigin:'50px 50px '}}
      > 
        {/* Dropdown content */}
        <div className="section-padding absolute inset-0">
              <div onClick={stopPropagation} className="shadow-xl grid  bg-light100 w-80 rounded-lg px-4 py-8 absolute top-32 right-0"> 

              {
                navLinks?.map(({title, href}) => (
                    <Link onClick={closeModal} key={title} href={href}
                    className='bg-hover300 duration-300 p-4'
                    >{title}</Link>                  
                ))
            }
      </div>
  
        </div>
        
      </div>
    );
}

export default ModalMobilwNavbar