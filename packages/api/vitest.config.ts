import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        include: ['./**/*.test.{ts,tsx}'],
        exclude: [
            '**/test-hooks-real-api.test.ts',
            './hooks/test-hooks-real-api.test.ts',
            'hooks/test-hooks-real-api.test.ts',
        ],
        globals: true,
        environment: 'jsdom',
        testTimeout: 30000,
    },
});
