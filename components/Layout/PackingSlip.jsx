import QRCode from "react-qr-code";
import Barcode from 'react-barcode';
import { FaPrint, FaRegTimesCircle } from "react-icons/fa";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import generatePDF from "react-to-pdf";

const PackingSlip = ({ orderDetails}) => {
    const packingslipRef = useRef()
    const [showPackingslip, setShowPackingslip] = useState(0)
console.log('ORDER D=', orderDetails)
    return (
        <>

            <Button onClick={() =>setShowPackingslip(1) } className="shrink-0 text-black bg-light100 hover:shadow-md duration-500 hover:bg-white flex px-4 py-4 border items-center gap-2">
                <FaPrint />
                Packing slip
            </Button>
        
            <div className={` ${showPackingslip ? 'scale-100': 'scale-0'}  transform transition-transform duration-500 fixed inset-0 bg-background flex justify-center items-center overflow-auto px-4 z-50`}>
                
                <div className="relative">
                    <FaRegTimesCircle size={20} onClick={()=>setShowPackingslip(0)} className="absolute right-0 -top-8"/>
                    <Button  onClick={() => generatePDF(packingslipRef, {filename: `gonje-packingslip-00${orderDetails?.id}.pdf`})} className="absolute left-0 -top-12">Download slip</Button>

                    <Slip packingslipRef={packingslipRef} orderDetails={orderDetails}/>

                    {/* <div  className="scale-0">
                        <Slip packingslipRef={packingslipRef} orderDetails={orderDetails}/>
                    </div> */}
                </div>

                
            </div>
        </>

  )
}

export default PackingSlip

const Slip = ({packingslipRef, orderDetails })=> {
    
    const BarcodeOptions = {
        width: 2,
        height: 100,
        format: "CODE128",
        displayValue: true,
        fontOptions: "",
        font: "monospace",
        textAlign: "center",
        textPosition: "bottom",
        textMargin: 2,
        fontSize: 20,
        background: "#ffffff",
        lineColor: "#000000",
        margin: 10,
        marginTop: undefined,
        marginBottom: undefined,
        marginLeft: undefined,
        marginRight: undefined
      }
    const Barcodee = <Barcode value={orderDetails?.barcode_number || orderDetails?.tracking_number || 'Not available'} />
    const QRcodee = <div style={{ background: 'white', padding: '16px' }}>
                        <QRCode value={orderDetails} className="w-20 h-20"/>
                    </div>

    return (
    <div ref={packingslipRef} className=" space-y-4 rounded-bg bg-white shadow-md p-8 w-96 sm:w-full  border ">
        <div className="overflow-auto">

            <div className="flex justify-between gap-8">
                <div className="">
                    <h4>Gonje</h4>
                    <p className="w-80 text-wrap text-[12px]">
                        {orderDetails?.delivery_company_name} 
                    </p>
                </div>

                <div className="">
                    <h4>Shop:{orderDetails?.shop?.name }</h4>
                    <p className="max-w-60 text-wrap text-sm">
                    {orderDetails?.shop?.address ? Object?.values(orderDetails?.shop?.address).join(', ') : 'no address'}
                    {orderDetails?.shop?.id}
                    </p>
                </div>
            </div>

            <div className="barcode text-sm">
                {Barcodee}
            </div>

            <div className="flex justify-end gap-3 border-b-2 border-black">
                <h3 className="text-4xl font-semibold">W54R </h3>
                <h6 className="text-xl">W51</h6>
            </div>

            <div className="space-y-3 border-b border-black pb-2">
                <h4 className="text-2xl font-semibold">{orderDetails?.custmer?.name } {orderDetails?.buyer_details?.last_name }</h4>
                <h4 className="text-xl font-medium sm:w-96">  {orderDetails?.shipping_address&&Object.values(orderDetails?.shipping_address).join(', ')}</h4>
            </div>

            <div className="pt-6 flex justify-end border-b border-black">
                <div className="border p-1 mb-1 text-wrap  sm:w-96 border-black text-[14px]">
            {orderDetails?.customer?.name}<br/>
                {orderDetails?.billing_address&&Object.values(orderDetails?.billing_address).join(', ')}
                </div>
            </div>

            <div className="flex justify-between">
                <h3 className="text-2xl font-semibold">{orderDetails?.tracking_number}</h3>
                
                {QRcodee}
            </div>
        </div>
        </div>)
        }


