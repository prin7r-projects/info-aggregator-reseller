# Annotedly (Wasp app)

This is the Annotedly Wasp/full-stack app inside the `info-aggregator-reseller` monorepo.

It is the backend + dashboard half of Annotedly: the curated, source-cited intelligence brief for fintech operators. The marketing/landing surface lives in `apps/landing/`. Background workers live in `workers/`.

Built on [Wasp](https://wasp.sh) on top of the [Open SaaS](https://opensaas.sh) template (forked at Phase 0e — see `PRI-2362`). Wasp app name is `annotedly`.

## Running locally

Wasp CLI is required (https://wasp.sh/docs/quick-start). Once installed, from this directory:

- copy `.env.client.example` and `.env.server.example` to `.env.client` and `.env.server`
- `wasp start db` to start the dev Postgres
- `wasp start` to run the app
- `wasp db migrate-dev` after schema changes

## Scope and conventions

- Stays inside `apps/app/`. Do not touch `apps/landing/` or root `docker-compose.yml` from here.
- Auth, payments, and product wiring (magic-link, Bearer, Annotedly entities, etc.) are layered in subsequent phases — not in the Phase 0e baseline import.
- See `docs/12-*.md` and `docs/13-*.md` at the repo root for the technical spec and implementation plan.
