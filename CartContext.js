import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // إضافة منتج للسلة أو تحديث كميته إذا موجود مسبقاً
  function addToCart(item, quantity = 1) {
    const exist = cartItems.find(i => i.id === item.id);
    if (exist) {
      setCartItems(
        cartItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity }]);
    }
  }

  // حذف منتج من السلة بناءً على id
  function removeFromCart(id) {
    setCartItems(cartItems.filter(i => i.id !== id));
  }

  // تحديث كمية منتج معين بناءً على id
  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      // إذا كانت الكمية صفر أو أقل، نحذف المنتج من السلة
      removeFromCart(id);
    } else {
      setCartItems(
        cartItems.map(i =>
          i.id === id ? { ...i, quantity } : i
        )
      );
    }
  }

  // حساب السعر الإجمالي لكل المنتجات في السلة (مفترض كل منتج له خاصية price)
  function getTotalPrice() {
    return cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
