import { useGlobalState } from '@/context/GlobalStateContext'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const CreateQuoteBtn = () => {
    const {useB2Bcart:{ totalQuantities}, openModal} = useGlobalState()
    const router = useRouter()
    const [show, setShow] = useState(0)

    const stopPropagation = (e) => {
        e.stopPropagation();
      };

  return (
    <div onClick={()=> {
        if(totalQuantities ===0) {
            router?.push('/vendorb2b/suppliers')
        } else {
            openModal('createNewquotebtn')
        }
    } } 
    className="hover-blue mb-2 cursor-pointer sm:mb-0 px-4 py-2 rounded relative">
        {`+ Create New Quote`}
        { totalQuantities !== 0 && <button onMouseOver={()=>setShow(1)} onClick={stopPropagation}
        className="bg-red-500 h-3 w-3 rounded-full absolute -right-1 -top-1 "></button>}
        {<div className={`${show && totalQuantities ? 'opacity-100 scale-100' : 'opacity-50 scale-0' } cursor-text transition-transform transform duration-500 p-2 shadow bg-light200 w-40 absolute top-3 -right-20 text-dark200 text-[10px] `}>You have incompleted quote request form
        <button  onClick={(e)=>{ 
            setShow(0) 
            stopPropagation(e)
            }} 
            className="   rounded-full absolute right-1 top-1 ">
            <FaTimes/>
        </button>
        </div>}
    </div>
  )
}

export default CreateQuoteBtn