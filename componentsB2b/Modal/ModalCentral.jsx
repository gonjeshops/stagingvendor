import { useGlobalState } from "@/context/GlobalStateContext";

const ModalCentral = ({ children, type }) => {
    
  const {modalType, closeModal} = useGlobalState()
 
    const stopPropagation = (e) => {
        e.stopPropagation();
      };

  return (

    <div  onClick={closeModal} className={`${modalType===type ? 'opacity-100 scale-100' : 'opacity-50 scale-0' } transition-transform transform duration-500 absolute inset-0  bg-opacity-50 bg-black flex items-center justify-center z-50 p-4`}
    >
            <div className=""  onClick={stopPropagation}>
                {children}
            </div>
        </div>

  )
}

export default ModalCentral