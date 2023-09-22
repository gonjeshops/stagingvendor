import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GlobalStateContext from './GlobalStateContext';
import { useCart } from '@/lib/useCart';

const GlobalStateProvider = ({ children }) => {
  const router = useRouter();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [openNavSubmenu, setOpenNavSubmenu] = useState('');
  const [cartItem, setCartItem] = useState([]);
  const [module, setModule] = useState({ moduleType: 'vendor', navLink: [] });


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



  const openModal = (modalType) => {
    setModalType(modalType);
  };
 
  const closeModal = () => {
    setModalType('');
  };

  const globalState = {
    module,setModule,
    fetchUser,
    showSidebar,
    setShowSidebar,
    openModal,
    closeModal,
    isModalOpen,
    modalType,
    setOpenNavSubmenu,
    openNavSubmenu,
    useCart, // This line might not be necessary. Make sure it's intended.
  };

  return (
    <GlobalStateContext.Provider value={globalState}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
