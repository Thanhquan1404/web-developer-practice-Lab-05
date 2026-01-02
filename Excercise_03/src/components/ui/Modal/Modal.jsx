/**
 * Modal.jsx
 * 
 * Modal Component using React Portals
 * 
 * Pattern: Portals
 * - Render nội dung Modal ra khỏi cây React hiện tại
 * - Giải quyết vấn đề overflow: hidden hoặc z-index
 * - Event vẫn bubble up theo React tree (không phải DOM tree)
 * 
 * Ưu điểm:
 * 1. Vượt qua DOM constraints (overflow, z-index)
 * 2. Event bubbling vẫn hoạt động chính xác
 * 3. Nested modals được hỗ trợ dễ dàng
 * 4. Portal children xem DOM tree as React hierarchy
 * 
 * Usage:
 * <Modal isOpen={isOpen} onClose={handleClose}>
 *   <Modal.Header>Title</Modal.Header>
 *   <Modal.Body>Content</Modal.Body>
 *   <Modal.Footer>Buttons</Modal.Footer>
 * </Modal>
 */

import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

/**
 * ============================================
 * MODAL CHILD COMPONENTS
 * ============================================
 */

/**
 * ModalHeader - Header của modal
 */
function ModalHeader({ children, className = '' }) {
  return (
    <div className={`${styles.header} ${className}`}>
      {children}
    </div>
  );
}

ModalHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * ModalBody - Nội dung chính của modal
 */
function ModalBody({ children, className = '' }) {
  return (
    <div className={`${styles.body} ${className}`}>
      {children}
    </div>
  );
}

ModalBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

/**
 * ModalFooter - Footer của modal (thường chứa buttons)
 */
function ModalFooter({ children, className = '' }) {
  return (
    <div className={`${styles.footer} ${className}`}>
      {children}
    </div>
  );
}

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * ============================================
 * MAIN MODAL COMPONENT
 * ============================================
 */

/**
 * Modal Component
 * 
 * Props:
 * - isOpen: {boolean} - Điều khiển hiển thị/ẩn modal
 * - onClose: {function} - Callback khi close (esc hoặc backdrop click)
 * - children: {ReactNode} - Nội dung modal
 * - closeOnEscape: {boolean} - Đóng modal khi nhấn Esc (default: true)
 * - closeOnBackdropClick: {boolean} - Đóng khi click backdrop (default: true)
 * - portalId: {string} - ID của DOM element để render portal vào (default: 'modal-root')
 * - className: {string} - Class CSS tùy chỉnh cho modal content
 */
function Modal({
  isOpen = false,
  onClose = () => {},
  children,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  portalId = 'modal-root',
  className = '',
}) {
  /**
   * Xử lý đóng modal khi nhấn Esc
   * Sử dụng useCallback để tối ưu hóa listeners
   */
  const handleEscapeKey = useCallback((event) => {
    if (closeOnEscape && event.key === 'Escape') {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  /**
   * Xử lý click backdrop
   * Chỉ close nếu click chính xác trên backdrop, không phải modal content
   */
  const handleBackdropClick = useCallback((event) => {
    if (
      closeOnBackdropClick &&
      event.target.classList.contains(styles.backdrop)
    ) {
      onClose();
    }
  }, [closeOnBackdropClick, onClose]);

  /**
   * Setup event listeners khi modal mở
   * Cleanup khi modal đóng hoặc component unmount
   */
  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleEscapeKey);

    // Disable scroll khi modal mở
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, handleEscapeKey]);

  // Không render nếu không mở
  if (!isOpen) return null;

  /**
   * Lấy portal container hoặc tạo mới nếu không tồn tại
   * 
   * IMPORTANT: Trong production, #modal-root phải được khai báo trong HTML
   * hoặc tạo trước khi app render
   */
  let container = document.getElementById(portalId);
  if (!container) {
    container = document.createElement('div');
    container.id = portalId;
    document.body.appendChild(container);
  }

  /**
   * React Portal
   * 
   * Render modal content vào container bên ngoài React tree
   * Nhưng event vẫn bubble up theo React component hierarchy
   * 
   * DOM Structure:
   * <body>
   *   <div id="root"> ... App ... </div>
   *   <div id="modal-root">
   *     <div class="backdrop">
   *       <div class="modal"> ... content ... </div>
   *     </div>
   *   </div>
   * </body>
   */
  return ReactDOM.createPortal(
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div className={`${styles.modal} ${className}`} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>,
    container
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  closeOnEscape: PropTypes.bool,
  closeOnBackdropClick: PropTypes.bool,
  portalId: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Attach static properties (Compound Pattern)
 */
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
