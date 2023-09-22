import { useGlobalState } from '@/context/GlobalStateContext';


const ModalCart = ({ stopPropagation }) => {
  

  const {modalType, closeModal} = useGlobalState()

  return (
    <div onClick={closeModal} className={`${modalType==='cart' ? 'opacity-100 scale-y-100' : 'opacity-50 scale-y-0' } transition-transform transform duration-500 absolute inset-0  z-50`}
    style={{transformOrigin:'50px 50px '}}
    > 
      {/* Dropdown content */}
      <div className="section-padding absolute inset-0">
            <div onClick={stopPropagation} className="shadow-xl bg-light100 w-full sm:w-[500px] rounded-lg px-4 py-8 absolute top-14 right-0"> 
   {/* Add your menu items here */}
                <a href="#" className="block px-4 py-2 text-sm text-gray-00 hover:bg-gray-400">
                Shop  1
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-00 hover:bg-gray-400">
                Product 2
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-00 hover:bg-gray-400">
                Product 3
            </a>
    </div>

      </div>
      
    </div>
  );
};

export default ModalCart;
