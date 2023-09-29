import {useState} from 'react'
import Pagination from '../Pagination';
import SuppliersSearchBar from '../SuppliersSearchBar';
import SupplierCard from '../card/SupplierCard';
import { suppliers } from '@/data/suppliers';
import DashboardHeading from '../Workspace/DashboardHeading';

const SuppliersCatalogue = ({supplierss}) => {
    console.log('PROP=', supplierss)
    // paginaation
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 50; // Replace this with the total number of pages in your data

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Fetch data from the server here based on the selected page.
    };
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
                        supplierss.map((item) => (
                            <div key={item.id} className="">
                                <SupplierCard label={item.name} details={item.description} item={item}/>
                            </div>
                        ))
                    }
                </div>
            </section>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </main >
  )
}

export default SuppliersCatalogue