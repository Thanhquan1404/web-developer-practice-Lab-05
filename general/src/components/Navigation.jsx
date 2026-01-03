/**
 * Navigation Component
 * Quản lý tab navigation giữa các Exercise
 */

import React from 'react';

export const EXERCISES = [
  {
    id: 'exercise-01',
    title: 'Exercise 1: State Management',
    icon: '⚡',
    description: 'useReducer (FSM Pattern) & Redux Toolkit Shopping Cart',
    fullTitle: 'React Advanced - State Management',
  },
  {
    id: 'exercise-02',
    title: 'Exercise 2: Performance',
    icon: '🚀',
    description: 'useMemo, useCallback & Code Splitting',
    fullTitle: 'React Performance Optimization',
  },
  {
    id: 'exercise-03',
    title: 'Exercise 3: Design System',
    icon: '🎨',
    description: 'Compound Components & React Portals',
    fullTitle: 'Design System - Compound Components & Portals',
  },
  {
    id: 'exercise-04',
    title: 'Exercise 4: Testing',
    icon: '✅',
    description: 'Testing Library, Jest & Error Boundaries',
    fullTitle: 'React Testing Library & Jest',
  },
];

export const Navigation = ({ activeExercise, onExerciseChange }) => {
  return (
    <div className="nav-tabs">
      {EXERCISES.map((exercise) => (
        <button
          key={exercise.id}
          className={`nav-tab ${activeExercise === exercise.id ? 'active' : ''}`}
          onClick={() => onExerciseChange(exercise.id)}
          title={exercise.fullTitle}
        >
          <span>{exercise.icon}</span>
          <span>{exercise.title}</span>
        </button>
      ))}
    </div>
  );
};

export default Navigation;
