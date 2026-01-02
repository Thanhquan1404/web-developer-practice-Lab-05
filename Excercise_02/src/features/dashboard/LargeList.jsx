/**
 * TASK 1: LargeList Component - useMemo for Expensive Calculations
 * 
 * Problem Solved:
 * ❌ Without useMemo: Sorting 10,000 items runs on EVERY render (including theme changes)
 * ✅ With useMemo: Sorting only runs when items or sortKey actually change
 * 
 * Real-world impact:
 * - Without: Theme toggle = 1000ms lag (sorting + rendering all items)
 * - With: Theme toggle = 16ms (just CSS update, no sorting!)
 */

import React, { useMemo, useCallback } from 'react';
import ListItem from './ListItem';

/**
 * LargeList Component - Demonstrates expensive calculation memoization
 * 
 * @param {Array} items - List of items to display
 * @param {string} sortKey - Field to sort by ('id', 'name', 'price')
 * @param {Function} onDeleteItem - Callback when item is deleted
 */
export function LargeList({ items = [], sortKey = 'id', onDeleteItem }) {
  /**
   * EXPENSIVE CALCULATION: Sorting 10,000 items
   * 
   * Wrapped in useMemo with dependency array [items, sortKey]
   * 
   * How it works:
   * 1. On first render: Sorts items
   * 2. When parent re-renders (e.g., theme changes):
   *    - Checks if items or sortKey changed
   *    - If SAME: Returns cached sorted array (instant!)
   *    - If DIFFERENT: Re-sorts and caches new result
   * 3. Prevents unnecessary O(n log n) sorting operations
   * 
   * Without useMemo:
   * - Parent theme toggle → parent re-renders → LargeList re-renders
   * - → Sorting runs again (even though items didn't change!)
   * - → All 10,000 ListItems re-render
   * - → UI lags (1000ms+)
   * 
   * With useMemo:
   * - Parent theme toggle → parent re-renders → LargeList re-renders
   * - → useMemo checks: items and sortKey same? YES!
   * - → Returns cached array (instant!)
   * - → ListItems don't re-render (React.memo!)
   * - → No lag (16ms)
   */
  const sortedItems = useMemo(() => {
    console.log(`⏱️ Sorting ${items.length} items by '${sortKey}'...`);
    
    // Simulating expensive calculation: create a new sorted array
    const sorted = [...items].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      // Handle different data types
      if (typeof aValue === 'number') {
        return aValue - bValue;
      }
      return String(aValue).localeCompare(String(bValue));
    });

    return sorted;
  }, [items, sortKey]); // Only re-sort when items or sortKey change!

  /**
   * Item count
   * Memoized as well to prevent recalculation
   */
  const itemCount = useMemo(() => sortedItems.length, [sortedItems]);

  return (
    <div className="large-list-container">
      <div className="list-header">
        <h3 className="list-title">
          Items List
          <span className="item-count">({itemCount} items)</span>
        </h3>
        <p className="list-info">
          Sorting by: <strong>{sortKey}</strong>
        </p>
        <p className="performance-tip">
          💡 Tip: Toggle theme while watching this list. With useMemo + React.memo, 
          it won't re-sort or re-render!
        </p>
      </div>

      <div className="items-grid">
        {sortedItems.map((item) => (
          /**
           * Using React.memo ListItem:
           * - Wrapped with React.memo (see ListItem.jsx)
           * - Only re-renders if id, name, price, or onDeleteItem change
           * - With useCallback, onDeleteItem reference stays stable
           * - Result: These 10,000 ListItems don't re-render on theme toggle!
           */
          <ListItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            onDelete={onDeleteItem}
          />
        ))}
      </div>

      {itemCount === 0 && (
        <div className="empty-state">
          <p>No items to display</p>
        </div>
      )}
    </div>
  );
}

export default LargeList;
