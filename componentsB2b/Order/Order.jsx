import {useRef, useState} from 'react'
import DashboardHeading from '../Workspace/DashboardHeading'
import { FaAngleDown, FaFileExport } from 'react-icons/fa';
import OrderTbale from './OrderTable';
import generatePDF from 'react-to-pdf';
import AddOrderForm from '../forms/AddOrderForm';

const Order = ({orders, orderlist}) => {
    const {category , orderData} = orders;
    const [show, setShow] = useState('')
    console.log('ordelist', orderlist)

    const downloadOrderRef = useRef()

  return (
    < > 
        <AddOrderForm closeModal={()=>setShow('')} isModalOpen={show}  />

        <DashboardHeading>
            Orders
        </DashboardHeading>

        <div className="pb-8 space-y-6 ">
            <div className=" flex w-full items-center gap-4 xl:gap-12 flex-wrap">
               {category?.map(({title, value}, i)=>(
                <div key={i} className='flex gap-2 items-center'>
                    <p className={`font-medium ${i===0 ? '' : 'text-blue'}`}>{title}</p>
                    <p>{`(${value})`}</p>
                </div>
               )) }
            </div>
            <div className="flex gap-4 flex-col w-full lg:flex-row lg:flex-wra">
                <div className="w-full lg:w-2/5">
                    <div className="border border-zinc-400 h-12 rounded bg-light100">

                    </div>
                </div>
                <div className="w-full lg:w-3/5 flex flex-wrap">
                    <div className="border border-zinc-400 px-8 py-3 flex items-center gap-3">
                        Payment status <span className=''><FaAngleDown/></span>
                    </div>
                    <div className="border border-zinc-400 px-8 py-3 flex items-center gap-3">
                        Fulfillment status <span className=''><FaAngleDown/></span>
                    </div>
                    <div className="border border-zinc-400 px-8 py-3 flex items-center gap-3">
                        More filters <span className=''><FaAngleDown/></span>
                    </div>

                </div>

            </div>

            <div className="flex gap-12 items-center">
                <button className="flex items-center gap-2 border border-gray-500 p-2">
                    <FaFileExport/>
                    <div onClick={() => generatePDF(downloadOrderRef, {filename: `${orderlist[0]?.user_name}'s order.pdf`})} className="">Export Order List</div>
                </button>
                {/* <button onClick={()=>setShow('dashboard')} className="flex hover-blue py-3 px-8 rounded-sm items-center gap-4">
                    <p>{'+'}</p>
                    <p>Add Order</p>
                </button> */}
            </div>
        </div>

        <div ref={downloadOrderRef} className="orders bg-light100 h-screen pl-4">
            <OrderTbale data={orderData} orderlist={orderlist}/>


        </div>
    </>
  )
}

export default Order