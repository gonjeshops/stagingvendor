import {useState} from 'react'
import Pagination from '../Pagination';
import SuppliersSearchBar from '../SuppliersSearchBar';
import SupplierCard from '../card/SupplierCard';
import { suppliers } from '@/data/suppliers';
import DashboardHeading from '../Workspace/DashboardHeading';

const SuppliersCatalogue = () => {
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
                        suppliers.map(({label, id, details,}) => (
                            <div key={id} className="">
                                <SupplierCard label={label} details={details}/>
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