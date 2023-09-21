import Workspace from "@/componentsB2b/Workspace/Workspace";
import Dashboard from "@/componentsB2b/Workspace/Dashboard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GifLoader from "@/components/common/GifLoader";

const DashboardPage = () => {
const router = useRouter()
useEffect(() => {
    router.push('/vendorb2b/workspace')
}, [])

  return (
    <GifLoader/>
    
        // <Workspace>
        //     <Dashboard />
        // </Workspace>
 
  )    
}

export default DashboardPage;