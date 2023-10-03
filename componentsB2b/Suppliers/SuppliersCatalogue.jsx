import {useState, useEffect} from 'react'
import Pagination from '../Pagination';
import SuppliersSearchBar from '../SuppliersSearchBar';
import SupplierCard from '../card/SupplierCard';
import DashboardHeading from '../Workspace/DashboardHeading';
import { useRouter } from 'next/router';
import axios from 'axios';




const SuppliersCatalogue = ({suppliersData, totalPages}) => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)

    // paginaation
    const [page, setPage] = useState(1);

    const handlePageChange = (page) => {
      setLoading(true)
        setPage(page);
        router.push(`/vendorb2b/suppliers?page=${page} `)
    };

    useEffect(() => {
      setLoading(false)
    }, [suppliersData])
     
      if(loading) {
        return <div className='flex w-full justify-center items-center'>Loading...</div>
      }

  return (
    <main className='space-y-10  '>
        
            <section className=' space-y-4'>
                
                <div>
                <DashboardHeading>Suppliers Catalogue</DashboardHeading>

                <p className='text-lg pt-2'>Explore our Supplier's Listings</p>
                </div>
                
                <SuppliersSearchBar/>
            </section>

            <section className='space-y-6'>
                <div className=" grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ">
                    {
                        suppliersData?.map((item) => (
                            <div key={item.id} className="">
                                <SupplierCard label={item.name} details={item.description} item={item}/>
                            </div>
                        ))
                    }
                </div>
            </section>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </main >
  )
}

export default SuppliersCatalogue