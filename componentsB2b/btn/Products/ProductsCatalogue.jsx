import {useState} from 'react'

import { productsData } from '@/data/productsData'
import Pagination from '../Pagination'
import ProductCard from '../card/ProductCard'
import ProductsSearchBar from './ProductsSearchBar'
import DashboardHeading from '../Workspace/DashboardHeading'

const ProductsCatalogue = () => {


    // paginaation
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 50; // Replace this with the total number of pages in your data

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Fetch data from the server here based on the selected page.
    };

  return (

    <section className=" px-4 space-y-4">

                <DashboardHeading>Product Catalogue</DashboardHeading>
                <h3 className="font- text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing.
                </h3>
                <ProductsSearchBar/>
                <div className="pt-10 grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                    {
                        productsData?.map((item, i) => (
                            <div key={i} className="">
                                <ProductCard
                                    item={item}
                                />
                            </div>
                        ))
                    }
                </div>

            {/* Render the pagination component */}
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            {/* </div> */}
   

    </section>
  )
}

export default ProductsCatalogue