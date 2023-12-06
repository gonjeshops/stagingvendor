import {  useState,  } from 'react';
import { toast } from 'react-toastify';

export const useCartB2C = (user,  ) => {
  


console.log('user b2c', user, )


  const [showCart, setShowCart] = useState(false);
  const [shop, setShop] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shopName, setShopname] = useState('');
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [quoteName, setQuoteName] = useState('')

  let foundItem;
  let index;

  const onAdd = (product, quantity, shopName, userId, shopId, ) => {
    setShop({id: shopId, ownerId: userId})
    setShopname(shopName)
console.log('testing add', product)
    const checkProductInCart = cartItems.find((item) => item?.id === product.id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if(cartItems?.length && cartItems[0]?.shopId === product?.shop_id) {
      // update the same cart if products are from the same shop
      if(checkProductInCart) {
        const updatedCartItems = cartItems.map((item) => {
          // check if product exist in quote/cart
          if(item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
            subtotal: item.subtotal + product?.price * quantity,
            } } else {
              return item
            }
        })
        setCartItems(prev=>updatedCartItems);
      } else {
          // add new item if it does not exist
        const newItem = {
              quantity: quantity,
              price: product?.price,
              id: product?.id,
              name: product?.name,
              inStock: product?.quantity,
              shopId: product?.shop_id,
              unit: product?.unit,
              subtotal: product?.price * quantity,
              product: product,
              shopName: shopName,
              userName: `${user?.user_name} ${user?.user_lastname}`,
          }     
        setCartItems([...cartItems, { ...newItem }]);
      }

    } else {
      // clearCart() create new cart when if prooduct is not from the same shop
      console.log('USER=', user)

      const newItem = {
        quantity: quantity,
        price: product?.price,
        id: product?.id,
        name: product?.name,
        inStock: product?.in_stock,
        shopId: product?.shop_id,
        unit: product?.unit,
        subtotal: product?.price * quantity,
        product: product,
        userName: `${user?.user_name} ${user?.user_lastname}`,
        shopName: shopName
    }     
    setCartItems([ { ...newItem }]);
    setTotalPrice( product.price * quantity);
    setTotalQuantities(quantity);
    }
    toast.success(`${quantity} ${product.name} added to the cart.`);
  } 

  const onRemove = (product) => {
    foundItem = cartItems.find((item) => item?.id === product.id);
    
    if (foundItem) {
      const newCartItems = cartItems.filter((item) => item?.id !== product.id);
      
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundItem?.price * foundItem.quantity);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundItem.quantity);
      setCartItems(newCartItems);
    }
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundItem = cartItems.find((item) => item.id === id)
    index = cartItems.findIndex((item) => item.id === id);
    
    if (value === 'inc') {
      const updatedItem = {
          ...foundItem,
          quantity: foundItem?.quantity + 1,
          subtotal: (foundItem?.quantity + 1) * foundItem?.price
      };
      const updatedCartItems = [...cartItems];
      updatedCartItems[index] = updatedItem;
      setCartItems(updatedCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundItem?.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
  } else if (value === 'dec') {
      if (foundItem.quantity > 1) {
          const updatedItem = {
              ...foundItem,
              quantity: foundItem.quantity - 1,
              subtotal: (foundItem?.quantity - 1) * foundItem?.price
          };
          const updatedCartItems = [...cartItems];
          updatedCartItems[index] = updatedItem;
          setCartItems(updatedCartItems);
          setTotalPrice((prevTotalPrice) => prevTotalPrice - foundItem?.price);
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
  }
  
   
  }

  const clearCart = () => {
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
    setQuoteName('')
  }

  const quoteCartcalculator = (quoteCartItems) => {
    const quoteProducts = quoteCartItems?.cart_items

    let calculatedSubtotal = 0, quoteQuantity = 0;
      for (const item of quoteProducts) {
        if (item && item.price && item.quantity) {
          calculatedSubtotal += item?.price * item?.quantity || 0;
          quoteQuantity += item?.quantity
        } else {
          console.log('The item details for quote calculator are not available.')
        }
      }
      
console.log('quoteCartcalculator==', quoteProducts, calculatedSubtotal, quoteQuantity)
    return {
      quoteProducts, calculatedSubtotal, quoteQuantity
    }

  }
 
  // TODO: Implement a situation when that prevents user from adding quote with a different shopId. Quotes are only associated to 1 shop. so products from another store cannot be addded to a sifferent store. COMPLETED

  // TOD: check if user has an unsubmitted quote in the cart. COMPLETED

  // TODO: Notifications for incomplete quotes. COMPLETED

  // TODO: ability to edit quote from quote request page ...COMPLETED

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return {
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        shopName,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        clearCart,
        quoteName, setQuoteName,
        setTotalPrice,
        setTotalQuantities,
        quoteCartcalculator,
        shop, setShop,
        
      }
}
