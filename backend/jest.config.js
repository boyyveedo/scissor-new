module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts'],
};
