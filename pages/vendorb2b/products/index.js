import ProductsCatalogue from "@/componentsB2b/Products/ProductsCatalogue"
import Workspace from "@/componentsB2b/Workspace/Workspace"

const dashboard = () => {
  return (
    <div className="md:section-padding">
      <Workspace>
          <ProductsCatalogue/>
      </Workspace>
    </div>
  )    
}

export default dashboard