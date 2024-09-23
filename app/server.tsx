import '@quilted/quilt/globals';

import {renderToResponse} from '@quilted/quilt/server';
import {RequestRouter} from '@quilted/quilt/request-router';
import {Router} from '@quilted/quilt/navigation';
import type {} from '@quilted/cloudflare';

import {BrowserAssets} from 'quilt:module/assets';

import {drizzle} from 'drizzle-orm/d1';

import type {AppContext} from '~/shared/context.ts';

import * as schema from './schema.ts';

declare module '@quilted/cloudflare' {
  interface CloudflareRequestEnvironment {
    readonly SURVIVOR_DB: import('@cloudflare/workers-types').D1Database;
  }
}

import App from './App.tsx';

const router = new RequestRouter();

const assets = new BrowserAssets();

router.post('/create', async (request, {env}) => {
  const formData = await request.formData();
  const name = formData.get('name');

  if (typeof name !== 'string') {
    throw new Error('No name provided');
  }

  const db = drizzle(env.SURVIVOR_DB, {schema});

  // const result = await db.insert(schema.users).values({name});

  const allUsers = await db.select({name: schema.users.name}).from(schema.users);
  console.log({allUsers});

  return new Response(null, {status: 302, headers: {Location: '/'}});
});

// For all GET requests, render our React application.
router.get(async (request) => {
  const context = {
    router: new Router(request.url),
  } satisfies AppContext;

  const response = await renderToResponse(<App context={context} />, {
    request,
    assets,
  });

  return response;
});

export default router;
