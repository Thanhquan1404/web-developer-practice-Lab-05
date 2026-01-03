/**
 * Tabs.jsx
 * 
 * Compound Tabs Component
 * 
 * Pattern: Compound Component
 * - Parent component cung cấp context
 * - Child components (Tabs.List, Tabs.Tab, Tabs.Panel) tự tổ chức
 * - Cho phép flexibility cao trong cách sắp xếp các phần tử
 * - Có thể chèn thêm markup tùy ý giữa các component con
 * 
 * Ưu điểm:
 * 1. Tách biệt concerns: Mỗi component có trách nhiệm riêng
 * 2. Flexible: Người dùng kiểm soát layout
 * 3. Không prop drilling: Context xử lý truyền dữ liệu
 * 4. Scalable: Dễ mở rộng với component mới
 * 
 * Usage:
 * <Tabs initialIndex={0}>
 *   <Tabs.List>
 *     <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
 *     <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
 *   </Tabs.List>
 *   <Tabs.Panel index={0}>Content 1</Tabs.Panel>
 *   <Tabs.Panel index={1}>Content 2</Tabs.Panel>
 * </Tabs>
 */

import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TabsContext } from './TabsContext.jsx';
import styles from './Tabs.module.css';

/**
 * ============================================
 * TABS CHILD COMPONENTS (Static Properties)
 * ============================================
 */

/**
 * TabsList Component
 * 
 * Wrapper container cho danh sách các tab
 * Có role="tablist" để tương ứng với WAI-ARIA standards
 */
function TabsList({ children, className = '' }) {
  return (
    <div 
      className={`${styles['tabs-list']} ${className}`}
      role="tablist"
    >
      {children}
    </div>
  );
}

TabsList.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Tab Component (Là một button để chuyển tab)
 * 
 * Props:
 * - index: {number} - Index của tab
 * - children: {ReactNode} - Nội dung hiển thị trên button
 * - className: {string} - Class CSS tùy chỉnh
 * 
 * Accessibility:
 * - role="tab"
 * - aria-selected: true/false
 * - aria-controls: liên kết tới panel tương ứng
 */
function Tab({ index, children, className = '' }) {
  const { activeTabIndex, setActiveTabIndex } = React.useContext(TabsContext);
  const isActive = activeTabIndex === index;

  const handleClick = useCallback(() => {
    setActiveTabIndex(index);
  }, [index, setActiveTabIndex]);

  return (
    <button
      className={`${styles.tab} ${isActive ? styles.active : ''} ${className}`}
      onClick={handleClick}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tab-panel-${index}`}
      type="button"
    >
      {children}
    </button>
  );
}

Tab.propTypes = {
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * TabsPanel Component (Nội dung của tab)
 * 
 * Props:
 * - index: {number} - Index của panel (phải trùng với Tab index)
 * - children: {ReactNode} - Nội dung hiển thị
 * - className: {string} - Class CSS tùy chỉnh
 * 
 * Accessibility:
 * - role="tabpanel"
 * - aria-labelledby: liên kết tới tab header
 */
function TabsPanel({ index, children, className = '' }) {
  const { activeTabIndex } = React.useContext(TabsContext);
  const isActive = activeTabIndex === index;

  return (
    <div
      className={`${styles['tab-panel']} ${isActive ? styles.active : ''} ${className}`}
      id={`tab-panel-${index}`}
      role="tabpanel"
      aria-labelledby={`tab-${index}`}
      hidden={!isActive}
    >
      {isActive && children}
    </div>
  );
}

TabsPanel.propTypes = {
  index: PropTypes.number.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

/**
 * ============================================
 * MAIN TABS COMPONENT (Parent)
 * ============================================
 */

/**
 * Tabs Component (Parent)
 * 
 * Cung cấp Context cho tất cả child components
 * Quản lý state activeTabIndex
 * 
 * Props:
 * - children: {ReactNode} - Thường là Tabs.List và Tabs.Panel
 * - initialIndex: {number} - Index của tab mặc định (default: 0)
 * - className: {string} - Class CSS cho wrapper
 * - onTabChange: {function} - Callback khi tab thay đổi (optional)
 */
function Tabs({ children, initialIndex = 0, className = '', onTabChange }) {
  const [activeTabIndex, setActiveTabIndex] = React.useState(initialIndex);

  /**
   * Xử lý thay đổi tab
   * Gọi callback nếu có
   */
  const handleSetActiveTab = useCallback((index) => {
    if (typeof index === 'number' && index >= 0) {
      setActiveTabIndex(index);
      if (onTabChange) {
        onTabChange(index);
      }
    }
  }, [onTabChange]);

  /**
   * useMemo để tối ưu: value chỉ thay đổi khi dependencies thay đổi
   */
  const value = useMemo(
    () => ({
      activeTabIndex,
      setActiveTabIndex: handleSetActiveTab,
    }),
    [activeTabIndex, handleSetActiveTab]
  );

  return (
    <TabsContext.Provider value={value}>
      <div className={`${styles['tabs-wrapper']} ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  initialIndex: PropTypes.number,
  className: PropTypes.string,
  onTabChange: PropTypes.func,
};

/**
 * ============================================
 * ATTACH STATIC PROPERTIES (Compound Pattern)
 * ============================================
 * 
 * Cho phép sử dụng: <Tabs.List>, <Tabs.Tab>, <Tabs.Panel>
 * Thay vì import từng component riêng
 */
Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabsPanel;

export default Tabs;
