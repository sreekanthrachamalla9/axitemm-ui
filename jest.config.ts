// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',

  // ✅ Enable coverage collection
  collectCoverage: true,

  // ✅ Include only app source files
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.spec.ts', // exclude test files
    '!src/main.ts',          // optional: exclude bootstrap
    '!src/environments/**',  // optional: exclude env configs
  ],

  // ✅ Specify output format
  coverageReporters: ['html', 'text-summary'],

  // ✅ Set global threshold
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};

export default config;
