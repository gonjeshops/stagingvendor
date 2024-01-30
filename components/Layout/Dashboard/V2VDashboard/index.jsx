import {useMemo} from 'react'
import RevenueReport from '../Revenue';
import OrderAndProfit from '../OrderAndProfit';
import Statistics from '../Statistics';

const V2VDashboard = ({dashboardData, setModalType}) => {
    
  return (
    <div>
        
        <div className="flex gap-8 w-full flex-wrap">

            <div className="flex gap-8 w-full ">
                <div className="w-full">
                  <Statistics dashboardData={dashboardData} type='v2v' />
                </div>
              </div>
            
            <div className="cards">
                <h2 className="cardh4 mb-">Top Selling Products</h2>
                <table className="min-w-full">
                    <thead>
                    <tr className="">
                        {/* <th className="text-left p-2">Product name</th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {dashboardData?.topSellingB2CProducts &&
                        dashboardData?.topSellingB2CProducts?.map((product, i) => {
                        return (
                            <tr key={i} className="border-b border-gray-300">
                                <td className="p-4">{product?.[0]}</td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>

            <OrderAndProfit
                orderData={dashboardData?.totalMonthlyB2COrders}
                setModalType={setModalType}
                modal={'totalMonthlyB2COrders'}
            />
            <RevenueReport data={dashboardData?.totalMonthlyB2CRevenue} setModalType={setModalType}
                modal={'totalMonthlyB2CRevenue'}
          />

        </div>
    </div>
  )
}

export default V2VDashboard