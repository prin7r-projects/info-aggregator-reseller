/**
 * @annotedly/worker-ingest
 *
 * Phase 0b stub — logs startup and exits cleanly.
 * Phase 1 will wire source-feed polling, raw-entry normalization,
 * and dedupe fingerprinting against the canonical-item store.
 */

const WORKER_NAME = "worker.ingest";

console.log(`[${WORKER_NAME}] started`);
process.exit(0);
