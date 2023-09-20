import { useState } from "react";


export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);


  const addToCart = (product) => {
    setCartItems(prevCartItems => {
      const existingItemIndex = prevCartItems.findIndex(item => item.slug === product.slug);
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCartItems];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }
      return [...prevCartItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productSlug) => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => item.slug !== productSlug)
    );
  };

  const reduceItemQuantity = (productSlug) => {
    setCartItems(prevCartItems => {
      const existingItemIndex = prevCartItems.findIndex(item => item.slug === productSlug);
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCartItems];
        if (updatedCart[existingItemIndex].quantity > 1) {
          updatedCart[existingItemIndex].quantity -= 1;
        } else {
          updatedCart.splice(existingItemIndex, 1);
        }
        return updatedCart;
      }
      return prevCartItems;
    });
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    reduceItemQuantity,
    getCartCount,
    getCartTotalPrice,
  };
};

