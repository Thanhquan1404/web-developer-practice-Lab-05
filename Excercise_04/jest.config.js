/**
 * Jest Configuration
 *
 * Configures Jest test runner with:
 * - React Testing Library support
 * - Module name mapping (CSS modules)
 * - Setup files for test environment
 */

export default {
  testEnvironment: 'jsdom',
  
  // Setup files to run before tests
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // Module name mapping for CSS modules and assets
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  
  // Transform files with Babel
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  
  // File extensions to look for
  moduleFileExtensions: ['js', 'jsx', 'json'],
  
  // Test match patterns
  testMatch: ['**/__tests__/**/*.test.js', '**/*.test.js'],
  
  // Coverage settings
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/**/*.module.css',
    '!src/__tests__/**',
  ],
  
  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
