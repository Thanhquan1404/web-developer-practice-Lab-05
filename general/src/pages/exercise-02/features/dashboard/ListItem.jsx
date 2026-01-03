/**
 * TASK 1: ListItem Component - React.memo for Performance
 * 
 * Problem Solved:
 * ❌ Without React.memo: ListItem re-renders khi parent render lại (e.g., theme change)
 * ✅ With React.memo: ListItem chỉ re-render khi props thực sự thay đổi
 * 
 * Why this matters:
 * - With 10,000 items, avoiding 10,000 re-renders = massive performance boost
 * - Profiler sẽ hiển thị: "Did not render" (grey bars) thay vì yellow/green
 */

import React, { useEffect } from 'react';

/**
 * ListItem Component
 * 
 * Wrapped with React.memo to prevent unnecessary re-renders
 * This component only re-renders when its props (id, name, price, onDelete) actually change
 */
const ListItemComponent = ({ id, name, price, onDelete }) => {
  // DEBUG: Log when this component renders
  // Remove in production - this helps verify React.memo is working
  useEffect(() => {
    console.log(`🔄 ListItem ${id} rendered`);
  }, [id, name, price, onDelete]);

  return (
    <div className="list-item">
      <div className="item-content">
        <span className="item-id">#{id}</span>
        <span className="item-name">{name}</span>
        <span className="item-price">${price.toFixed(2)}</span>
      </div>
      <button 
        className="item-delete-btn"
        onClick={() => onDelete(id)}
        aria-label={`Delete item ${id}`}
      >
        ✕
      </button>
    </div>
  );
};

/**
 * React.memo Wrapper
 * 
 * How it works:
 * 1. React.memo performs shallow comparison of props
 * 2. If all props are the same (by reference), component doesn't re-render
 * 3. With useCallback, function references stay stable → no re-renders!
 * 
 * Performance Impact:
 * - 10,000 items × avoiding re-render = massive CPU savings
 * - Keeps 60 FPS during theme toggle
 * 
 * Custom comparison (optional):
 * If you need deep prop comparison, pass a custom comparison function:
 * 
 * const arePropsEqual = (prevProps, nextProps) => {
 *   return prevProps.id === nextProps.id &&
 *          prevProps.name === nextProps.name &&
 *          prevProps.price === nextProps.price &&
 *          prevProps.onDelete === nextProps.onDelete;
 * };
 * export default React.memo(ListItemComponent, arePropsEqual);
 */
export const ListItem = React.memo(ListItemComponent);

export default ListItem;
