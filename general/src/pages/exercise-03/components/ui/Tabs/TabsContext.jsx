/**
 * TabsContext.jsx
 * 
 * Context cho Compound Tabs Component
 * Quản lý activeTabIndex một cách implicit (ẩn danh)
 * 
 * Pattern: Compound Component + Context API
 * - Cho phép child components truy cập trạng thái mà không cần props drilling
 * - Tách biệt giữa logic state và presentation
 */

import React, { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * TabsContext
 * 
 * Value được cung cấp:
 * - activeTabIndex: {number} - Index của tab đang active
 * - setActiveTabIndex: {function} - Setter để thay đổi active tab
 */
export const TabsContext = createContext({
  activeTabIndex: 0,
  setActiveTabIndex: () => {},
});

/**
 * TabsProvider Component
 * 
 * Wrapper cung cấp context cho tất cả child components
 * Sử dụng: <TabsProvider initialIndex={0}>{children}</TabsProvider>
 * 
 * Props:
 * - children: {ReactNode} - React elements sẽ được wrap
 * - initialIndex: {number} - Index của tab active ban đầu (default: 0)
 */
export function TabsProvider({ children, initialIndex = 0 }) {
  const [activeTabIndex, setActiveTabIndex] = useState(initialIndex);

  /**
   * useCallback để đảm bảo hàm reference không thay đổi
   * Giúp tối ưu hóa child components được memoized
   */
  const handleSetActiveTab = useCallback((index) => {
    if (typeof index === 'number' && index >= 0) {
      setActiveTabIndex(index);
    }
  }, []);

  const value = {
    activeTabIndex,
    setActiveTabIndex: handleSetActiveTab,
  };

  return (
    <TabsContext.Provider value={value}>
      {children}
    </TabsContext.Provider>
  );
}

TabsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialIndex: PropTypes.number,
};

/**
 * Custom Hook: useTabsContext
 * 
 * Sử dụng để lấy context value từ TabsContext
 * Đảm bảo component được sử dụng trong TabsProvider
 * 
 * Returns: {Object} - { activeTabIndex, setActiveTabIndex }
 * 
 * Throws: Error nếu không được sử dụng trong TabsProvider
 */
export function useTabsContext() {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error(
      'useTabsContext phải được sử dụng bên trong <Tabs> component'
    );
  }

  return context;
}

export default TabsContext;
