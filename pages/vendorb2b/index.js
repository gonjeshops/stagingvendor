import Workspace from "@/componentsB2b/Workspace/Workspace";
import Dashboard from "@/componentsB2b/Workspace/Dashboard";
import { useGlobalState } from '@/context/GlobalStateContext';
import { vendorWorkspaceLinks } from '@/data/workspaceData';
import { useEffect } from "react";

const DashboardPage = () => {

  return (
    <div className="section-padding">
        <Workspace>
            <Dashboard />
        </Workspace>
    </div>
  )    
}

export default DashboardPage;