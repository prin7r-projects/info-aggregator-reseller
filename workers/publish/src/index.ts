/**
 * @annotedly/worker-publish
 *
 * Phase 0b stub — logs startup and exits cleanly.
 * Phase 1 will format processed items for distribution channels:
 * RSS feeds, JSON API responses, email digest batches,
 * and reseller bundle packages.
 */

const WORKER_NAME = "worker.publish";

console.log(`[${WORKER_NAME}] started`);
process.exit(0);
