import '@quilted/quilt/global';
import {createRequestRouter, createServerRender} from '@quilted/quilt/server';
import {json} from '@quilted/quilt/request-router';
import {createBrowserAssets} from '@quilted/quilt/magic/assets';
import type {} from '@quilted/cloudflare';

import App from './App';

const router = createRequestRouter();

router.post('/api', async (_request, {env}) => {
  return json({good: true});
});

const reactHandler = createServerRender(() => <App />, {
  assets: createBrowserAssets(),
});

// For all GET requests, render our React application.
router.get(reactHandler);

export default router;
