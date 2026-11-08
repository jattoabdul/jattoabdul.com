import handler from './.open-next/worker.js';
import { newsletterMaintenance } from './src/lib/newsletter/maintenance.ts';
import { productionSeedRequest } from './src/lib/newsletter/production-seed.ts';
const newsletterWorker = {
  fetch(request, env, ctx) {
    const gated = productionSeedRequest(request, env);
    return gated instanceof Response ? gated : handler.fetch(gated, env, ctx);
  },
  async scheduled(_controller, env) {
    await newsletterMaintenance(env);
  },
};
export default newsletterWorker;
