import React from 'react'
import ModalCentral from '../Modal/ModalCentral'

const RequestQuoteForm = ({ closeModal, isModalOpen}) => {
  return (
    <ModalCentral closeModal={closeModal} isOpen={isModalOpen}>
      <div className='max-w-4xl h-96 m-auto bg-light300 p-4 rounded-lg '>
          <div className="flex justify-end w-full text-xl  pb-2" ><div onClick={closeModal} className=' cursor-pointer py-2 px-3 hover-blue rounded-full'> x</div></div>
            <h2 className='text-6xl font-bold'>Request Quote Form</h2>

        </div>

        
    </ModalCentral>
  )
}

export default RequestQuoteForm