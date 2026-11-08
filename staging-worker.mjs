import handler from './.open-next/worker.js';
import { stagingRequest } from './src/lib/newsletter/staging-gate.ts';
import { newsletterMaintenance } from './src/lib/newsletter/maintenance.ts';

// Entry point for the existing staging Worker only. Never used by production.
const stagingWorker = {
  async scheduled(_controller, env) {
    await newsletterMaintenance(env);
  },
  async fetch(request, env, ctx) {
    const gated = stagingRequest(request, env);
    if (gated instanceof Response) return gated;
    const asset = ['GET', 'HEAD'].includes(gated.method) ? await env.ASSETS.fetch(gated) : null;
    if (asset?.status === 404) await asset.body?.cancel();
    const upstream = asset && asset.status !== 404 ? asset : await handler.fetch(gated, env, ctx);
    const response = new Response(upstream.body, upstream);
    response.headers.set('Cache-Control', 'private, no-store');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('Referrer-Policy', 'no-referrer');
    response.headers.append('Vary', 'Authorization');
    return response;
  },
};
export default stagingWorker;
