# Watch Survivor Extensions

## Extension development

To start the extension development server, run:

```sh
pnpm exec watchapp develop
```

If you want to be able to develop the extension on Safari and Firefox, you will need to run the develop command with a proxy. I use [Cloudflare Tunnels](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/) for my proxy, with the proxy domain set to https://watch-survivor.dev-proxy.me.

To use the proxy, follow the steps to [run the Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/), which should end with you running:

```sh
# `cloudflared` command not found? Run `brew install cloudflared`
# @see https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
cloudflared tunnel run
```

Then, run the development server, but with the `--proxy` argument set to the root proxy URL:

```sh
pnpm exec watchapp --proxy https://watch-survivor.dev-proxy.me
```

To run the extension against a locally-running version of the Watch application, run the `pnpm develop` command with the `WATCH_ROOT_URL` environment variable:

```sh
WATCH_ROOT_URL=https://watch.lemon.dev pnpm exec watchapp develop --proxy https://watch-survivor.dev-proxy.me
```
