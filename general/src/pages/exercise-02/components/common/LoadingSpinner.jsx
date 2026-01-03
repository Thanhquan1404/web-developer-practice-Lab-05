/**
 * TASK 3: LoadingSpinner Component
 * 
 * Used as fallback UI when lazy-loaded components are loading
 * This component appears while AdminPanel.jsx is being fetched
 * 
 * Why needed:
 * - React.lazy requires a Suspense boundary
 * - Suspense boundary requires a fallback component
 * - LoadingSpinner provides visual feedback: "Hey, loading your component!"
 */

import React from 'react';
import './LoadingSpinner.css';

export function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner-wrapper">
        {/* Animated spinner SVG */}
        <svg className="spinner" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <circle
            className="spinner-circle"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="3"
          />
        </svg>
        
        <p className="loading-text">Loading component...</p>
        <p className="loading-subtext">This component is being code-split and downloaded</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
