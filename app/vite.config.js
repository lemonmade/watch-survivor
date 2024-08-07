import {defineConfig} from 'vite';
import {quiltApp} from '@quilted/vite/app';

export default defineConfig({
  plugins: [
    quiltApp({
      browser: {
        entry: './browser.tsx',
      },
      server: {
        entry: './server.tsx',
      },
    }),
  ],
});
