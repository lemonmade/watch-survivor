import '@quilted/quilt/global';
import {createRequestRouter, createServerRender} from '@quilted/quilt/server';
import {createBrowserAssets} from '@quilted/quilt/magic/assets';
import {createDirectClient} from '@quilted/trpc/server';
import {fetchRequestHandler} from '@trpc/server/adapters/fetch';
import type {} from '@quilted/cloudflare';

import App from './App.tsx';
import {appRouter} from './trpc.ts';

const router = createRequestRouter();

router.any(
  'api',
  (request) => {
    return fetchRequestHandler({
      endpoint: '/api',
      req: request,
      router: appRouter,
      createContext: () => ({}),
    });
  },
  {exact: false},
);

const reactHandler = createServerRender(
  () => <App trpc={createDirectClient(appRouter)} />,
  {
    assets: createBrowserAssets(),
  },
);

// For all GET requests, render our React application.
router.get(reactHandler);

export default router;
