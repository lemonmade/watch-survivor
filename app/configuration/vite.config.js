import {defineConfig} from 'vite';
import {quiltApp} from '@quilted/craft/vite';

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
