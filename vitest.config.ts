import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      reportsDirectory: './coverage',
      include: ['services/**/*.ts'],
      exclude: ['services/**/*.test.ts'],
      thresholds: {
        statements: 85,
        branches: 80,
        functions: 90,
        lines: 95,
      },
    },
  },
});
