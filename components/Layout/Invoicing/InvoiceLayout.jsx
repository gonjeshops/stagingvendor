import Tabs from '../Expenses/Tabs'

const InvoiceLayout = ({children, searchBar}) => {
  return (
    <main className='space-y-8'>
        <Tabs columns={2} navs={[{link: 'received_invoice', title: 'Received Invoice'}, {link: 'sent_invoice', title: 'Sent Invoice'},]}/>

        <div className="bg-light100 rounded-lg space-y-8 py-8 ">
            
            {searchBar}

        </div>
            <div className="bg-light100 rounded-lg ">
            {children}

        </div>
    </main>
  )
}

export default InvoiceLayout