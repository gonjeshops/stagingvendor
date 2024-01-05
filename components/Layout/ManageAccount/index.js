import { useEffect, React, useState } from "react";
import Calender from "./Calender";
import ShippingAddress from "./ShippingAddress";
// import BillingInfo from "./BillingInfo";
// import Checkout from "./Checkout";
// import UpdateCard from "../Card/UpdateCard";
// import Wallet from "./Wallet";
import Image from "next/image";
import { userDetail } from "@/api/userDetail";
import BusinessDetails from "./BusinessDetails";
import ShippingDetails from "./ShippingDetails";
import BillingDetails from "./BiilinDetails";
import ShopDetails from "./ShopDetails";
// import UpdateCard from "@/components/Card/UpdateCard";

export default function ManageAccount() {
  const [user, setUser] = useState({})
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(0)
  

  useEffect(() => {
    const fetchData = async ()=>{
      try {
        setLoading(1)
        const response = await userDetail()
        if (response?.status===200){
          setUser(response?.data)
        } else {
          setError('Something went wrong. Check network access.')
          console.log('userDetails response error', error)
        }
      } catch (error) {
        console.log('userDetails catch error', error)
      } finally {
        setLoading(0)
      }
    }
    fetchData()
  }, [])
  
 

  return (
      <div className=" ">
        <div className="top-heading ">
          <h3>Manage Account</h3>
        </div>
        

        <div className="shop details space-y-14 relative">
            <div className="w-full h-60  overflow-hidden rounded-lg">
             {user && user.shops && user.shops[0] && user.shops[0].cover_image &&  <Image src={user?.shops[0]?.cover_image?.original} width={400} height={200} className="w-full h-full object-cover"/>}
            </div>
            <div className="absolute top-16 left-10 h-40 w-40 rounded-full overflow-hidden">
                {user && user.shops && user.shops[0] && user.shops[0].logo &&  <Image src={user?.shops[0]?.logo?.original} width={150} height={150} className="w-full h-full object-cover"/>}
            </div>

            <div className="grid md:grid-cols-2 gap-14">
                <BusinessDetails/>
                <ShopDetails/>

            </div>
            <div className="grid md:grid-cols-2 gap-14">
                <ShippingDetails/>
                <BillingDetails/>
            </div>
        </div>

          <div className="grid mt-14 md:grid-cols-2 gap-10 ">
            <ShippingAddress user={user}/>
          </div>
      </div>
  );
}
