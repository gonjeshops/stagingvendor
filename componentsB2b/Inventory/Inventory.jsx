import {useState} from 'react'
import DashboardHeading from '../Workspace/DashboardHeading'
import { FaAngleDown, FaFileExport } from 'react-icons/fa';
import InventoryTable from './InventoryTable';

const Inventory = ({inventories}) => {
    const {category , tableHeader, inventoryData, } = inventories;

    const [show, setShow] = useState('')

  return (
    < >

        <DashboardHeading>
        Inventories
        </DashboardHeading>
        
        <div className="py-8 space-y-6 ">
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
                        Category <span className=''><FaAngleDown/></span>
                    </div>
                    <div className="border border-zinc-400 px-8 py-3 flex items-center gap-3">
                        Vendor <span className=''><FaAngleDown/></span>
                    </div>
                    <div className="border border-zinc-400 px-8 py-3 flex items-center gap-3">
                        More filters <span className=''><FaAngleDown/></span>
                    </div>

                </div>

            </div>

            <div className="flex gap-12 items-center">
                <button className="flex items-center gap-4">
                    <FaFileExport/>
                    <p>Export</p>
                </button>
                <button onClick={()=>setShow('dashboard')} className="flex hover-blue py-3 px-8 rounded-sm items-center gap-4">
                    <p>{'+'}</p>
                    <p>Add Product</p>
                </button>
            </div>
        </div>

        <div className="orders bg-light100 pb-10 ">
            <InventoryTable data={inventoryData} tableHeader={tableHeader}/>
        </div>
    </>
  )
}

export default Inventory