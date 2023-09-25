import CustomerLoginForm from "./CustomerLoginForm"
import VendorLoginForm from "./VendorLoginForm"
import SuplierLoginForm from "./SuplierLoginForm"
import { FormNavlinks } from "./FormNavlinks"
import CustormerSignupForm from "./CustormerSignupForm"
import VendorSignupForm from "./VendorSignupForm"
import SuplierSignupForm from "./SuplierSignupForm"

import Image from "next/image";
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

const AuthForm = ({type, typeLabel, typeText, activeForm, route}) => {
    const router = useRouter()
   
    const [active, setActive] = useState(activeForm)

  return (
    <div className="relative w-screen h-screen overflow-y-auto flex justify-center items-center py-10 ">
        <div className="hidden sm:block fixed top-0 left-0 w-full h-full   ">
            <img
                src="/bg.png" // replace with backgroud image
                alt="Your Image"
               className="w-full h-full object-cover"
            />
        </div>

        <div className=" md:pt-40 z-20">
        {/* container */}
            <div className="shadow sm:w-[520px] p-4   bg-white rounded-xl ">
                <div className="grid justify-center gap- pb-6 text-center">
                    {/* <h1 className="font-bold text-3xl">{type}</h1>0 */}
                    <div className=" flex justify-center w-full pb-3">
                        <Link href={'/'} >
                            <Image src={`/logo.png`} width={90} height={64} alt="logo"/>
                        </Link>
                    </div>
                    
                    <p className="font-semibold text-xl">{typeLabel}</p>
                </div>

                {/* nav */}
                <div className="w-full flex flex-nowrap  justify-between pb-6 space-x-3 ">
                   { 
                    FormNavlinks?.map(({label,url, id})=> (
                        <div key={id} 
                        onClick={() => router.push(`${url}/${route}/${label}`)}
                        className={`py-1 text-center ${active === label ? 'border-b-2 border-blue-700' : null} cursor-pointer hover:font-bold duration-300 text-sm`} >
                            <p>{typeText} {label}</p>
                        </div>
                    ))
                   }
                </div>

                {route === 'signin' ? 
                <div className="login">
                    <div className="">{
                        (active === 'customer') && <CustomerLoginForm/>
                    }
                    </div>
                    <div className="">
                        {(active === 'vendor') && <VendorLoginForm/>}
                    </div>
                    <div className="">
                        {(active === 'supplier') && <SuplierLoginForm/>}
                    </div>
                </div>
                :
                <div className="signup">
                    <div className="">{
                        (active === 'customer') && <CustormerSignupForm/>
                    }
                    </div>
                    <div className="">
                        {(active === 'vendor') && <VendorSignupForm/>}
                    </div>
                    <div className="">
                        {(active === 'supplier') && <SuplierSignupForm/>}
                    </div>

                </div>
                }


            </div>
        </div>
        
    </div>
  )
}

export default AuthForm