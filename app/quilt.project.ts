import {createApp, quiltApp} from '@quilted/craft';
import {cloudflareWorkers} from '@quilted/cloudflare/craft';

export default createApp((app) => {
  app.entry('./App');
  app.use(
    quiltApp({
      server: {
        entry: './server',
      },
    }),
    cloudflareWorkers(),
  );
});
