import React from 'react'
import ModalCentral from './ModalCentral';
import NotificationModal from './NotificationModal';
import ModalProfileDropdown from './ModalProfileDropdown';
import ModalSupplierCategory from './ModalSupplierCategory';
import ModalSearchBox from './ModalSearchBox';
import ModalCart from './ModalCart';
import ModalMobilwNavbar from './ModalMobilwNavbar';
import ModalWishlist from './ModalWishlist';
import ModalQuoteForm from './ModalQuoteForm';

const ModalLayout = () => {
    
    const stopPropagation = (e) => {
        e.stopPropagation();
      };
  
  return (
    <>

        {/* <ModalCentral stopPropagation={stopPropagation}/> */}
        <NotificationModal  stopPropagation={stopPropagation}/>
        <ModalProfileDropdown  stopPropagation={stopPropagation}/>
        <ModalCart  stopPropagation={stopPropagation}/> 
        <ModalSupplierCategory  stopPropagation={stopPropagation}/>
        <ModalMobilwNavbar stopPropagation={stopPropagation}/>
        <ModalSearchBox  stopPropagation={stopPropagation} />
        <ModalWishlist  stopPropagation={stopPropagation} />
        <ModalQuoteForm/>        
    </>
  )
}

export default ModalLayout