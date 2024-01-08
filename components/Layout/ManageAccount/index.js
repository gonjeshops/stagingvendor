import { useEffect, React, useState } from "react";
import Image from "next/image";
import { userDetail } from "@/api/userDetail";
import ShippingDetails from "./ShippingDetails";
import BillingDetails from "./BiilinDetails";
import ShopDetails from "./ShopDetails";
import { PageLoading } from "@/componentsB2b/Loader/Spinner/PageLoading";
import UserDetails from "./UserDetails";

export default function ManageAccount() {
  const [user, setUser] = useState({})
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(0)

  const fetchProfile = async ()=>{
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

  useEffect(() => {
    fetchProfile()
  }, [])
  
 

  return (
    <>
    {loading ? <div className="fixed inset-0 flex items-center justify-center z-50"><PageLoading /></div> : ''}
      <div className=" ">
        <div className="top-heading ">
          <h3>Manage Account</h3>
        </div>
        
        <div className="shop details space-y-14 relative">
          <div className="relative w-full sm:max-w-6xl mx-auto">
            <div className="w-full h-60  overflow-hidden rounded-lg relative">
             {user && user.shops && user.shops[0] && user.shops[0].cover_image &&  <Image src={user?.shops[0]?.cover_image?.original} width={400} height={200} className="w-full h-full object-cover"/>}
            </div>
            <div className="absolute top-28 left-10 h-40 w-40 rounded-full overflow-hidden">
                {user && user.shops && user.shops[0] && user.shops[0].logo &&  <Image src={user?.shops[0]?.logo?.original} width={150} height={150} className="w-full h-full object-cover"/>}
            </div>
          </div>

            <div className="grid md:grid-cols-2 gap-14">
                <UserDetails user={user} fetchProfile={fetchProfile} />
                <ShopDetails  user={user} fetchProfile={fetchProfile}/>
            </div>
            <div className="grid md:grid-cols-2 gap-14">
                <ShippingDetails  user={user} fetchProfile={fetchProfile}/>
                <BillingDetails  user={user} fetchProfile={fetchProfile}/>
            </div>
        </div>

      </div>
      </>
  );
}
