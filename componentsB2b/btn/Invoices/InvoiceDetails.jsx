import React from 'react'
import DashboardHeading from '../Workspace/DashboardHeading'
import { FaPrint, FaSave } from 'react-icons/fa'
import Link from 'next/link'

const InvoiceDetails = ({invoice, fakeData}) => {

  return (
    <div className='pt-12 space-y-8 '>

        <div className="grid sm:flex justify-between  items-end gap-3">
            <DashboardHeading>           
                Invocie <span>#{invoice}</span>
            </DashboardHeading>
            <div className="flex font-semibold gap-3">
                <div className="bg-light300 hover:bg-zinc-400 duration-500 border-zinc-400 border flex px-4 py-2 rounded-sm items-center gap-2">
                    <FaSave/>
                    <div className="">Download invoice</div>
                </div>
                <div className="bg-light300  hover:bg-zinc-400 duration-500 border-zinc-400 border flex px-4 py-2 rounded-sm items-center gap-2">
                    <FaPrint/>
                    <div className="">Print</div>
                </div>
            </div>
        </div> 

        <div className="rounded-sm bg-light300 h-60 w-full px-4 flex items-center justify-between"></div> 

        <div className=" w-full">
            <div className="bg-light300 h-16 w-full rounded px-4 flex items-center justify-between">
                <p>SL No</p>
                <p>Total</p>
             </div>
            
             {
                [1,2,3].map((item, i)=>(
                    <div key={i} className="border-b border-light300 h-14 px-4 flex items-center justify-between">
                        <p>{item}</p>
                        <p>$45</p>
                    </div>
                ))
            }

            
            
            
        </div> 

        <div className="rounded-sm bg-light300 h-16 w-full  px-4 flex items-center justify-between">
            <p>Subtotal</p>
            <p>$355</p>
        </div> 

        <div className="rounded-sm  h-16 w-full border-b  border-light300 px-4 flex items-center gap-14 justify-end">
            <p>Shipping cost</p>
            <p>$56</p>
        </div> 
        <div className="rounded-sm  h-16 w-full border-b  border-light300  px-4 flex items-center gap-14 justify-end">
            <p>Discount/Voucher</p>
            <p>$56</p>
        </div> 

        <div className="rounded-sm bg-light300 h-16 w-full  px-4 flex items-center gap-14 justify-end">
            <p>Grand Total</p>
            <p>$398</p>
        </div> 

        <div className="pt-28 pb-10 border-b border-light300 flex justify-end text-xl font-semibold">
            Authorized Signatory
        </div>

        <div className='py-16'>
            <Link href={`workspace/invoices`} className='hover-blue rounded px-6 py-2'>Browse more items</Link>
        </div>

        <div className=" bg-light300 h-40 w-full  px-4 flex items-center justify-between">
        </div> 

    </div>
  )
}

export default InvoiceDetails