import '@quilted/quilt/global';
import {
  createHttpHandler,
  createServerRenderingRequestHandler,
} from '@quilted/quilt/server';
import createAssetManifest from '@quilted/quilt/magic/app/asset-manifest';

import App from './App';

const httpHandler = createHttpHandler();

const handler = createServerRenderingRequestHandler(App, {
  assets: createAssetManifest(),
});

// For all GET requests, render our React application.
httpHandler.get((...args) => {
  console.log(...args);
  return handler(...args);
});

export default httpHandler;
