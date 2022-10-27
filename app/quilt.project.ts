import {createProject, quiltApp} from '@quilted/craft';
import {cloudflareWorkers} from '@quilted/cloudflare/craft';

export default createProject((project) => {
  project.use(
    quiltApp({
      entry: './App.tsx',
      server: {
        entry: './server.ts',
      },
    }),
    cloudflareWorkers(),
  );
});
