
import FilterCollection from './FilterCollection'
import TableLayout from './TableLayout'
import Tabs from './Tabs'

const QuotesLayout = ({children, header}) => {

  return (
    <div>
        <Tabs navs={[
        {title: 'Product List', link: 'products'}, 
        {title: 'Received Quotes', link: 'received_quotes'}, 
        {title: 'Sent Quotes', link: 'sent_quotes'}, 
    ]}/>
        {children}     
    </div>
  )
}

export default QuotesLayout