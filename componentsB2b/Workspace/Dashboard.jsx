import { workspaceData } from '../../data/workspaceData'
import Card from './Card'
import Chart from './Chart'
import DashboardHeading from './DashboardHeading'

const Dashboard = () => {
  return (
    
    <> 
        
        <div className=" mb-2 sm:mb-0 w-full ">
            <DashboardHeading>Dashboard</DashboardHeading>
           
        </div>

                
                <div className="px-4 rounded-xl bg-light200 w-full grid grid-cols-2 md:grid-cols-3">
                    <Card data={workspaceData.quotes} 
                        iconColor={`text-blue-600`}
                        titleColor={`text-blue-600`}
                        titleBold={`text-semibold`}
                    />
                    <Card data={workspaceData.sentEmail} 
                        iconColor={`text-blue-600`}
                    />
                    <Card data={workspaceData.deliveredEmail} 
                        iconColor={`text-blue-600`}
                    />
                    <Card data={workspaceData.openedEmail} 
                        iconColor={`text-blue-600`}
                    />
                    <Card data={workspaceData.clickedEmail} 
                        iconColor={`text-green-600`}
                    />
                    <Card data={workspaceData.bouncedEmail} 
                        iconColor={`text-red-600`}
                    />
                </div>
                

                <div className="px-4 py-8 grid sm:grid-cols-2 gap-6 md:gap-12">
                    <Chart type={'Pie'} heading={`Email Campaign Report`} description='Paid and verified for each piece of content' />
                    <Chart type={'Bar'} heading={`Marketing Campaign Report`} description='According to the sales and data' />
                </div>

                <div className="py-8 px-4 bg-light200 grid sm:grid-cols-2 gap-6 md:gap-12">
                    <Chart type={'Line'} heading={`Sales Trends`} description='Updated inventroy & the sales report.' />
                    <Chart type={'Doughnut'} heading={`Call Campaign Report`} description='All Call Campaign Succeeded' />
                </div>
    </>
  )
}

export default Dashboard