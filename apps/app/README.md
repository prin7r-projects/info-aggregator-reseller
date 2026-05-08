# Bureau — SaaS app scaffold (placeholder)

This directory is reserved for the Bureau dashboard application — the surface where subscribers read issues, download CSV/JSON feeds, configure their reseller masthead, and manage their billing.

For Wave 2 (build 2026-05-08) the app is intentionally **not implemented**. The full application build comes in a later wave and will fork [`wasp-lang/open-saas`](https://github.com/wasp-lang/open-saas) per the playbook stack matrix for `saas` projects.

The Wave 2 deliverable for Bureau is the marketing landing under `apps/landing/` plus the NOWPayments checkout flow that creates a hosted invoice for subscribers. That flow stops at invoice creation — fulfillment (issuing credentials and provisioning the dashboard) is the responsibility of the post-Wave-2 SaaS app build.
