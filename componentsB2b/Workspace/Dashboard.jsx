import { FaCartArrowDown, FaFileAlt, FaHeart, FaHeartbeat, FaLink, FaStoreAlt  } from 'react-icons/fa'
import { workspaceData } from '../../data/workspaceData'
import Card from './Card'
import Chart from './Chart'
import DashboardHeading from './DashboardHeading'
import Link from 'next/link'
import { useGlobalState } from '@/context/GlobalStateContext'

const Dashboard = ({stats}) => {
    const {useB2Bcart:{totalQuantities, clearCart, setQuoteName,}} = useGlobalState();
 
    console.log('STATS===', stats)
  return (
    
    <> 
        
        <div className=" mb-2 sm:mb-0 w-full ">
            <DashboardHeading>Dashboard</DashboardHeading>
           
        </div>

                
                <div className=" rounded-xl w-full grid gap-2 sm:gap-12 sm:grid-cols-2 md:grid-cols-3">
                    {/* quote stats */}
                    <div className="grid  gap-3 rounded-lg bg-light200 p-4 sm:p-8">
                        <Link href={'/vendorb2b/workspace/request-quotes'} className='flex gap-2 justify-center items-center text-xl font-semibold text-blue-hover'>
                            <FaFileAlt />
                            <div className="">Quote Requets</div>
                        </Link>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="shrink-0 flex items-center gap-2">
                                <p>PENDING:</p>
                                <p>0</p>
                            </div>
                            <div className="shrink-0 flex items-center gap-2">
                                <p>SENT:</p>
                                <p>0</p>
                            </div>
                            <div className="shrink-0 flex items-center gap-2">
                                <p>ACCEPTED:</p>
                                <p>0</p>
                            </div>
                            <div className="shrink-0 flex items-center gap-2">
                                <p>CANCELLED:</p>
                                <p>0</p>
                            </div>
                            <div className="shrink-0 flex items-center gap-2">
                                <p>REJECTED:</p>
                                <p>0</p>
                            </div>
                            <div className="shrink-0 flex items-center gap-2 font-semibold">
                                <p>TOTAL:</p>
                                <p>{stats?.quote_request_count}</p>
                            </div>
                        </div>
                    </div>

                    {/* invoices stats */}
                    <div className="grid  gap-3 rounded-lg bg-light200 p-4 sm:p-8">
                        <Link href={'/vendorb2b/workspace/invoices'} className='flex gap-2 justify-center items-center text-xl font-semibold text-blue-hover'>
                            <FaFileAlt  />
                            <div className="">Invoice</div>
                        </Link>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="shrink-0 flex items-center gap-2">
                                <p>PAID:</p>
                                <p>0</p>
                            </div>
                            <div className="shrink-0 flex items-center gap-2">
                                <p>ACCEPTED:</p>
                                <p>0</p>
                            </div>
                            <div className="shrink-0 flex items-center gap-2 font-semibold">
                                <p>TOTAL:</p>
                                <p>{stats?.transaction_count}</p>
                            </div>
                        </div>
                    </div>

                    {/* order stats */}
                    <div className="grid  gap-3 rounded-lg bg-light200 p-4 sm:p-8">
                        <Link href={'/vendorb2b/workspace/orders'} className='flex gap-2 justify-center items-center text-xl font-semibold text-blue-hover'>
                            <FaFileAlt  />
                            <div className="">Orders</div>
                        </Link>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="shrink-0 flex items-center gap-2">
                                <p>DELIVERED:</p>
                                <p>0</p>
                            </div>
                            <div className="shrink-0 flex items-center gap-2">
                                <p>AWAITING DELIVERY:</p>
                                <p>0</p>
                            </div>
                            <div className="shrink-0 flex items-center gap-2 font-semibold">
                                <p>TOTAL:</p>
                                <p>{stats?.order_count}</p>
                            </div>
                            {/* <Link href={`/vendorb2b/workspace/orders`} className='text-sm w-full flex gap-1 text-blue-hover justify-center items-center'>Orders<FaLink/> </Link> */}
                        </div>
                    </div>

                     {/* wishlist stats */}
                     <div className="grid  gap-3 rounded-lg bg-light200 p-4 sm:p-8">
                        <div className='flex gap-2 justify-center items-center text-xl font-semibold text-blue-hover'>
                            <FaHeart/>
                            <div className="">Wishlist</div>
                        </div>
                        <div className="grid justify-center gap-2">
                        {stats?.wishlist_count === 0 ? (
                            <div className='grid justify-center gap-2 '>
                                <p>You have no poduct on your wishlist</p>
                                <Link href={`/vendorb2b/products`} className='text-sm w-full flex gap-1 text-blue-hover justify-center items-center'>Find Product<FaLink/> </Link>
                            </div>
                            ) : (
                            <>
                                <div className="shrink-0 flex items-center gap-2 font-semibold">
                                    <p>{stats?.wishlist_count} </p> <p>Products</p>
                                </div>
                            </>
                            )
                        }                           
                        </div>
                    </div>

                    {/* cart stats */}
                    <div className="grid  gap-3 rounded-lg bg-light200 p-4 sm:p-8">
                        <Link href={'/venorb2b/workspace/quotes-request'} className='flex gap-2 justify-center items-center text-xl font-semibold text-blue-hover'>
                            <FaCartArrowDown/>
                            <div className="">Cart</div>
                        </Link>
                        <div className="grid justify-center gap-2">
                        {totalQuantities === 0 ? (
                            <div className='grid justify-center gap-2 '>
                                <p>You have no pending quote form</p>
                                
                            </div>
                            ) : (
                            <>
                                <div className="grid justify-center gap-2">
                                    <p>You have a pending quote form</p>
                                    <div className="">
                                    <Link href={`/vendorb2b/products`} className='text-sm w-full flex gap-1 text-blue-hover justify-center items-center'>Complete quote form </Link>
                                    <button onClick={()=>clearCart()} className='text-sm text-red w-full flex gap-1 text-blue-hover justify-center items-center'>Clear quote form </button>
                                    </div>
                                </div>
                            </>
                            )
                        }                           
                        </div>
                    </div>


                    <Card data= {
                           { icon: <FaStoreAlt/>,
                            data: stats?.shop_count,
                            title: `Shops`,}
                        } 
                        iconColor={`text-blue-400`}
                        titleColor={`text-blue-400`}
                        titleBold={`text-semibold`}
                    />

                    {/* <Card data={workspaceData.bouncedEmail} 
                        iconColor={`text-red-600`}
                    /> */}
                </div>
                

                <div className="px-4 py-16 grid sm:sm:grid-cols-2 gap-12">

                    <Chart type={'Pie'} heading={`Email Campaign Report`} description='Paid and verified for each piece of content' />

                    <Chart type={'Bar'} heading={`Marketing Campaign Report`} description='According to the sales and data' />
                </div>

                <div className="py-16 px-4 bg-light200 grid sm:sm:grid-cols-2 gap-12 rounded-lg overflow-hidden">
                    <Chart type={'Line'} heading={`Sales Trends`} description='Updated inventroy & the sales report.' />
                    <Chart type={'Doughnut'} heading={`Call Campaign Report`} description='All Call Campaign Succeeded' />
                </div>
    </>
  )
}

export default Dashboard