/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  test: {
    include: ['**/*.test.*ts'],
    testTimeout: 60_000,
    hookTimeout: 60_000,
    globals: true
  }
})
