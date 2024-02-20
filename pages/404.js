import { Mascot } from "@/assets";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className='fixed inset-0 flex justify-center items-center flex-col gap-4  '>
            <div className="">
                <Image
                src={Mascot}
                alt="mascot-404"
                width={350} height={400}
                />
            </div>
            <p className="text-4xl font-medium">Ooops! Page was found.</p>
            <Link className="py-2 px-8 rounded-full text-white bg-gonje-green " href={'/'}>Go to dashboard</Link>
        </div>
    )
}

export default NotFound;