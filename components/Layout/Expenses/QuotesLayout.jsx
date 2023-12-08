
import FilterCollection from './FilterCollection'
import TableLayout from './TableLayout'
import Tabs from './Tabs'

const QuotesLayout = ({children, header}) => {

  return (
    <div>
        <Tabs/>
        {children}     
    </div>
  )
}

export default QuotesLayout