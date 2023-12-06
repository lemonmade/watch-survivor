import '@quilted/quilt/globals';

import {renderToResponse} from '@quilted/quilt/server';
import {RequestRouter} from '@quilted/quilt/request-router';
import {createDirectClient} from '@quilted/trpc/server';
import {fetchRequestHandler} from '@trpc/server/adapters/fetch';

import {BrowserAssets} from 'quilt:module/assets';

import App from './App.tsx';
import {appRouter} from './trpc.ts';

const router = new RequestRouter();

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

const assets = new BrowserAssets();

// For all GET requests, render our React application.
router.get(async (request) => {
  const response = await renderToResponse(
    <App trpc={createDirectClient(appRouter)} />,
    {
      request,
      assets,
    },
  );

  return response;
});

export default router;
