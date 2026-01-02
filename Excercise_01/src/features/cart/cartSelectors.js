/**
 * Cart Selectors - Memoized Selectors
 * 
 * Mục đích: 
 * - Tạo các selector để access cart state
 * - Sử dụng memoization để tối ưu performance
 * - Các selectors chỉ recompute khi input thay đổi
 * 
 * createSelector giúp:
 * 1. Tránh unnecessary re-renders
 * 2. Tính toán derived state một lần duy nhất
 * 3. Comparision dùng referential equality
 */

import { createSelector } from '@reduxjs/toolkit';

// ==================== BASE SELECTORS ====================
// Các selector cơ bản để access state slice

const selectCartState = (state) => state.cart;

// ==================== MEMOIZED SELECTORS ====================

/**
 * selectCartItems
 * @returns {Array} Danh sách items trong giỏ
 * 
 * Memoized: Chỉ recompute khi cartState.items thay đổi
 */
export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.items
);

/**
 * selectTotalAmount
 * @returns {number} Tổng giá trị sản phẩm
 * 
 * Memoized: Chỉ recompute khi cartState.totalAmount thay đổi
 */
export const selectTotalAmount = createSelector(
  [selectCartState],
  (cart) => cart.totalAmount
);

/**
 * selectCartItemCount
 * @returns {number} Tổng số lượng sản phẩm
 * 
 * Memoized: Chỉ recompute khi items thay đổi
 */
export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);

/**
 * selectCartTax
 * @returns {number} Thuế (10% của totalAmount)
 * 
 * MEMOIZED SELECTOR CHALLENGE:
 * - Tính 10% thuế dựa trên totalAmount
 * - Chỉ recompute khi totalAmount thay đổi
 * - Tránh việc recalculate lại mỗi khi component render
 * 
 * Hiệu năng:
 * - Nếu không dùng memoized selector:
 *   Component render mỗi khi parent re-render => Tax tính lại nhiều lần không cần thiết
 * - Với memoized selector:
 *   Tax chỉ tính khi totalAmount thực sự thay đổi
 */
export const selectCartTax = createSelector(
  [selectTotalAmount],
  (totalAmount) => {
    // Tax rate: 10%
    const TAX_RATE = 0.1;
    const tax = totalAmount * TAX_RATE;

    // Return làm tròn đến 2 chữ số thập phân
    return Math.round(tax * 100) / 100;
  }
);

/**
 * selectCartTotal
 * @returns {number} Tổng cộng (Tổng giá + Thuế)
 * 
 * Memoized: Recompute chỉ khi totalAmount hoặc tax thay đổi
 */
export const selectCartTotal = createSelector(
  [selectTotalAmount, selectCartTax],
  (totalAmount, tax) => {
    const total = totalAmount + tax;
    // Làm tròn đến 2 chữ số thập phân
    return Math.round(total * 100) / 100;
  }
);

/**
 * selectIsCartEmpty
 * @returns {boolean} Kiểm tra giỏ hàng có trống không
 */
export const selectIsCartEmpty = createSelector(
  [selectCartItemCount],
  (itemCount) => itemCount === 0
);

/**
 * selectCartSummary
 * @returns {Object} Summary của giỏ hàng
 * 
 * Tổng hợp tất cả thông tin cần thiết:
 * - itemCount: Tổng số lượng sản phẩm
 * - itemsInCart: Số loại sản phẩm
 * - subtotal: Tổng giá trước thuế
 * - tax: Thuế 10%
 * - total: Tổng cộng
 */
export const selectCartSummary = createSelector(
  [selectCartItems, selectCartItemCount, selectTotalAmount, selectCartTax, selectCartTotal],
  (items, itemCount, subtotal, tax, total) => ({
    itemCount,
    itemsInCart: items.length,
    subtotal,
    tax,
    total,
  })
);

/**
 * Selector để lấy thông tin chi tiết của một item cụ thể
 * @param {number} itemId - ID của item
 * @returns {Object|undefined} Item object hoặc undefined nếu không tìm thấy
 */
export const selectCartItemById = (itemId) =>
  createSelector(
    [selectCartItems],
    (items) => items.find((item) => item.id === itemId)
  );
