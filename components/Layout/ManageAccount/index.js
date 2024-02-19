import { useEffect, React, useState } from "react";
import Image from "next/image";
import { userDetail } from "@/api/userDetail";
import ShippingDetails from "./ShippingDetails";
import BillingDetails from "./BiilinDetails";
import ShopDetails from "./ShopDetails";
import { PageLoading } from "@/componentsB2b/Loader/Spinner/PageLoading";
import UserDetails from "./UserDetails";
import Loader from "@/components/common/Loader";
import { FaCamera, FaRegEdit, FaStoreAlt } from "react-icons/fa";
import { UploadAttachments } from "./UploadAttachments";

export default function ManageAccount() {
  const [user, setUser] = useState({})
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(0)
  const [uploadType, setUploadType] = useState('')
  const [modal, setModal] = useState(0)
  const [refectchUser, setRefectchUser] = useState(0)

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
  }, [refectchUser])
  


 console.log('user-obj', user)

  return (
    <>
    {loading ? <Loader /> : ''}
      <div className=" ">
        <div className="top-heading ">
          <h3>Manage Account</h3>
        </div>


        <div className="shop details space-y-14 relative">
          <div className="relative w-full sm:max-w-6xl mx-auto">
                <div className="w-full h-60  overflow-hidden rounded-lg relative bg-gray-300 flex justify-center items-center ">
                    {user && user.shops && user.shops[0] && user.shops[0].cover_image ?  
                    <Image src={user?.shops[0]?.cover_image?.original ? user?.shops[0]?.cover_image?.original : user?.shops[0]?.cover_image?.[0]?.original}  alt="cover_img" width={400} height={200} className="w-full h-full object-cover"/>
                    : 
                      <FaStoreAlt size={60} className="text-gray-400"/>
                    }
                    <button onClick={()=>{
                        setModal(true)
                        setUploadType('cover_image')
                        }} className="absolute bottom-4 right-4  bg-green-600 text-white p-3 rounded-full "><FaRegEdit size={20}/>
                    </button>
                </div>
                <div className="absolute top-28 left-10 h-40 w-40 ">
                    <div className="w-full h-full flex justify-center items-center rounded-full overflow-hidden bg-gray-400">
                      {user && user.shops && user.shops[0] && user.shops[0].logo ?  
                      <Image src={user?.shops[0]?.logo?.original ? user?.shops[0]?.logo?.original : user?.shops[0]?.logo?.[0]?.original} alt="logo_img" width={150} height={150} className="w-full h-full object-cover"/> 
                      : 
                      <FaCamera size={36} className="text-gray-600"/>
                    }
                    </div>
                    <button onClick={()=>{
                        setModal(true)
                        setUploadType('logo')
                        }} className="absolute top-20 -right-4  bg-green-600 text-white p-3 rounded-full "><FaRegEdit size={20}/>
                    </button>
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

        <UploadAttachments setModal={setModal} setRefectchUser={setRefectchUser} modal={modal} user={user} uploadType={uploadType}/>


      </div>
      </>
  );
}
