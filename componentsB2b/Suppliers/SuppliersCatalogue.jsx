import SuppliersSearchBar from '../SuppliersSearchBar';
import SupplierCard from '../card/SupplierCard';
import DashboardHeading from '../Workspace/DashboardHeading';


const SuppliersCatalogue = ({suppliersData, }) => {


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

        </main >
  )
}

export default SuppliersCatalogue