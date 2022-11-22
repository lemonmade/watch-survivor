import '@quilted/quilt/global';
import {
  createHttpHandler,
  createServerRenderingRequestHandler,
} from '@quilted/quilt/server';
import {json} from '@quilted/quilt/http-handlers';
import createAssetManifest from '@quilted/quilt/magic/app/asset-manifest';
import {type CloudflareRequestContext} from '@quilted/cloudflare/http-handlers';

import App from './App';

const httpHandler = createHttpHandler();

httpHandler.post('/api', async (_request, {env}: CloudflareRequestContext) => {
  return json({good: true});
});

const reactHandler = createServerRenderingRequestHandler(() => <App />, {
  assets: createAssetManifest(),
});

// For all GET requests, render our React application.
httpHandler.get(reactHandler);

export default httpHandler;