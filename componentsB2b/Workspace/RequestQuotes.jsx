
import { FaClock, FaShoppingCart, FaFax, FaFileExport, FaFolder, FaStoreAlt } from "react-icons/fa"
import SearchBar from "../Navigation/SearchBar"
import { useRouter } from "next/router"
import DashboardHeading from './DashboardHeading'
import { useGlobalState } from "@/context/GlobalStateContext"
import CreateQuoteBtn from "../btn/CreateQuoteBtn"


const RequestQuotes = ({quotes, heading, description}) => {
    const router = useRouter()

    console.log('QUOTES DATA=', quotes)

return (

<>
    <div className="">
        <div className=" border-b mb-4 pb-4 ">
          
            <DashboardHeading>
                {heading}
            </DashboardHeading>
            <p className="text-lg font-medium">{description}</p>

            <div className="grid pt-4 sm:flex justify-between items-center">
                <div className="">
                    <div className="flex gap-4 items-center  font-medium">

                        <CreateQuoteBtn/>

                        {/* <Link href={'#'} className="flex  px-4 py-2 hover:bg-zinc-300 duration-300 gap-2 rounded items-center">
                            <FaFileExport/> <p>Export</p>
                        </Link> */}
                    </div>
                   

                </div>
                <div className="flex gap-4 items-center">
                    <div className="search">
                        <SearchBar/>
                    </div>
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
                                <div className="flex gap-4 items-center">
                                        <div className="flex gap-2 items-center">
                                            <FaShoppingCart/>            
                                            <p>Total: ${item?.subtotal}</p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <FaFolder/>
                                            <p>{item?.quantity} </p>
                                        </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="flex gap-2 items-center">
                                        <FaStoreAlt/>
                                        <p>{item?.shop_name}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <FaClock/>
                                        <p>{new Date(item?.updated_at).toDateString()}</p>
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