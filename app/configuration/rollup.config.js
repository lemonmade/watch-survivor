import {quiltApp} from '@quilted/craft/rollup';
import {cloudflarePages} from '@quilted/cloudflare/craft';

const configuration = await quiltApp({
  browser: {entry: './browser.tsx'},
  server: {entry: './server.tsx'},
  runtime: cloudflarePages(),
});

export default configuration;
