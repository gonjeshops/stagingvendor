import ProductDetails from "../Products/ProductDetails"
import ModalCentral from "./ModalCentral"

const ProductDetailsModal = ({isOpen, setIsOpen, product}) => {
  return (
    <ModalCentral isOpen={isOpen} closeModal={()=>setIsOpen(false)}>
        <ProductDetails product={product} modal={true}/>
    </ModalCentral>
  )
}

export default ProductDetailsModal