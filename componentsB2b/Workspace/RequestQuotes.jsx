
import { FaClock, FaShoppingCart, FaFax, FaFileExport, FaFolder } from "react-icons/fa"
import SearchBar from "../Navigation/SearchBar"
import Link from "next/link"
import { useState } from "react"
import Pagination from "../Pagination"
import { useRouter } from "next/router"
import RequestQuoteForm from "../forms/RequestQuoteForm"
import DashboardHeading from './DashboardHeading'




const RequestQuotes = ({quotes}) => {
    const router = useRouter()

    console.log('QUOTES DATA=', quotes)

    const [show, setShow] = useState('')


return (

<>

    <RequestQuoteForm  closeModal={()=>setShow('')} isModalOpen={show} />


    <div className="space-y-10">
        <div className="space-y-6 ">
          
            <DashboardHeading>Request Quotes</DashboardHeading>

            <div className="grid  sm:flex justify-between items-center">
                <div className="">
                    <div className="flex gap-4 items-center  font-medium">

                        <div onClick={()=>setShow('dashboard')} className="bg-blue-600 mb-2 cursor-pointer sm:mb-0 px-4 py-2 rounded hover:bg-blue-700 duration-300 text-white">{`+ Create Request`}</div>
                        <Link href={'#'} className="flex  px-4 py-2 hover:bg-zinc-300 duration-300 gap-2 rounded items-center">
                            <FaFileExport/> <p>Export</p>
                        </Link>
                    </div>
                   

                </div>
                <div className="flex gap-4 items-center">
                    <div className="search">
                        <SearchBar/>
                    </div>
                    {/* <div className="p-3">
                        <FaFax size={16} color={'green'}/>
                    </div> */}
                </div>
            </div>
        </div>

        {/* cards */}
        <div className=" pb-2 grid md:grid-cols-2 gap-6  ">
            {
                // fetched data

                quotes?.map((item, i)=>{
                    return (
                        <div key={i} 
                        className="w-full border hover:shadow-lg duration-300 rounded-md p-8 space-y-8">
                            <div className="">
                                <div className="flex gap-6 justify-between items-center pb-3">
                                
                                    <button onClick={()=>router.push(`/vendorb2b/workspace/request-quotes/${item.id}`)}  className="text-blue-500 text-sm capitalize hover-blue rounded px-4 py-2">View Quote </button>
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                        Status: {item.status}
                                    </div>
                                </div>
                                <div className="content">
                                    {item.quote_name}
                                </div>
                            </div>
                            <hr className="border-t border-light300" />

                            <div className="flex items-center justify-between">
                                <div className="flex gap-2 items-center">
                                <FaShoppingCart/>
                                    <p>Total: ${'---'}</p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="flex gap-2 items-center">
                                        <FaFolder/>
                                        <p>{'---'} Products</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <FaClock/>
                                        <p>Draft</p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    )
                })

            }


        </div>


    </div>


    </>
  )
}

export default RequestQuotes