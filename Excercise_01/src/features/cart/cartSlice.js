/**
 * Cart Slice - Redux Toolkit
 * 
 * Mục đích: Quản lý global state của Shopping Cart
 * 
 * State structure:
 * {
 *   items: [
 *     { id, name, price, quantity },
 *     ...
 *   ],
 *   totalAmount: 0
 * }
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
};

/**
 * Cart Slice
 * RTK sử dụng Immer internally, vì vậy ta có thể "mutate" state một cách an toàn
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * ADD_ITEM: Thêm item vào giỏ hoặc tăng quantity
     * 
     * Logic:
     * 1. Kiểm tra item đã tồn tại chưa
     * 2. Nếu có: tăng quantity
     * 3. Nếu không: thêm item mới
     * 4. Update totalAmount
     */
    addItem: (state, action) => {
      const { id, name, price, quantity = 1 } = action.payload;

      // Tìm item trong giỏ
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Item đã tồn tại: tăng quantity
        existingItem.quantity += quantity;
      } else {
        // Item mới: thêm vào giỏ
        state.items.push({
          id,
          name,
          price,
          quantity,
        });
      }

      // Update totalAmount (Immer allows mutations)
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    /**
     * REMOVE_ITEM: Giảm quantity hoặc xóa item nếu quantity = 1
     * 
     * Logic:
     * 1. Tìm item trong giỏ
     * 2. Giảm quantity đi 1
     * 3. Nếu quantity = 0: xóa item
     * 4. Update totalAmount
     */
    removeItem: (state, action) => {
      const itemId = action.payload;

      // Tìm index của item
      const itemIndex = state.items.findIndex((item) => item.id === itemId);

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];

        if (item.quantity > 1) {
          // Giảm quantity
          item.quantity -= 1;
        } else {
          // Xóa item khỏi giỏ
          state.items.splice(itemIndex, 1);
        }

        // Update totalAmount
        state.totalAmount = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    },

    /**
     * UPDATE_ITEM_QUANTITY: Cập nhật quantity trực tiếp
     * 
     * Hữu ích cho việc update quantity từ input field
     */
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity <= 0) {
          // Nếu quantity <= 0: xóa item
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          // Update quantity
          item.quantity = quantity;
        }

        // Update totalAmount
        state.totalAmount = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    },

    /**
     * CLEAR_CART: Reset giỏ hàng
     */
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

// Export actions
export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
