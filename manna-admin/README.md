# Manna admin UI — first dashboard slice

Next.js 14 App Router, React 18, TypeScript and Tailwind CSS v4.

## Run locally

Use Node.js 20 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Validate with `npm run typecheck` and `npm run build`.

## Implemented

- Responsive dashboard index based on the supplied wireframe: green/white palette, Poppins, rounded sidebar, metric cards and charts.
- Marketplace metrics for customers, vendors, riders, completed orders, GMV, Manna commission, vendor liabilities and refunds.
- Month selector, chart value inspection, section search, notification menu, mobile navigation and theme toggle.
- Vendor/rider approvals and failed-payout summaries.
- Sidebar sections and summary cards open read-only sample-record previews; these are not completed management screens.
- Multi-vendor order samples show separate pickup progress. Payout samples show automatic release, pending, held and failed states.

## Scope and data

All records are fixtures in `src/lib/demo-data.ts`. No Firebase authentication, database, Cloudinary uploads, rider dispatch or payment integrations are connected. Firebase and Cloudinary remain the intended backend/media stack; their configuration will be added when integration starts. Do not deploy this unauthenticated prototype with live admin data.

GMV is completed item sales, excluding delivery fees. Manna earnings currently means commission before operating costs. Manna commission is 10% of the eligible vendor sale in the current product rule. Vendor payouts owed is the pending/held liability, not total sales or Manna revenue. Customers/vendors/riders are month-end account snapshots; completed orders, sales and refunds cover the selected month. Approval and failed-payout previews are current sample queues and do not change with the reporting month.

Chart periods use relative weights scaled to monthly GMV, so the graph reconciles to the selected summary. Category percentages total 100%. State data is an illustrative Lagos-only sample. No delivery quote workflow is included.

The exact supplied logo is displayed through CSS clipping of `public/wireframe.png`. Replace that reference with the original logo asset when supplied; it has not been redrawn.

## Next implementation decisions

- Connect the screen action flows to server-side admin routes and AY's backend contracts. See `docs/AY_BACKEND_INTEGRATION.md`.
- Agree on delivery pricing, commission rules, delivery confirmation and payout/dispute triggers.
- Connect Firebase with server-validated admin authorization before real records or mutations.
- Connect Cloudinary for approved uploads and the chosen payment provider for automatic payouts.

No production hosting or third-party accounts have been configured.
