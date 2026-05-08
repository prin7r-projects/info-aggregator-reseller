/**
 * @annotedly/worker-process
 *
 * Phase 0b stub — logs startup and exits cleanly.
 * Phase 1 will enrich canonical items with editorial metadata
 * (vertical tags, source attribution, confidence scoring, annotations)
 * and apply the editorial style guide transformations.
 */

const WORKER_NAME = "worker.process";

console.log(`[${WORKER_NAME}] started`);
process.exit(0);
