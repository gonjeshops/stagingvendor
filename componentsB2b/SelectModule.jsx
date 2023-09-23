import Link from "next/link"

const SelectModule = () => {
  return (
    // <div className='section-padding h-screen w-screen grid md:flex md:gap-20 md:justify-center items-center'>

        <div className="section-padding h-screen w-screen text-center flex justify-center items-center">
            <div className="w-full gap-8  grid justify-center">

                <h3 className='text-4xl font-semibold '>Select vendor module</h3>
                <div className="md:flex gap-8 grid">
                    <Link href={'/dashboard'} className="md:w-80 rounded-xl bg-green-600 text-white h-80 flex items-center justify-center font-semibold text-4xl hover:bg-green-800 duration-300">
                    B2C 
                    </Link>
                    <Link href={'/vendorb2b'} className="w-full md:w-80 rounded-xl bg-green-600 text-white h-80 flex items-center justify-center font-semibold text-4xl hover:bg-green-800 duration-300">
                        B2B 
                    </Link>
                </div>


            </div>
 
           
        
    </div>
  )
}

export default SelectModule