# Annotedly — info-aggregator-reseller

> Footnoted intelligence. Reseller-ready. A weekly cross-source dossier per vertical (fintech, biotech, govtech, climate-tech, semiconductors). White-labeled for consultancies and partner firms who resell to their own clients.

- **Live landing:** https://info-aggregator-reseller.prin7r.com
- **Notion opportunity:** https://www.notion.so/3543ceec261981bda092d21603052ab3
- **Stack:** Next.js 15 (App Router) + Tailwind v4 + ShadCN baseline + NOWPayments hosted invoice
- **Brand:** Annotedly — milky paper (`#FAFAF8`), ink (`#0E0F12`), oxblood (`#7A1F2B`). Source Serif 4 + Inter + JetBrains Mono.

## Repo structure

```
.
├── DESIGN.md                       # 15-section design + style guide
├── README.md
├── docs/                           # 10 strategy + design docs
│   ├── 01-brand-identity.md
│   ├── 02-architecture.md
│   ├── ...
│   └── 10-pitch-deck.md / pitch-deck.html
├── docs/screenshots/               # Verification screenshots
│   ├── landing-desktop.png
│   └── landing-mobile.png
├── apps/
│   ├── landing/                    # Next.js 15 marketing site (this Wave 2 deliverable)
│   └── app/                        # SaaS dashboard scaffold (placeholder)
├── Dockerfile.landing
├── docker-compose.yml
├── .env.example
└── .github/workflows/landing-build.yml
```

## Local dev

```bash
cd apps/landing
pnpm install
pnpm dev
# → http://localhost:3000
```

## Deploy

Build runs on `storage-contabo` (`/opt/prin7r-deploys/info-aggregator-reseller/`) under Traefik with Let's Encrypt:

```bash
ssh storage-contabo
cd /opt/prin7r-deploys/info-aggregator-reseller
git pull
docker compose build
docker compose up -d
```

The deployed container reads its env from a gitignored `/opt/prin7r-deploys/info-aggregator-reseller/.env` (reuses `NOWPAYMENTS_API_KEY` and `NOWPAYMENTS_IPN_SECRET` from the shared payments credentials). The compose file declares `env_file: .env` so the live keys reach the container.

## Payment integration

NOWPayments hosted-invoice flow (per playbook v2 §C):

- `POST /api/checkout/nowpayments` — server-side `POST /v1/invoice` call with the chosen plan, returns `{ checkoutUrl, orderId }`.
- `POST /api/webhooks/nowpayments` — verifies `x-nowpayments-sig` HMAC-SHA512 over sorted JSON body, logs the event, and 200/401s.

Three plans are wired on the landing — `single` ($499/vertical/mo), `bundle` ($1,499/all five verticals/mo), `reseller` ($4,800 one-time setup + $1,200/added vertical/mo).

## Screenshots

![Annotedly — desktop](docs/screenshots/landing-desktop.png)

![Annotedly — mobile](docs/screenshots/landing-mobile.png)

## License

MIT — see `LICENSE`.
