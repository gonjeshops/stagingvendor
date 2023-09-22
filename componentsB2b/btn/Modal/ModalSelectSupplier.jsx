import Link from "next/link"
import { FaLongArrowAltRight } from "react-icons/fa"



const ModalSelectSupplier = ({ isOpen, onClose, modalType, children }) => {

  return (
    <>
      { (
        <div  className=" animate-slow-appear fixed top-0 transition-all duration-500 left-0 bottom-0 right-0 z-50 w-screen ">
           
                <div className="  overflow-hidden w-full h-full">
                    <img src={'/bg.png'} className='object-cover lg:object-fill w-full h-[140vh] md:h-[160vh]'/>
                </div>

                <div className='absolute left-0 bottom-0 right-0 top-0  flex  justify-center items-center'>
                    <div>
                        <div className='flex justify-center items-center pb-6'>
                            <img src="/logo.png" alt="" />
                        </div>
                        <div className="p-8 rounded-lg bg-white flex justify-center items-center text-center">
                            <div>
                                <h2 className='font-semibold text-4xl pb-16 '>Supplier B2B View</h2>
                            <div className='flex items-center justify-center text-white gap-4 bg-green-600 px-3 py-6'>
                                <Link href={`/supplier`} className=' text-2xl  '>Continue </Link>
                                <FaLongArrowAltRight size={28}/>
                            </div>
                            </div>
                        </div>      
                    </div> 
                </div>               
        </div>
      )}
    </>
  )
}

export default ModalSelectSupplier