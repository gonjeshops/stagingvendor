import Workspace from "@/componentsB2b/Workspace/Workspace";
import Dashboard from "@/componentsB2b/Workspace/Dashboard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PageLoading } from "@/componentsB2b/Loader/Spinner/PageLoading";


const DashboardPage = () => {
const router = useRouter()
useEffect(() => {
    router.push('/vendorb2b/workspace')
}, [])

  return (
    
    
        <Workspace>
            <PageLoading/>
        </Workspace>
 
  )    
}

export default DashboardPage;