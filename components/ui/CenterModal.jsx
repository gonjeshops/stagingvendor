import { FaTimes } from 'react-icons/fa'

const CenterModal = ({centerModal, setCentreModal, children}) => {

  return (
    <div onClick={()=>setCentreModal('')} className={`${centerModal ? 'scale-100' : 'scale-0'} transform transition-transform duration-300 fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center md:py-12 md:px-4 overflow-auto z-60`}>
        <div onClick={e=>e.stopPropagation()} className={` relative bg-background max-w-7xl p-8 md:p-14 overflow-auto max-h-screen z-60`}>
            {children}
            <button onClick={()=>setCentreModal('')} className='absolute  top-6 z-50 right-6'><FaTimes/></button>
        </div>
    </div>
  )
}

export default CenterModal