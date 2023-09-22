import Link from "next/link"
import DashboardHeading from "../Workspace/DashboardHeading"
import { useGlobalState } from "@/context/GlobalStateContext"

const OrderStatus = ({orderStatusId}) => {


  return (
    <div className="bg-light100 w-full">


    <div className="m-auto max-w-7xl py-12">
        <div className="flex justify-between items-end gap-3 pb-3">
            <DashboardHeading>Order {orderStatusId} Status</DashboardHeading>
            <Link className="px-6 py-3 rounded-md border border-blue-600 hover:scale-105"  href={`/vendorb2b/workspace/orders`}>Back to orders</Link>
        </div>
        <Link href={`/vendorb2b/workspace/orders/${orderStatusId}`} className="flex gap-2 items-center text-lg">
            <p>View</p> <p className="text-blue hover:scale-105 duration-300">order details</p> <p>, Nov 12, 2022, 8:54.</p>
        </Link>

        <div className="py-8 grid md:grid-cols-2  gap-14">
            <div className="overflow-hidden w-full h-full">
                <img src="/map-g.png" alt="map" className="object-cover w-full h-full"/>
            </div>

            <div className="flex gap-4">
                <div className="grid h-full gap-16">
                    {
                        ['23 August 2023, 10.30AM', '25 August 2023, 10.30AM', '23 August 2023, 10.30AM', '23 August 2023, 10.30AM', '23 August 2023, 10.30AM'].map((item, i)=>
                        <div className="" key={i}>{item}</div>
                        
                        )
                    }
                </div>

                <div className="status grid h-full gap-16">
                    {
                        [1,2,3,4,5].map((item,i)=>
                        <div key={i} className="w-8 h-8 rounded-full bg-green-600"></div>)
                    }
                </div>

                <div className="grid h-full gap-16">
                    {
                        [
                            {order: 'Order is procession', details: 'Your package is ready for the sele top prepare.'},
                            {order: 'Order is procession', details: 'Your package is ready for the sele top prepare.'},
                            {order: 'Order is procession', details: 'Your package is ready for the sele top prepare.'},
                            {order: 'Order is procession', details: 'Your package is ready for the sele top prepare.'},
                            {order: 'Order is procession', details: 'Your package is ready for the sele top prepare.'},
                        ].map(({order, details}, i)=>(
                            <div key={i} className="space-y-2">
                                <h3 className="text-2xl font-semibold">{order}</h3>
                                <p>{details}</p>
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>
    </div>
    </div>
  )
}

export default OrderStatus