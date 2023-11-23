import { useGlobalState } from "@/context/GlobalStateContext";
import QuoteForm from "../forms/QuoteForm"

const ModalQuoteForm = () => {
    const stopPropagation = (e) => {
        e.stopPropagation();
      };
    
    const {modalType, closeModal} = useGlobalState()
    
  return (

    <div className={`${modalType==='quoteform'  ? 'opacity-100 scale-100 absolute' : 'opacity-50 scale-0 absolute' } transition-transform transform duration-500  inset-0 max-lg:px-4 py-4 lg:px-32 bg-opacity-50 bg-black z-50 `}
    >
          
            <div className=" w-full  flex items-center justify-center"  onClick={stopPropagation}>
                <QuoteForm/>
            </div>
        </div>

  )
}

export default ModalQuoteForm