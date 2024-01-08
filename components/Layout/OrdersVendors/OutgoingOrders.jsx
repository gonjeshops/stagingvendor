import { fetchOutgoingOrders, } from '@/componentsB2b/Api2'
import { useState } from 'react'

import VendorPageLayout from '../VendorPagesLayout'
import FetchDataAndRenderPageB2C from '@/components/FetchDataAndRenderPageB2C'
import OrderSearchBar from './OrderSearchBar'
import TableLayout from '../Expenses/TableLayout'
import OrderTableRow from './OrderTableRow'

const OutgoingOrders = () => {

    const header = ['ORDER ID', 'TOTAL', 'BUYER', 'ITEMS', 'STATUS', 'DATE', 'TRACKING NUMBER', 'CONSIGNMENT NUMBER', 'DELIVERY COMPANY', 'QUOTE NAME', 'SHOP',  'SHIPPING DETAILS']

    const [search, setSearch] = useState('')
    const [refresh, setRefresh] = useState(false)

    const renderOutgoingOrdersTable = (response, ) =>  (
        response?.data?.data?.quotes?.length ?
        <TableLayout header={header}>
            {console.log('Orders', response?.data?.data?.quotes)}
            <OrderTableRow path={'outgoing' } data={response?.data?.data?.quotes} setRefresh={setRefresh}/>
        </TableLayout>
        :
        <div className="absolute text-semibold inset-0 flex items-center justify-center text-center">
            <p>No Orders found.</p>
        </div>
    )

    return (
    <VendorPageLayout 
        navs={[{link: 'incoming', title: 'Incoming Orders', type: 'BUYING'}, {link: 'outgoing', title: 'Outgoing Orders', type: 'SELLING'},]}
        searchBar={<OrderSearchBar setSearch={setSearch} setRefresh={setRefresh}/>}
        >
        <FetchDataAndRenderPageB2C
            fetchDataFunction={fetchOutgoingOrders}
            renderComponent={renderOutgoingOrdersTable}
            pageLimit = {20}
            loadingTimeoutDuration = {8000}
            refresh={refresh}
            search={search}
        />
    </VendorPageLayout>
    )
}


export default OutgoingOrders