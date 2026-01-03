/**
 * Main App Component
 * Combines all 4 exercises into one comprehensive React learning platform
 */

import React, { useState } from 'react';
import Navigation, { EXERCISES } from './components/Navigation';
import Exercise01Page from './pages/exercise-01/Exercise01Page';
import Exercise02Page from './pages/exercise-02/Exercise02Page';
import Exercise03Page from './pages/exercise-03/Exercise03Page';
import Exercise04Page from './pages/exercise-04/Exercise04Page';
import './styles/exercises.css';

function App() {
  const [activeExercise, setActiveExercise] = useState('exercise-01');

  const currentExercise = EXERCISES.find((ex) => ex.id === activeExercise);

  const renderExercisePage = () => {
    switch (activeExercise) {
      case 'exercise-01':
        return <Exercise01Page />;
      case 'exercise-02':
        return <Exercise02Page />;
      case 'exercise-03':
        return <Exercise03Page />;
      case 'exercise-04':
        return <Exercise04Page />;
      default:
        return <Exercise01Page />;
    }
  };

  return (
    <div className="app-layout">
      <header className="main-header">
        <div className="header-container">
          <div className="header-content">
            <h1>📚 LAB 05 - React Learning Journey</h1>
            <p>Master Advanced React Concepts: State, Performance, Design & Testing</p>
          </div>
          <Navigation
            activeExercise={activeExercise}
            onExerciseChange={setActiveExercise}
          />
        </div>
      </header>

      <main className="main-content">
        <div className="content-wrapper">
          {currentExercise && (
            <>
              <h2 className="exercise-title">
                {currentExercise.icon} {currentExercise.fullTitle}
              </h2>
              <p className="exercise-description">{currentExercise.description}</p>
            </>
          )}
          {renderExercisePage()}
        </div>
      </main>

      <footer className="footer">
        <p>
          🎓 Complete React Learning Platform | UIT Web Developer Practice
          <br />
          Version 1.0.0 | © 2024
        </p>
      </footer>
    </div>
  );
}

export default App;
