/**
 * ShoppingCart Component - Redux Implementation
 * 
 * Tính năng:
 * - Hiển thị giỏ hàng
 * - Thêm/xóa sản phẩm
 * - Tính toán tổng tiền + thuế (sử dụng memoized selectors)
 * - Quản lý quantity
 */

import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateItemQuantity, clearCart } from './cartSlice';
import {
  selectCartItems,
  selectCartSummary,
  selectIsCartEmpty,
} from './cartSelectors';
import './ShoppingCart.css';

/**
 * Danh sách sản phẩm mẫu
 */
const PRODUCT_CATALOG = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Mouse Wireless', price: 29.99 },
  { id: 3, name: 'Keyboard Mechanical', price: 149.99 },
  { id: 4, name: 'Monitor 4K', price: 399.99 },
  { id: 5, name: 'USB-C Cable', price: 19.99 },
];

/**
 * CartItem Component - Render từng sản phẩm trong giỏ
 */
function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeItem(item.id));
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="item-details">
        <h4 className="item-name">{item.name}</h4>
        <p className="item-price">${item.price.toFixed(2)}</p>
      </div>

      <div className="item-controls">
        <select
          className="quantity-select"
          value={item.quantity}
          onChange={handleQuantityChange}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
            <option key={qty} value={qty}>
              Qty: {qty}
            </option>
          ))}
        </select>

        <span className="item-total">${itemTotal.toFixed(2)}</span>

        <button className="btn-remove" onClick={handleRemove} title="Remove item">
          ✕
        </button>
      </div>
    </div>
  );
}

/**
 * EmptyCart Component - Hiển thị khi giỏ trống
 */
function EmptyCart() {
  return (
    <div className="empty-cart">
      <div className="empty-icon">🛒</div>
      <h3>Your cart is empty</h3>
      <p>Add items to get started!</p>
    </div>
  );
}

/**
 * CartSummary Component - Hiển thị tổng tiền
 */
function CartSummary() {
  // Sử dụng memoized selector selectCartSummary
  // Chỉ recompute khi items hoặc totalAmount thay đổi
  const summary = useSelector(selectCartSummary);

  return (
    <div className="cart-summary">
      <div className="summary-row">
        <span>Items:</span>
        <span className="summary-value">{summary.itemCount}</span>
      </div>

      <div className="summary-row">
        <span>Subtotal:</span>
        <span className="summary-value">${summary.subtotal.toFixed(2)}</span>
      </div>

      <div className="summary-row highlight">
        <span>Tax (10%):</span>
        <span className="summary-value">${summary.tax.toFixed(2)}</span>
      </div>

      <div className="summary-row total">
        <span>Total:</span>
        <span className="summary-value total-amount">${summary.total.toFixed(2)}</span>
      </div>
    </div>
  );
}

/**
 * ProductCatalog Component - Hiển thị danh sách sản phẩm để thêm vào giỏ
 */
function ProductCatalog() {
  const dispatch = useDispatch();

  const handleAddProduct = (product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  return (
    <div className="product-catalog">
      <h3>Available Products</h3>
      <div className="product-list">
        {PRODUCT_CATALOG.map((product) => (
          <div key={product.id} className="product-item">
            <div className="product-info">
              <h4>{product.name}</h4>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
            <button
              className="btn-add"
              onClick={() => handleAddProduct(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Main ShoppingCart Component
 */
export function ShoppingCart() {
  const dispatch = useDispatch();
  
  // Sử dụng memoized selectors
  const items = useSelector(selectCartItems);
  const isEmpty = useSelector(selectIsCartEmpty);

  const handleClearCart = () => {
    if (window.confirm('Clear entire cart?')) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="shopping-cart-container">
      <div className="cart-header">
        <h1>🛒 Shopping Cart</h1>
        <p className="cart-subtitle">Manage your items and checkout</p>
      </div>

      <div className="cart-content">
        {/* Left: Products */}
        <div className="cart-products">
          <ProductCatalog />
        </div>

        {/* Right: Cart Items + Summary */}
        <div className="cart-sidebar">
          <div className="cart-items-section">
            <div className="section-header">
              <h2>Cart Items</h2>
              {!isEmpty && (
                <button className="btn-clear" onClick={handleClearCart}>
                  Clear Cart
                </button>
              )}
            </div>

            {isEmpty ? (
              <EmptyCart />
            ) : (
              <>
                <div className="items-list">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </>
            )}
          </div>

          {!isEmpty && <CartSummary />}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
