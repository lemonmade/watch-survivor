import {createProject, quiltApp} from '@quilted/craft';
import {cloudflarePages} from '@quilted/cloudflare/craft';

export default createProject((project) => {
  project.use(
    quiltApp({
      entry: './App.tsx',
      server: {
        entry: './server.tsx',
      },
    }),
    cloudflarePages(),
  );
});
