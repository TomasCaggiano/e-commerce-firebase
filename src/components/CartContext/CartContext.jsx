import React, { createContext, useState } from 'react';

export const CartContext = createContext([]);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    const isInCart = cart.findIndex((item) => item.id === product.id);
    if (isInCart >= 0) {
      const newCart = [...cart];
      const newQuantity = newCart[isInCart].quantity + quantity;
      if (newQuantity > product.stock) {
        console.log('No hay suficiente stock disponible');
      } else {
        newCart[isInCart].quantity = newQuantity;
        setCart(newCart);
      }
    } else {
      if (quantity > product.stock) {
        console.log('No hay suficiente stock disponible');
      } else {
        setCart((prevState) => [...prevState, { ...product, quantity }]);
      }
    }
    console.log(cart);
  };

  const removeFromCart = (product) => {
    setCart((prevState) => prevState.filter((item) => item.id !== product.id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const increment = (product) => {
    const isInCart = cart.findIndex((item) => item.id === product.id);
    if (isInCart >= 0) {
      const newCart = [...cart];
      const newQuantity = newCart[isInCart].quantity + 1;
      if (newQuantity <= product.stock) {
        newCart[isInCart].quantity = newQuantity;
        setCart(newCart);
      } else {
        console.log('No hay suficiente stock disponible');
      }
    }
  };

  const decrement = (product) => {
    const isInCart = cart.findIndex((item) => item.id === product.id);
    if (isInCart >= 0) {
      const newCart = [...cart];
      const newQuantity = newCart[isInCart].quantity - 1;
      if (newQuantity > 0) {
        newCart[isInCart].quantity = newQuantity;
        setCart(newCart);
      }
    }
  };

  return (
    <div>
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          removeFromCart,
          clearCart,
          getTotalPrice,
          increment,
          decrement,
        }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
}

export default CartProvider;
