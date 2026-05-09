#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

const TARGETS = [
  {
    name: "fintech",
    schema: resolve(repoRoot, "data/sources/fintech.schema.json"),
    data: resolve(repoRoot, "data/sources/fintech.json"),
    minEntries: 60,
  },
];

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

let failed = false;
for (const target of TARGETS) {
  const schema = JSON.parse(await readFile(target.schema, "utf8"));
  const data = JSON.parse(await readFile(target.data, "utf8"));
  const validate = ajv.compile(schema);

  const ok = validate(data);
  if (!ok) {
    failed = true;
    console.error(`[${target.name}] schema validation failed:`);
    for (const err of validate.errors ?? []) {
      console.error(`  ${err.instancePath || "<root>"} ${err.message}`);
    }
    continue;
  }

  if (!Array.isArray(data)) {
    failed = true;
    console.error(`[${target.name}] expected an array, got ${typeof data}`);
    continue;
  }

  if (data.length < target.minEntries) {
    failed = true;
    console.error(
      `[${target.name}] only ${data.length} entries — need at least ${target.minEntries}`,
    );
  }

  const ids = new Set();
  const dupes = [];
  for (const entry of data) {
    if (ids.has(entry.id)) dupes.push(entry.id);
    ids.add(entry.id);
  }
  if (dupes.length > 0) {
    failed = true;
    console.error(`[${target.name}] duplicate ids: ${dupes.join(", ")}`);
  }

  if (!failed) {
    console.log(
      `[${target.name}] ok — ${data.length} entries, ${ids.size} unique ids`,
    );
  }
}

if (failed) process.exit(1);
