import { supplierCategoryList } from "@/data/supplierCategoryList"
import Link from "next/link"
import { useGlobalState } from '@/context/GlobalStateContext';


const ModalSupplierCategory = ({stopPropagation}) => {


  const {modalType, closeModal} = useGlobalState()

  return (
    <>
     
     <div onClick={closeModal} className={`${modalType==='cartegory' ? 'opacity-100 scale-y-100' : 'opacity-50 scale-y-0' } transition-transform transform duration-500 absolute inset-0  z-50`}
    style={{transformOrigin:'50px 50px '}}
    > 
        {/* Dropdown content */}
        <div className="section-padding absolute inset-0">

            <div onClick={stopPropagation} className="absolute top-28  left-56 w-full sm:max-w-4xl p-8 shadow-2xl bg-light100 rounded-lg ">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                    {
                        supplierCategoryList?.map(({id, category, icon, items}) => (
                            <div className="" key={id}>
                                <div className="flex gap-2 text-blue-600 text-semibold items-center pb-3">
                                    <div className="text-xl">{icon}</div>
                                    <h5 className="">
                                        {category}
                                    </h5>
                                </div>
                                <div className="space-y-2 grid">
                                    {
                                        items?.map(({item, link}, i ) => (
                                            <Link key={i} href={link} className="text-blue-hover " onClick={closeModal}>
                                            {item}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <Link href={'/suppliers'} className='mt-8 border-t pt-8 flex justify-center items-center text-blue '>
                                See All Categories
                            </Link>

            </div>
        </div>
    </div>
     
    </>
  )
}

export default ModalSupplierCategory