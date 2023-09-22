
import { FaClock, FaShoppingCart, FaFax, FaFileExport, FaFolder } from "react-icons/fa"
import SearchBar from "../Navigation/SearchBar"
import Link from "next/link"
import { useState } from "react"
import Pagination from "../Pagination"
import { useRouter } from "next/router"
import RequestQuoteForm from "../forms/RequestQuoteForm"
import DashboardHeading from './DashboardHeading'



const RequestQuotes = () => {
    const router = useRouter()


    const [show, setShow] = useState('')

    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioBtn = (event) => {
        const newValue = event.target.value;
        setSelectedOption((prevValue) => (prevValue === newValue ? '' : newValue)); 
    };

    // paginaation
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 50; // Replace this with the total number of pages in your data

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Fetch data from the server here based on the selected page.
    };

    const handleChange = () => []

  return (

<>

    <RequestQuoteForm  closeModal={()=>setShow('')} isModalOpen={show} />
    <div className="space-y-10">
        <div className="space-y-6 ">
          
            <div className="grid mb-2 sm:mb-0 sm:flex justify-between gap-3 items-center w-full ">
                <DashboardHeading>Request Quotes</DashboardHeading>
                <div className='py-3 sm:px-6 bg-light100 rounded-lg'>
                   <p> 6 August 2023</p>
                </div>
            </div>

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
                    <div className="p-3">
                        <FaFax size={16} color={'green'}/>
                    </div>
                </div>
            </div>
        </div>

        {/* cards */}
        <div className=" pb-2 grid md:grid-cols-2 gap-6  ">
            {
                [1,2,3,4,5,6,7,8,9,0].map((item, i)=>{
                    return (
                        <div key={i} onClick={()=>router.push(`/vendorb2b/workspace/request-quotes/${`quote`+item}`)}
                        className="w-full shadow hover:shadow-lg duration-300 rounded-md border border-light300 p-8 space-y-8">
                            <div className="">
                                <div className="flex gap-6 items-center pb-3">
                                <label>
                                    <input
                                        type="radio"
                                        name="product"
                                        value={"option"+item}
                                        checked={selectedOption === 'option'+item}
                                        onClick={handleRadioBtn}
                                        onChange={handleChange}
                                        className="w-6 h-6 border rounded-md border-zinc-400"
                                    />
                                </label>
                                <h3 className="text-blue-500 text-xl capitalize font-medium">Quote Request</h3>
                                <div className="flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                    PENDING
                                </div>
                                </div>
                                <div className="content">
                                    details{item}
                                </div>
                            </div>
                            <hr className="border-t border-light300" />
                            <div className="flex items-center justify-between">
                                <div className="flex gap-6 items-center">
                                    <FaFolder/>
                                    <p>Total: ${item}</p>
                                </div>
                                <div className="flex gap-6 items-center">
                                    <div className="flex gap-3 items-center">
                                        <FaShoppingCart/>
                                        <p>{item} Products</p>
                                    </div>
                                    <div className="flex gap-3 items-center">
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

        <div className="flex px-4 justify-center items-center pb-8">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>



    </div>


    </>
  )
}

export default RequestQuotes