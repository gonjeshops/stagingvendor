import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GlobalStateContext from './GlobalStateContext';
import { useCart } from '@/lib/useCart';
import { useCartB2B } from '@/lib/useCartB2B';

const GlobalStateProvider = ({ children }) => {
  const router = useRouter();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [openNavSubmenu, setOpenNavSubmenu] = useState('');
  const [cartItem, setCartItem] = useState([]);
  const [module, setModule] = useState({ moduleType: 'vendor', navLink: [] });
  const [user, setUser] = useState('')
  const [checkoutData, setCheckoutData] = useState('')
  const [supplierDetails, setSupplierDetails] = useState('')

  // Function to retrieve "user-details" from local storage
  useEffect(() => {
  function getUserDetailsFromLocalStorage() {
    try {
      // Retrieve the stored user details as a JSON string
      const userDetailsJSON = localStorage.getItem('user_detail');
  
      // Parse the JSON string into a JavaScript object
      const userDetails = JSON.parse(userDetailsJSON);
  
      // Check if the parsing was successful
      if (userDetails && typeof userDetails === 'object') {
        setUser(userDetails);
        console.log('User details retrieved:', userDetails);

      } else {
        // If the stored data is not valid JSON or an object, return null
        return setUser(null);
      }
    } catch (error) {
      // Handle any errors that may occur during retrieval
      console.error('Error retrieving user details from local storage:', error);
      return null;
    }
  }
  getUserDetailsFromLocalStorage()

  
  }, [])

  // Create quote or cart functionality
  const useB2Bcart = useCartB2B()

  // Use useEffect for initial setup when the component mounts
  useEffect(() => {
    setShowSidebar(false);
    closeModal()
  }, [router.pathname]);

  const fetchUser = (param) => {
    setModule(prev => {
      return {
        ...prev,
        moduleType: param
      }
    })
  }

  // logout
  const logout = () => {
    localStorage.setItem("user_detail", null)
    router.push('/')
  }


  const openModal = (modalType) => {
    setModalType(modalType);
  };
 
  const closeModal = () => {
    setModalType('');
  };

// managing display similar products in product details page
  const [active, setActive] = useState(1)

   

  const globalState = {
    user,
    logout,
    module,setModule,
    fetchUser,
    useB2Bcart,
    showSidebar,
    setShowSidebar,
    openModal,
    closeModal,
    isModalOpen,
    modalType,
    setOpenNavSubmenu,
    openNavSubmenu,
    useCart, // This line might not be necessary. Make sure it's intended.
    checkoutData, setCheckoutData,
    supplierDetails, setSupplierDetails,
    active, setActive,
  };

  return (
    <GlobalStateContext.Provider value={globalState}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
