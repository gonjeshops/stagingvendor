import {useState} from 'react'

import { productsData } from '@/data/productsData'
import ProductCard from '../card/ProductCard'
import ProductsSearchBar from '../../components/Layout/Expenses/ProductsSearchBarB2C'
import DashboardHeading from '../Workspace/DashboardHeading'

const ProductsCatalogue = ({productsList}) => {


  return (

    <section className=" pace-y-4">

                <DashboardHeading>Product Catalogue</DashboardHeading>
                <h3 className="font- text-lg pb-4">
                   Search fro products from the market place.
                </h3>

                <ProductsSearchBar/>

                <div className="pt-10 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
                    {
                        productsList?.map((item, i) => (
                            <div key={i} className="">
                                <ProductCard
                                    item={item}
                                />
                            </div>
                        ))
                    }
                </div>   

    </section>
  )
}

export default ProductsCatalogue