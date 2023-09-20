import {useState} from 'react'

import { FaClock, FaShoppingCart, FaFax, FaFileExport, FaFolder } from "react-icons/fa"
import SearchBar from "../Navigation/SearchBar"

import Link from 'next/link'
import DocumentTable from './Table'
import DashboardHeading from './DashboardHeading'
import ManageQuoteForm from '../forms/ManageQuoteForm'

const ManageQuotes = () => {
    const [show, setShow] = useState('')

  return (
    <div className="">
        <ManageQuoteForm closeModal={()=>setShow('')} isModalOpen={show}  />

        <div className="  space-y-6 ">

            <div className="grid mb-2 sm:mb-0 sm:flex justify-between items-center w-full ">
                <DashboardHeading>Manage Quotes</DashboardHeading>
                <div className='flex py-3 px-6 bg-light100 rounded-lg'>
                   <p> 6 August 2023</p>
                </div>
            </div>

            <div className="grid px-4  sm:flex justify-between items-center">
                <div className="">
                    <div className="flex gap-4 items-center  font-medium">
                        <div onClick={()=>setShow('dashboard')} className="bg-blue-600 cursor-pointer mb-2 sm:mb-0 px-4 py-2 rounded hover:bg-blue-700 duration-300 text-white">{`+ Create Request`}</div>
                        <Link href={'#'} className="flex  px-4 py-2 hover:bg-zinc-300 duration-300 gap-2 rounded items-center">
                            <FaFileExport/> <p>Export</p>
                        </Link>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="search">
                        <SearchBar/>
                    </div>
                    <div className="p-3">
                        <FaFax size={16} color={'green'}/>
                    </div>
                </div>
            </div>
        </div>


        <div className="pb-20">
            <DocumentTable/>
        </div>
        
    </div>
  )
}

export default ManageQuotes