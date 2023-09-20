import Workspace from '@/componentsB2b/Workspace/Workspace'
import SuppliersCatalogue from '@/componentsB2b/Suppliers/SuppliersCatalogue'

const supplier = () => {
    
  return (
    <div className="section-padding">
        <Workspace>
            <SuppliersCatalogue/>
        </Workspace>
    </div>
  )
}

export default supplier