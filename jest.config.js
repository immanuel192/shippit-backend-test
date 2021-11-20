module.exports = {
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testMatch: [
    '<rootDir>/src/**/*.spec.(js|ts)',
    '<rootDir>/test/**/*.spec.(js|ts)',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  modulePaths: [
    '<rootDir>/libs',
  ],
  moduleNameMapper: {
    '#test/(.*)': '<rootDir>/test/$1',
  },
  preset: 'ts-jest',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/app/geektrust.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
}
