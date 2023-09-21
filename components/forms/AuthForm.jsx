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
    <div className="relative w-screen min-h-screen overflow-y-auto flex justify-center py-10 ">
        <div className="fixed inset-0 -z-10 ">
            {/* <Image
                src="/bg.png" // replace with backgroud image
                alt="Your Image"
                layout="fill"
                objectFit="cover"
            /> */}
        </div>
        <div className="px-2 md:pt-28">
            <div className=" flex justify-center w-full pb-3">
                <Link href={'/'} >
                    <Image src={`/logo.png`} width={120} height={64}/>
                </Link>
            </div>

        {/* container */}
            <div className=" sm:w-[520px] pb-4 p-2 bg-white rounded-xl ">
                <div className="grid justify-center gap- pb-6 text-center">
                    <h1 className="font-bold text-3xl">{type}</h1>
                    <p>{typeLabel}</p>
                </div>

                {/* nav */}
                <div className="w-full flex flex-nowrap  justify-between pb-6 space-x-3 ">
                   { 
                    FormNavlinks?.map(({label, id})=> (
                        <div key={id} 
                        onClick={() => router.push(`/${route}/${label}`)}
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