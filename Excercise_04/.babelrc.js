/**
 * Babel Configuration
 *
 * Transforms JSX and modern JavaScript for tests and builds
 */

export default {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
