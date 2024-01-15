import CenterModal from '@/components/ui/CenterModal'
import React from 'react'

const DataTableModal = ({modalType, setModalType, dashboardData}) => {
  return (
    <CenterModal centerModal={modalType} setCentreModal={setModalType}>
        {modalType==='topProductsForPieChart' && <TopProductsPieChartTable data={dashboardData?.topProductsForPieChart}/>}
        {modalType==='totalOrdersPerMonth' && <OrdersPerMonthModal data={dashboardData?.topProductsForPieChart}/>}
        {modalType==='transactionsForLast12Months' && <RevenueModal data={dashboardData?.topProductsForPieChart}/>}
    </CenterModal>
  )
}

export default DataTableModal

export const TopProductsPieChartTable = ({data}) => (
    <>
      <h2 className="cardh4 mb-4">Top Products for Pie Chart</h2>
      <table className="min-w-full border rounded-md">
        <thead>
          <tr>
            <th className="border p-2">Product ID</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Total Sold</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((product) => (
              <tr key={product.product_id}>
                <td className="border p-2">{product.product_id}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.total_sold}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
)

export const OrdersPerMonthModal = ({data}) => (
    <>
      <h2 className="cardh4 mb-4">Total Orders Per Month</h2>
      <table className="min-w-full border rounded-md">
        <thead>
          <tr>
            <th className="border p-2">Month</th>
            <th className="border p-2">Total Orders</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map(({ month, total_orders }) => (
              <tr key={month}>
                <td className="border p-2">{month}</td>
                <td className="border p-2">{total_orders}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
)


export const RevenueModal = ({data}) => (
    <>
      <h2 className="cardh4 mb-4">Transactions for Last 12 Months</h2>
      <table className="min-w-full border rounded-md">
        <thead>
          <tr>
            <th className="border p-2">Month</th>
            <th className="border p-2">Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map(({ month, total_revenue }) => (
              <tr key={month}>
                <td className="border p-2">{month}</td>
                <td className="border p-2">{total_revenue ? '$'+total_revenue : ''}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
)
