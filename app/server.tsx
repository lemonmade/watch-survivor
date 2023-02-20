import '@quilted/quilt/global';
import {createRequestRouter, createServerRender} from '@quilted/quilt/server';
import {json} from '@quilted/quilt/request-router';
import {createAssetManifest} from '@quilted/quilt/magic/asset-manifest';
import type {} from '@quilted/cloudflare';

import App from './App';

const router = createRequestRouter();

router.post('/api', async (_request, {env}) => {
  return json({good: true});
});

const reactHandler = createServerRender(() => <App />, {
  assets: createAssetManifest(),
});

// For all GET requests, render our React application.
router.get(reactHandler);

export default router;
