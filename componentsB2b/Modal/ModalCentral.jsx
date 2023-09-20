
const ModalCentral = ({ children, isOpen, closeModal }) => {
    
 
    const stopPropagation = (e) => {
        e.stopPropagation();
      };

  return (

    <div  onClick={closeModal} className={`${isOpen ? 'opacity-100 scale-100' : 'opacity-50 scale-0' } transition-transform transform duration-500  ${isOpen==='dashboard' ? 'fixed' : 'absolute'} inset-0 flex justify-center items-center bg-opacity-50 bg-black z-50 `}
    >
          
            <div className=""  onClick={stopPropagation}>
                {children}
            </div>
        </div>

  )
}

export default ModalCentral