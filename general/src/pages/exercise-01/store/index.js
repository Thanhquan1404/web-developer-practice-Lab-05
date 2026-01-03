/**
 * Redux Store Configuration
 * 
 * Sử dụng RTK configureStore:
 * - Tự động setup Redux DevTools
 * - Middleware cho async thunks
 * - Serialization checks
 */

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';

/**
 * Configure và export store
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // Thêm các slices khác ở đây
    // user: userReducer,
    // filters: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Cấu hình serialization checks nếu cần
      serializableCheck: {
        // Có thể ignore một số actions nếu cần
        // ignoredActions: ['action/type'],
      },
    }),
  // Enable devtools ngoại trừ production
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
