import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const foundCartItems = cartItems.find((item) => item.id === productToAdd.id);

  if (foundCartItems?.id) {
    return cartItems.map((item) => {
      return item.id === foundCartItems.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const foundCartItems = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  );

  if (foundCartItems.quantity === 1) {
    return clearCartItem(cartItems, cartItemToRemove);
  }

  return cartItems.map((item) =>
    item.id === cartItemToRemove.id
      ? {
          ...item,
          quantity: item.quantity - 1,
        }
      : item
  );
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const { newCartCount, newTotal } = cartItems.reduce(
      (acc, cur) => ({
        newCartCount: acc.newCartCount + cur.quantity,
        newTotal: acc.newTotal + cur.quantity * cur.price,
      }),
      { newCartCount: 0, newTotal: 0 }
    );
    setCartCount(newCartCount);
    setTotal(newTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    cartCount,
    clearItemFromCart,
    total
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
