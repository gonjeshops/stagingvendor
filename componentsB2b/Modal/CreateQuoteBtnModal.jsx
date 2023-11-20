import React from 'react'
import ModalCentral from './ModalCentral'
import { useGlobalState } from '@/context/GlobalStateContext'
import { useRouter } from 'next/router'
import { FaTimes } from 'react-icons/fa'

const CreateQuoteBtnModal = () => {
  const router = useRouter()
  const {useB2Bcart:{clearCart}, openModal, closeModal, modalType} = useGlobalState()

  return (
    <ModalCentral type='createNewquotebtn' >
      <div className='w-full sm:w-96 text-center  m-auto bg-light300 px-4 py-14 grid justify-center rounded-lg relative'>
          <div className="flex justify-end w-full text-xl  pb-2" ><div onClick={closeModal} className='absolute right-4 top-4 cursor-pointer p-2 hover-grey rounded-full'> <FaTimes/></div></div>
            <h4 className='pb-4 text-xl font-semibold '>You have an incompleted quote request form. Choose an action</h4>
            <div className="px-4 space-y-3">
              <button onClick={()=>{
                clearCart()
                router?.push('/vendorb2b/suppliers')
              }
            }
              className="hover-red py-2 px-4 w-full rounded">
                Start New Quote
              </button>

              <button onClick={()=>openModal('quoteform')}
                className="hover-blue py-2 px-4 w-full rounded">
                Complete Quote
              </button>
            </div>
        </div>        
    </ModalCentral>
  )
}

export default CreateQuoteBtnModal