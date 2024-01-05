import QRCode from "react-qr-code";
import Barcode from 'react-barcode';
import { FaRegTimesCircle } from "react-icons/fa";
import { Button } from "../ui/button";
import { useRef } from "react";
import generatePDF from "react-to-pdf";

const PackingSlip = ({showPackingslip, setShowPackingslip, orderDetails}) => {
    const packingslipRef = useRef()

    return (
    <div className={` ${showPackingslip ? 'scale-100': 'scale-0'}  transform transition-transform duration-500 fixed inset-0 bg-background flex justify-center items-center `}>
        
        <div className="relative">
            <FaRegTimesCircle size={20} onClick={()=>setShowPackingslip(0)} className="absolute right-0 -top-8"/>
            <Button  onClick={() => generatePDF(packingslipRef, {filename: `gonje-packingslip-00${orderDetails?.id}.pdf`})} className="absolute left-0 -bottom-14">Download slip</Button>

            <Slip packingslipRef={packingslipRef} orderDetails={orderDetails}/>

            {/* <div  className="scale-0">
                <Slip packingslipRef={packingslipRef} orderDetails={orderDetails}/>
            </div> */}

                
        </div>

        <div className="flex w-7xl justify-center items-center">

        </div>
        
    </div>
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
    const Barcodee = <Barcode value={orderDetails?.quote_number} />
    const QRcodee = <div style={{ background: 'white', padding: '16px' }}>
                        <QRCode value={orderDetails} className="w-32 h-32"/>
                    </div>

    return (<div ref={packingslipRef} className=" space-y-4 rounded-bg bg-white shadow-md p-8 w-full md:w-[600px] border ">
<div className="flex justify-between gap-8">
    <div className="">
        <h4>Gonje</h4>
        <p className="max-w-60 text-wrap text-sm">
            5-3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui 
        </p>
    </div>

    <div className="">
        <h4>Shop:{orderDetails?.shop_name}</h4>
        <p className="max-w-60 text-wrap text-sm">
          :{ '5-3 sit amet, consectetur adipisicing elit. Qui'} 
        </p>
    </div>
</div>

<div className="barcode ">
    {Barcodee}
</div>

<div className="flex justify-end gap-3 border-b-2 border-black">
    <h3 className="text-4xl font-semibold">As05</h3>
    <h6 className="text-xl">W51</h6>
</div>

<div className="space-y-6 border-b border-black pb-2">
    <h4 className="text-2xl font-semibold">{orderDetails?.buyer_details?.name } {orderDetails?.buyer_details?.last_name }</h4>
    <h4 className="text-xl font-medium sm:w-96">  Shipping address: ipsum dolor sit amet consectetur adipisicing.</h4>
</div>

<div className="pt-6 flex justify-end border-b border-black">
    <div className="border p-1 mb-1 text-wrap  sm:w-96 border-black text-[10px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime voluptates mollitia illo voluptate expedita.
    </div>
</div>

<div className="flex justify-between">
    <h3 className="text-2xl font-semibold">{orderDetails?.tracking_number}</h3>
    
    {QRcodee}
</div>
</div>)
}


