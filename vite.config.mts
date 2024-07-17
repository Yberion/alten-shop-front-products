/// <reference types='vitest' />
import { defineConfig } from 'vite';

import angular from '@analogjs/vite-plugin-angular';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: 'node_modules/.vite/apps/product-trial',

    plugins: [
      angular({
        tsconfig: 'tsconfig.spec.json',
      }),
      viteTsConfigPaths()
    ],

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },

    test: {
      watch: false,
      globals: true,
      environment: 'happy-dom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],

      reporters: ['default'],
      coverage: {
        enabled: false,
        reportsDirectory: 'coverage/apps/product-trial',
        provider: 'v8',
        reporter: ['text', 'lcov'],
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  }
});