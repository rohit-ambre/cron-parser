/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',

  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json'
      }
    ]
  },

  testMatch: [
    '**/?(*.)+(spec|test).ts'
  ],

  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],

  moduleFileExtensions: ['ts', 'js', 'json'],

  clearMocks: true
};
