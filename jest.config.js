module.exports = {
  verbose: true,
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    './src/components/Button/Button.spec.js',
    './src/components/**/*.{js,jsx}',
    './src/pages/**/*.{js,jsx}',
    './src/utils/**/*.{js,jsx}'
  ],
}
