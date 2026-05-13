import { createSlice, createSelector } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }
      state.items.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    updateCartItem: (state, action) => {
      const { id, updatedItem } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        Object.assign(item, updatedItem);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, updateCartItem, clearCart } = cartSlice.actions;

// Base Selector
export const cartItems = (state) => state.cart.items;

// Memoized Selectors for Performance
export const selectCartTotalItems = createSelector(
  [cartItems],
  (items) => items.reduce((sum, item) => sum + (item.quantity || 1), 0)
);

export const selectCartTotalPrice = createSelector(
  [cartItems],
  (items) => items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
);

export default cartSlice.reducer;
